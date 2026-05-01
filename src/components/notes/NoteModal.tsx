import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  X, Type, Layout, Tag as TagIcon, PlusCircle, Trash2, 
  Calendar, MapPin, Share2, MoreVertical, Edit2, Plus, 
  ExternalLink, User as UserIcon, Lock as LockIcon,
  Eye, EyeOff, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Note, CustomField } from '../../types';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Body = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.625rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 42px;
  align-items: center;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  outline: none;
  padding: 0.25rem 0;
`;

const Chip = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  button {
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
`;

const DynamicFieldsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const IconButton = styled.button<{ $variant?: 'primary' | 'danger' | 'outline' }>`
  background: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.primary : 
    $variant === 'danger' ? theme.colors.error + '15' : 
    'transparent'};
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? 'white' : 
    $variant === 'danger' ? theme.colors.error : 
    theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $variant }) => 
      $variant === 'primary' ? theme.colors.primaryDark : 
      $variant === 'danger' ? theme.colors.error + '25' : 
      theme.colors.surfaceLight};
    color: ${({ theme, $variant }) => 
      $variant === 'primary' ? 'white' : 
      $variant === 'danger' ? theme.colors.error : 
      theme.colors.text};
  }
`;

const Footer = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  padding: 0.625rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;

  ${({ $variant, theme }) => {
    if ($variant === 'primary') return `
      background: ${theme.colors.primary};
      color: white;
      &:hover { background: ${theme.colors.primaryDark}; }
    `;
    if ($variant === 'outline') return `
      background: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text};
      &:hover { 
        background: ${theme.colors.surfaceLight};
        border-color: ${theme.colors.primary};
      }
    `;
    return '';
  }}
`;

const ViewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ViewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ViewTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const ViewBody = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
`;

const ViewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const TagChip = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const CustomFieldDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const FieldCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FieldLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;

const FieldValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  word-break: break-all;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    &:hover { text-decoration: underline; }
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 160px;
  overflow: hidden;
  margin-top: 0.5rem;
  z-index: 2100;
