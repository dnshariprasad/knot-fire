import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  X, Plus, Trash2, Tag as TagIcon, Layout, Type, 
  PlusCircle, MoreVertical, Share2, Edit2, ExternalLink, MapPin, Hash, Calendar 
} from 'lucide-react';
import type { Note, CustomField } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
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
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IconButton = styled.button<{ $variant?: 'danger' | 'primary' }>`
  background: transparent;
  color: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error : theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error : theme.colors.primary};
  }
`;

const Footer = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button<{ $variant?: 'outline' | 'primary' | 'danger' }>`
  padding: 0.625rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $variant }) => {
    if ($variant === 'primary') return 'white';
    if ($variant === 'danger') return theme.colors.error;
    return theme.colors.text;
  }};
  border: ${({ theme, $variant }) => {
    if ($variant === 'outline') return `1px solid ${theme.colors.border}`;
    if ($variant === 'danger') return `1px solid ${theme.colors.error}33`;
    return 'none';
  }};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme, $variant }) => {
      if ($variant === 'primary') return theme.colors.primaryDark;
      if ($variant === 'danger') return `${theme.colors.error}15`;
      return theme.colors.surfaceLight;
    }};
  }
`;

const ViewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ViewTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ViewDescription = styled.div`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
  line-height: 1.6;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagChip = styled.span`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
  const [tags, setTags] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags.join(', '));
      setCustomFields(note.customFields);
      setIsEditing(false);
    } else {
      setTitle('');
      setContent('');
      setTags('');
      setCustomFields([]);
      setIsEditing(true);
    }
  }, [note]);

  const handleSave = () => {
    onSave({
      title,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
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

  const getDateStatus = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return { label: 'Today', color: '#10b981' };
      if (diffDays < 0) return { label: `${Math.abs(diffDays)}d ago`, color: '#ef4444' };
      return { label: `In ${diffDays}d`, color: '#6366f1' };
    } catch {
      return null;
    }
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
                  <Label><TagIcon size={14} /> Tags (comma separated)</Label>
                  <Input 
                    placeholder="work, personal, ideas..." 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </FormGroup>

                <DynamicFieldsSection>
                  <Label>
                    <PlusCircle size={14} /> Additional Fields
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'Link', value: '' }])}
                      >
                        + Link
                      </Button>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'Location', value: '' }])}
                      >
                        + Location
                      </Button>
                      <Button 
                        type="button"
                        $variant="outline" 
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => setCustomFields([...customFields, { label: 'Date', value: new Date().toISOString().split('T')[0] }])}
                      >
                        + Date
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
                        type={field.label.toLowerCase() === 'date' ? 'date' : 'text'}
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
                <div>
                  <ViewTitle>{title}</ViewTitle>
                  <TagCloud>
                    {note?.tags.map(tag => (
                      <TagChip key={tag}><Hash size={12} /> {tag}</TagChip>
                    ))}
                  </TagCloud>
                </div>

                <ViewDescription>{content}</ViewDescription>

                {customFields.length > 0 && (
                  <CustomFieldDisplay>
                    {customFields.map((field, idx) => {
                      const isDate = field.label.toLowerCase().includes('date');
                      const status = isDate ? getDateStatus(field.value) : null;
                      
                      return (
                        <FieldCard key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FieldLabel>{field.label}</FieldLabel>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              {status && (
                                <span style={{ 
                                  fontSize: '0.625rem', 
                                  fontWeight: 800, 
                                  padding: '0.125rem 0.375rem', 
                                  borderRadius: '4px',
                                  background: `${status.color}20`,
                                  color: status.color,
                                  textTransform: 'uppercase'
                                }}>
                                  {status.label}
                                </span>
                              )}
                              <IconButton 
                                onClick={async () => {
                                  try {
                                    if (navigator.share) {
                                      await navigator.share({ title: field.label, text: field.value });
                                    } else {
                                      await navigator.clipboard.writeText(field.value);
                                      toast.success(`${field.label} copied!`);
                                    }
                                  } catch (err) {
                                    if (err instanceof Error && err.name !== 'AbortError') {
                                      toast.error('Sharing failed');
                                    }
                                  }
                                }}
                                style={{ padding: '0.25rem' }}
                                title={`Share ${field.label}`}
                              >
                                <Share2 size={12} />
                              </IconButton>
                            </div>
                          </div>
                          <FieldValue>
                            {field.label.toLowerCase().includes('location') && <MapPin size={14} color="#94a3b8" />}
                            {isDate && <Calendar size={14} color="#94a3b8" />}
                            {isUrl(field.value) ? (
                              <a href={field.value} target="_blank" rel="noopener noreferrer">
                                {field.value} <ExternalLink size={12} />
                              </a>
                            ) : (
                              field.value
                            )}
                          </FieldValue>
                        </FieldCard>
                      );
                    })}
                  </CustomFieldDisplay>
                )}
              </ViewContent>
            )}
          </Body>

          <Footer>
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
          </Footer>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};
