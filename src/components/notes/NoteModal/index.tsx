import React, { useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import { 
  X, Type, Layout, Tag as TagIcon, PlusCircle, Trash2, 
  Calendar, MapPin, Share2, MoreVertical, Edit2, Plus, 
  ExternalLink, User as UserIcon, Lock as LockIcon,
  Eye, EyeOff, Hash, Key, Copy
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Note, CustomField, SharedUser } from '../../../types';
import { Modal } from '../../common/Modal';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ShareModal } from '../ShareModal';
import * as S from './styles';

interface NoteModalProps {
  note?: Note | null;
  allTags: string[];
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string, sharedWith: SharedUser[]) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ note, allTags, onClose, onSave, onDelete, onShare }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(!note);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [revealedFields, setRevealedFields] = useState<Record<number, boolean>>({});
  
  const [isPrivate, setIsPrivate] = useState(false);
  const [pin, setPin] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyPin, setVerifyPin] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredSuggestions = allTags.filter(tag => 
    tag.toLowerCase().includes(tagInputValue.toLowerCase()) && 
    !tagList.includes(tag)
  ).slice(0, 5);

  useEffect(() => {
    if (note) {
      const initialFields = [...(note.customFields || [])];
      
      // Migrate Title if not already in custom fields
      if (note.title && !initialFields.some(f => f.label.toLowerCase() === 'title')) {
        initialFields.unshift({ label: 'Title', value: note.title });
      }
      
      // Migrate Description if not already in custom fields
      if (note.content && !initialFields.some(f => f.label.toLowerCase() === 'description')) {
        const descIndex = initialFields.findIndex(f => f.label.toLowerCase() === 'title');
        if (descIndex !== -1) {
          initialFields.splice(descIndex + 1, 0, { label: 'Description', value: note.content });
        } else {
          initialFields.unshift({ label: 'Description', value: note.content });
        }
      }

      setCustomFields(initialFields);
      setTagList(note.tags || []);
      setIsPrivate(note.isPrivate || false);
      setPin(note.pin || '');
      setIsVerified(!note.isPrivate);
      
      // Clear core states as we use custom fields now
      setTitle('');
      setContent('');
    } else {
      setTitle('');
      setContent('');
      setTagList([]);
      setCustomFields([]);
      setIsPrivate(false);
      setPin('');
      setIsVerified(true);
    }
    setRevealedFields({});
    setIsEditing(!note);
    setVerifyPin('');
  }, [note]);

  const handleAddTag = (_e?: React.KeyboardEvent | React.FocusEvent) => {
    const val = tagInputValue.trim().toLowerCase();
    if (val && !tagList.includes(val)) {
      setTagList([...tagList, val]);
      setTagInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (tag: string) => {
    if (!tagList.includes(tag)) {
      setTagList([...tagList, tag]);
    }
    setTagInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagList(tagList.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    if (isPrivate && !pin) {
      toast.error(t('notes.pinRequired'));
      return;
    }

    const currentTags = [...tagList];
    const finalVal = tagInputValue.trim().toLowerCase();
    if (finalVal && !currentTags.includes(finalVal)) {
      currentTags.push(finalVal);
    }

    // Extract Title and Description from custom fields for top-level note properties
    const titleField = customFields.find(f => f.label.toLowerCase() === 'title');
    const descField = customFields.find(f => f.label.toLowerCase() === 'description');

    onSave({
      title: titleField ? titleField.value : '',
      content: descField ? descField.value : '',
      tags: currentTags,
      customFields: customFields.filter(f => f.label.trim() !== ''),
      isPrivate,
      pin
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPin === pin) {
      setIsVerified(true);
      toast.success(t('notes.unlocked'));
    } else {
      toast.error(t('notes.locked'));
      setVerifyPin('');
    }
  };

  const handleShare = () => {
    if (!note) {
      toast.error(t('notes.saveFirst'));
      return;
    }
    setShowShareModal(true);
  };

  const isUrl = (text: string) => text.startsWith('http://') || text.startsWith('https://');

  const getPeriodString = (dateStr: string) => {
    try {
      const targetDate = new Date(dateStr);
      if (isNaN(targetDate.getTime())) return null;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);
      
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return t('common.today');
      
      const isPast = diffDays < 0;
      let remainingDays = Math.abs(diffDays);
      
      const years = Math.floor(remainingDays / 365);
      remainingDays %= 365;
      const months = Math.floor(remainingDays / 30);
      remainingDays %= 30;
      const weeks = Math.floor(remainingDays / 7);
      const days = remainingDays % 7;
      
      const parts = [];
      if (years > 0) parts.push(`${years}Y`);
      if (months > 0) parts.push(`${months}M`);
      if (weeks > 0) parts.push(`${weeks}W`);
      if (days > 0) parts.push(`${days}D`);
      
      const duration = parts.join(' ');
      return isPast ? `${duration} Ago` : `In ${duration}`;
    } catch (e) {
      return null;
    }
  };

  const modalTitle = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {isEditing ? (note ? t('notes.editNote') : t('notes.createNote')) : t('notes.notePreview')}
      </span>
      {isPrivate && !isVerified && <LockIcon size={16} style={{ flexShrink: 0, color: '#6366f1' }} />}
      {isPrivate && isVerified && <LockIcon size={16} style={{ flexShrink: 0, opacity: 0.5 }} />}
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={modalTitle}
      maxWidth="600px"
    >
      {!isVerified ? (
        <S.LockView>
          <S.LockIconWrapper>
            <LockIcon size={32} />
          </S.LockIconWrapper>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{t('notes.lockedTitle')}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{t('notes.lockedMessage')}</p>
          </div>
          <form onSubmit={handleVerify} style={{ width: '100%', maxWidth: '240px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <S.Input 
              type="password" 
              placeholder={t('common.pin')} 
              maxLength={4}
              value={verifyPin}
              onChange={(e) => setVerifyPin(e.target.value.replace(/\D/g, ''))}
              style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}
              autoFocus
            />
            <S.Button type="submit" $variant="primary" style={{ height: '48px' }}>
              <Key size={18} /> {t('notes.unlockNote')}
            </S.Button>
          </form>
        </S.LockView>
      ) : isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <S.DynamicFieldsSection>
            <S.SectionHeader>
              <S.Label style={{ margin: 0 }}><PlusCircle size={14} /> {t('notes.additionalFields')}</S.Label>
              <S.QuickActionToolbar>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'Title', value: '' }])}>
                  <Type size={12} /> {t('notes.titleLabel')}
                </S.QuickActionButton>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'Description', value: '' }])}>
                  <Layout size={12} /> {t('notes.descriptionLabel')}
                </S.QuickActionButton>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'ID', value: '' }])}>
                  <UserIcon size={12} /> {t('common.id')}
                </S.QuickActionButton>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'Password', value: '' }])}>
                  <LockIcon size={12} /> {t('common.password')}
                </S.QuickActionButton>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'Link', value: '' }])}>
                  <ExternalLink size={12} /> {t('common.link')}
                </S.QuickActionButton>
                <S.QuickActionButton onClick={() => setCustomFields([...customFields, { label: 'Date', value: '' }])}>
                  <Calendar size={12} /> {t('common.date')}
                </S.QuickActionButton>
                <S.AddFieldButton onClick={() => setCustomFields([...customFields, { label: '', value: '' }])}>
                  <Plus size={16} />
                </S.AddFieldButton>
              </S.QuickActionToolbar>
            </S.SectionHeader>
            
            {customFields.map((field, idx) => (
              <S.FieldRow 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <S.FieldInput 
                  $variant="label"
                  value={field.label}
                  onChange={(e) => {
                    const updated = [...customFields];
                    updated[idx].label = e.target.value;
                    setCustomFields(updated);
                  }}
                />
                {field.label.toLowerCase().includes('description') || field.label.toLowerCase().includes('content') ? (
                  <S.FieldTextArea 
                    placeholder={t('notes.contentPlaceholder')} 
                    value={field.value}
                    rows={1}
                    onChange={(e) => {
                      const updated = [...customFields];
                      updated[idx].value = e.target.value;
                      setCustomFields(updated);
                      
                      // Auto-expand
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onFocus={(e) => {
                      // Initial expansion on focus
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    style={{ minHeight: '60px', overflow: 'hidden' }}
                  />
                ) : (
                  <S.FieldInput 
                    $variant="value"
                    $isDate={field.label.toLowerCase().includes('date')}
                    $isLink={field.label.toLowerCase().includes('link')}
                    value={field.value}
                    type={field.label.toLowerCase().includes('pass') ? 'password' : field.label.toLowerCase().includes('date') ? 'date' : 'text'}
                    onChange={(e) => {
                      const updated = [...customFields];
                      updated[idx].value = e.target.value;
                      setCustomFields(updated);
                    }}
                  />
                )}
                {field.label.toLowerCase().includes('date') && (
                  <Calendar 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: '1rem', 
                      top: '68%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#6366f1',
                      opacity: 0.9
                    }} 
                  />
                )}
                <S.IconButton 
                  onClick={() => setCustomFields(customFields.filter((_, i) => i !== idx))} 
                  $variant="danger"
                  style={{ position: 'absolute', top: '4px', right: '4px', padding: '0.25rem' }}
                >
                  <Trash2 size={14} />
                </S.IconButton>
              </S.FieldRow>
            ))}
          </S.DynamicFieldsSection>

          <S.FormGroup>
            <S.Label><TagIcon size={14} /> {t('notes.tagsLabel')}</S.Label>
            <S.TagInputWrapper onClick={() => document.getElementById('tag-input')?.focus()}>
              {tagList.map(tag => (
                <S.Chip key={tag}>
                  # {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <X size={14} />
                  </button>
                </S.Chip>
              ))}
              <S.TagInput 
                id="tag-input"
                placeholder={t('notes.addTagPlaceholder')} 
                value={tagInputValue}
                onChange={(e) => {
                  setTagInputValue(e.target.value);
                  setShowSuggestions(true);
                  setSelectedIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setShowSuggestions(true);
                    setSelectedIndex(prev => (prev + 1) % Math.max(filteredSuggestions.length, 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setShowSuggestions(true);
                    setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % Math.max(filteredSuggestions.length, 1));
                  } else if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    if (showSuggestions && filteredSuggestions.length > 0 && tagInputValue) {
                      handleSuggestionClick(filteredSuggestions[selectedIndex]);
                    } else {
                      handleAddTag();
                    }
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
              />
              {showSuggestions && tagInputValue && filteredSuggestions.length > 0 && (
                <S.SuggestionsContainer>
                  {filteredSuggestions.map((tag, idx) => (
                    <S.SuggestionItem 
                      key={tag}
                      $selected={idx === selectedIndex}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(tag);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <Hash size={12} /> {tag}
                    </S.SuggestionItem>
                  ))}
                </S.SuggestionsContainer>
              )}
            </S.TagInputWrapper>
          </S.FormGroup>


          <S.FormGroup style={{ padding: '1.25rem', background: '#f8fafc05', borderRadius: '12px', border: '1px solid #e2e8f010' }}>
            <S.Label style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isPrivate ? '#6366f1' : 'inherit' }}>
                <LockIcon size={14} /> {t('notes.privateNote')}
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <S.Toggle $active={isPrivate} onClick={() => setIsPrivate(!isPrivate)} />
              </div>
            </S.Label>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: isPrivate ? '1rem' : 0 }}>
              {t('notes.privateNoteDescription')}
            </p>
            {isPrivate && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <S.Label style={{ fontSize: '0.65rem' }}>{t('notes.setSecurityPin')}</S.Label>
                <S.Input 
                  type="password" 
                  maxLength={4} 
                  placeholder="••••" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  style={{ marginTop: '0.4rem', textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }}
                />
              </motion.div>
            )}
          </S.FormGroup>
          <S.StickyFooter>
            <S.Button $variant="outline" onClick={onClose} style={{ flex: 1, height: '48px' }}>
              {t('common.cancel')}
            </S.Button>
            <S.Button $variant="primary" onClick={handleSave} style={{ flex: 2, height: '48px' }}>
              {t('notes.saveChanges')}
            </S.Button>
          </S.StickyFooter>
        </div>
      ) : (
        <S.ViewContent>
          {(title || tagList.length > 0) && (
            <S.ViewHeader>
              {title && <S.ViewTitle>{title}</S.ViewTitle>}
              {tagList.length > 0 && (
                <S.ViewTags>
                  {tagList.map((tag, tIdx) => (
                    <S.TagChip key={`${tag}-${tIdx}`}>
                      <Hash size={14} /> {tag}
                    </S.TagChip>
                  ))}
                </S.ViewTags>
              )}
            </S.ViewHeader>
          )}

          {customFields.length > 0 && (
            <S.CustomFieldDisplay>
              {customFields.map((field, idx) => (
                <S.FieldCard key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <S.FieldLabel>{field.label}</S.FieldLabel>
                    <S.IconButton 
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(field.value);
                          toast.success(t('notes.fieldCopied', { label: field.label }));
                        } catch (err) {
                          toast.error(t('notes.copyFailed'));
                        }
                      }}
                      style={{ padding: '0.25rem' }}
                    >
                      <Copy size={12} />
                    </S.IconButton>
                  </div>
                  <S.FieldValue>
                    {field.label.toLowerCase().includes('location') && <MapPin size={14} color="#94a3b8" />}
                    {field.label.toLowerCase().includes('id') && <UserIcon size={14} color="#94a3b8" />}
                    {field.label.toLowerCase().includes('pass') && <LockIcon size={14} color="#94a3b8" />}
                    {field.label.toLowerCase().includes('pass') && !revealedFields[idx] ? (
                      '••••••••'
                    ) : isUrl(field.value) ? (
                      <a href={field.value} target="_blank" rel="noopener noreferrer">
                        {field.value} <ExternalLink size={12} />
                      </a>
                    ) : (
                      field.value
                    )}

                    {(field.label.toLowerCase().includes('date') || field.label.toLowerCase().includes('dob')) && (() => {
                      const period = getPeriodString(field.value);
                      return period ? (
                        <span style={{ 
                          fontSize: '0.65rem', 
                          color: '#6366f1', 
                          marginLeft: 'auto', 
                          fontWeight: 800,
                          background: '#6366f112',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          border: '1px solid #6366f120',
                          whiteSpace: 'nowrap'
                        }}>
                          {period}
                        </span>
                      ) : null;
                    })()}
                    
                    {field.label.toLowerCase().includes('pass') && (
                      <S.IconButton 
                        onClick={() => setRevealedFields(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        style={{ padding: '0.25rem', marginLeft: 'auto' }}
                      >
                        {revealedFields[idx] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </S.IconButton>
                    )}
                  </S.FieldValue>
                </S.FieldCard>
              ))}
            </S.CustomFieldDisplay>
          )}

          {content && <S.ViewBody>{content}</S.ViewBody>}

          <div style={{ marginTop: 'auto' }}>
            {note && (
              <S.Timestamp title={t('notes.createdDate')}>
                <Calendar size={14} />
                {new Date(note.createdAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </S.Timestamp>
            )}
            <S.Footer>
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                {!isEditing && isVerified && (
                  <>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <S.IconButton $variant="outline" style={{ width: '48px', height: '42px' }}>
                          <MoreVertical size={20} />
                        </S.IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <S.Popover sideOffset={8} align="end">
                          {onDelete && note && (
                            <S.PopoverItem 
                              $danger 
                              onSelect={() => setShowDeleteConfirm(true)}
                            >
                              <Trash2 size={16} /> {t('common.delete')}
                            </S.PopoverItem>
                          )}
                        </S.Popover>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                    <S.IconButton $variant="outline" onClick={handleShare} style={{ width: '48px', height: '42px' }}>
                      <Share2 size={20} />
                    </S.IconButton>
                  </>
                )}
                <S.Button $variant="primary" onClick={() => setIsEditing(true)} style={{ flex: 1 }}>
                  <Edit2 size={18} /> {t('notes.editNote')}
                </S.Button>
              </div>
            </S.Footer>
          </div>
        </S.ViewContent>
      )}

      {showDeleteConfirm && note && (
        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            if (onDelete) {
              onDelete(note.id);
              setShowDeleteConfirm(false);
            }
          }}
          title={t('notes.deleteNote')}
          message={t('notes.deleteConfirm')}
        />
      )}

      {showShareModal && note && onShare && (
        <ShareModal 
          note={note}
          onClose={() => setShowShareModal(false)}
          onShare={(sharedWith) => onShare(note.id, sharedWith)}
        />
      )}
    </Modal>
  );
};