`;

const PopoverItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  background: transparent;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

interface NoteModalProps {
  note?: Note | null;
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
  onDelete?: (id: string) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ note, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!note);
  const [showMore, setShowMore] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [revealedFields, setRevealedFields] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTagList(note.tags || []);
      setCustomFields(note.customFields || []);
    } else {
      setTitle('');
      setContent('');
      setTagList([]);
      setCustomFields([]);
    }
    setRevealedFields({});
    setIsEditing(!note);
  }, [note]);

  const handleAddTag = (_e?: React.KeyboardEvent | React.FocusEvent) => {
    const val = tagInputValue.trim().toLowerCase();
    if (val && !tagList.includes(val)) {
      setTagList([...tagList, val]);
      setTagInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagList(tagList.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    const currentTags = [...tagList];
    const finalVal = tagInputValue.trim().toLowerCase();
    if (finalVal && !currentTags.includes(finalVal)) {
      currentTags.push(finalVal);
    }

    onSave({
      title,
      content,
      tags: currentTags,
      customFields: customFields.filter(f => f.label.trim() !== ''),
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `Knot: ${title}`,
      text: content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${title}\n\n${content}`);
        toast.success('Copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Sharing failed');
      }
    }
    setShowMore(false);
  };

  const isUrl = (text: string) => text.startsWith('http://') || text.startsWith('https://');

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            <Title>{isEditing ? (note ? 'Edit Note' : 'Create New Note') : 'Note View'}</Title>
            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
              {!isEditing && (
                <>
                  <IconButton onClick={() => setShowMore(!showMore)}>
                    <MoreVertical size={20} />
                  </IconButton>
                  {showMore && (
                    <Popover>
                      <PopoverItem onClick={handleShare}>
                        <Share2 size={16} /> Share
                      </PopoverItem>
                      {onDelete && note && (
                        <PopoverItem 
                          $danger 
                          onClick={() => {
                            if (window.confirm('Delete this note?')) onDelete(note.id);
                          }}
                        >
                          <Trash2 size={16} /> Delete
                        </PopoverItem>
                      )}
                    </Popover>
                  )}
                </>
              )}
              <IconButton onClick={onClose}><X size={20} /></IconButton>
            </div>
          </Header>

          <Body>
            {isEditing ? (
              <>
                <FormGroup>
                  <Label><Type size={14} /> Title</Label>
                  <Input 
                    placeholder="Note title..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label><Layout size={14} /> Description</Label>
                  <TextArea 
                    placeholder="Write your note content here..." 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label><TagIcon size={14} /> Tags</Label>
                  <TagInputWrapper onClick={() => document.getElementById('tag-input')?.focus()}>
                    {tagList.map(tag => (
                      <Chip key={tag}>
                        # {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                          <X size={14} />
                        </button>
                      </Chip>
                    ))}
                    <TagInput 
                      id="tag-input"
                      placeholder="Add tag..." 
                      value={tagInputValue}
                      onChange={(e) => setTagInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      onBlur={() => handleAddTag()}
                    />
                  </TagInputWrapper>
                </FormGroup>

                <DynamicFieldsSection>
                  <Label>
                    <PlusCircle size={14} /> Additional Fields
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'ID', value: '' }])}
                      >
                        + ID
                      </Button>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'Password', value: '' }])}
                      >
                        + Pass
                      </Button>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'Link', value: '' }])}
                      >
                        + Link
                      </Button>
                      <IconButton onClick={() => setCustomFields([...customFields, { label: '', value: '' }])} $variant="primary">
                        <Plus size={16} />
                      </IconButton>
                    </div>
                  </Label>
                  
                  {customFields.map((field, idx) => (
                    <FieldRow key={idx}>
                      <Input 
                        placeholder="Label" 
                        value={field.label}
                        style={{ flex: 1 }}
                        onChange={(e) => {
                          const updated = [...customFields];
                          updated[idx].label = e.target.value;
                          setCustomFields(updated);
                        }}
                      />
                      <Input 
                        placeholder="Value" 
                        value={field.value}
                        type={field.label.toLowerCase().includes('pass') ? 'password' : field.label.toLowerCase().includes('date') ? 'date' : 'text'}
                        style={{ flex: 2 }}
                        onChange={(e) => {
                          const updated = [...customFields];
                          updated[idx].value = e.target.value;
                          setCustomFields(updated);
                        }}
                      />
                      <IconButton onClick={() => setCustomFields(customFields.filter((_, i) => i !== idx))} $variant="danger">
                        <Trash2 size={16} />
                      </IconButton>
                    </FieldRow>
                  ))}
                </DynamicFieldsSection>
              </>
            ) : (
              <ViewContent>
                <ViewHeader>
                  <ViewTitle>{title}</ViewTitle>
                  {tagList.length > 0 && (
                    <ViewTags>
                      {tagList.map((tag, tIdx) => (
                        <TagChip key={`${tag}-${tIdx}`}>
                          <Hash size={14} /> {tag}
                        </TagChip>
                      ))}
                    </ViewTags>
                  )}
                </ViewHeader>

                <ViewBody>{content}</ViewBody>

                {customFields.length > 0 && (
                  <CustomFieldDisplay>
                    {customFields.map((field, idx) => (
                      <FieldCard key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <FieldLabel>{field.label}</FieldLabel>
                          <IconButton 
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(field.value);
                                toast.success(`${field.label} copied!`);
                              } catch (err) {
                                toast.error('Failed to copy');
                              }
                            }}
                            style={{ padding: '0.25rem' }}
                          >
                            <Share2 size={12} />
                          </IconButton>
                        </div>
                        <FieldValue>
                          {field.label.toLowerCase().includes('location') && <MapPin size={14} color="#94a3b8" />}
                          {field.label.toLowerCase().includes('id') && <UserIcon size={14} color="#94a3b8" />}
                          {field.label.toLowerCase().includes('pass') && <LockIcon size={14} color="#94a3b8" />}
                          {(field.label.toLowerCase().includes('date') || field.label.toLowerCase().includes('dob')) && <Calendar size={14} color="#94a3b8" />}
                          
                          {field.label.toLowerCase().includes('pass') && !revealedFields[idx] ? (
                            '••••••••'
                          ) : isUrl(field.value) ? (
                            <a href={field.value} target="_blank" rel="noopener noreferrer">
                              {field.value} <ExternalLink size={12} />
                            </a>
                          ) : (
                            field.value
                          )}
                          
                          {field.label.toLowerCase().includes('pass') && (
                            <IconButton 
                              onClick={() => setRevealedFields(prev => ({ ...prev, [idx]: !prev[idx] }))}
                              style={{ padding: '0.25rem', marginLeft: 'auto' }}
                            >
                              {revealedFields[idx] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </IconButton>
                          )}
                        </FieldValue>
                      </FieldCard>
                    ))}
                  </CustomFieldDisplay>
                )}
              </ViewContent>
            )}
          </Body>

          <Footer>
            {note && (
              <Timestamp title="Created Date">
                <Calendar size={14} />
                {new Date(note.createdAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </Timestamp>
            )}
            <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
              {isEditing ? (
                <>
                  <Button $variant="outline" onClick={() => note ? setIsEditing(false) : onClose()}>Cancel</Button>
                  <Button $variant="primary" onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button $variant="primary" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} /> Edit Note
                </Button>
              )}
            </div>
          </Footer>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};
