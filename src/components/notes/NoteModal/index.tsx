import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { 
  X, Type, Layout, Tag as TagIcon, PlusCircle, Trash2, 
  Calendar, MapPin, Share2, MoreVertical, Edit2, Plus, 
  ExternalLink, User as UserIcon, Lock as LockIcon,
  Eye, EyeOff, Hash, Copy, Loader2, Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import type { Note, CustomField } from '../../../types';
import { Modal } from '../../common/Modal';
import { ConfirmModal } from '../../common/ConfirmModal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as S from './styles';

// Utils
import { isUrl } from '../../../utils/url';
import { getPeriodString, formatDate } from '../../../utils/date';
import { fetchUrlMetadata } from '../../../utils/metadata';

const ShareModal = lazy(() => import('../ShareModal').then(m => ({ default: m.ShareModal })));

interface NoteModalProps {
  note?: Note | null;
  allTags: string[];
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onShare: (sharedWith: any[]) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ 
  note, 
  allTags,
  onClose, 
  onSave, 
  onDelete,
  onShare 
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(!note);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [revealedFields, setRevealedFields] = useState<Record<number, boolean>>({});
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);

  const handleMetadataFetch = async (url: string) => {
    setIsFetchingMetadata(true);
    const metadata = await fetchUrlMetadata(url);
    if (metadata) {
      const { title: fetchedTitle, description: fetchedDesc } = metadata;
      setCustomFields(prev => {
        let updated = [...prev];
        const titleIdx = updated.findIndex(f => f.label.toLowerCase() === 'title');
        if (titleIdx === -1 && fetchedTitle) {
          updated = [{ label: 'Title', value: fetchedTitle }, ...updated];
        } else if (titleIdx !== -1 && !updated[titleIdx].value && fetchedTitle) {
          updated[titleIdx].value = fetchedTitle;
        }

        const descIdx = updated.findIndex(f => f.label.toLowerCase().includes('desc'));
        if (descIdx === -1 && fetchedDesc) {
          updated.push({ label: 'Description', value: fetchedDesc });
        } else if (descIdx !== -1 && !updated[descIdx].value && fetchedDesc) {
          updated[descIdx].value = fetchedDesc;
        }
        return updated;
      });
      toast.success(t('notes.metadataFetched'));
    }
    setIsFetchingMetadata(false);
  };

  useEffect(() => {
    if (note) {
      const initialFields = [...(note.customFields || [])];
      
      const hasTitleField = initialFields.some(f => f.label.toLowerCase() === 'title');
      if (!hasTitleField && note.title) {
        initialFields.unshift({ label: 'Title', value: note.title });
      }

      const hasDescField = initialFields.some(f => f.label.toLowerCase().includes('desc') || f.label.toLowerCase().includes('content'));
      if (!hasDescField && note.content) {
        initialFields.push({ label: 'Description', value: note.content });
      }

      setCustomFields(initialFields);
      setTagList(note.tags || []);
    } else {
      setTagList([]);
      setCustomFields([]);
    }
    setRevealedFields({});
    setIsEditing(!note);
  }, [note]);

  const handleAddTag = () => {
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

  const filteredSuggestions = useMemo(() => {
    const query = tagInputValue.trim().toLowerCase();
    return allTags.filter(tag => tag.includes(query) && !tagList.includes(tag));
  }, [allTags, tagInputValue, tagList]);

  const handleSave = () => {
    const titleField = customFields.find(f => f.label.toLowerCase() === 'title');
    const descField = customFields.find(f => f.label.toLowerCase().includes('desc') || f.label.toLowerCase().includes('content'));

    onSave({
      title: titleField ? titleField.value : '',
      content: descField ? descField.value : '',
      tags: [...tagList],
      customFields: customFields.filter(f => f.label.trim() !== '')
    });
  };

  const modalTitle = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span>{isEditing ? (note ? t('notes.editNote') : t('notes.newNote')) : t('notes.viewNote')}</span>
      {note && (note.sharedWithUids?.length || 0) > 0 && (
        <S.SharedBadge title={t('notes.collaborators')}>
          <Users size={14} />
          <span>{note.sharedWithUids?.length}</span>
        </S.SharedBadge>
      )}
      {note && note.userId !== (user?.uid || '') && (
        <S.SharedBadge $variant="secondary" title={note.ownerEmail || ''}>
          <Users size={14} />
          <span>{t('common.shared')}</span>
        </S.SharedBadge>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={modalTitle}
      maxWidth="800px"
      footer={
        isEditing ? (
          <>
            <S.Button $variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </S.Button>
            <S.Button $variant="primary" onClick={handleSave}>
              {t('notes.saveChanges')}
            </S.Button>
          </>
        ) : (
          <>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <S.FixedActionButton $variant="outline">
                  <MoreVertical size={20} />
                </S.FixedActionButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <S.DropdownContent sideOffset={5}>
                  <S.DropdownItem onSelect={() => setShowShareModal(true)}>
                    <Share2 size={16} /> {t('common.share')}
                  </S.DropdownItem>
                  <DropdownMenu.Separator className="Separator" />
                  <S.DropdownItem 
                    onSelect={() => setShowDeleteConfirm(true)}
                    className="danger"
                  >
                    <Trash2 size={16} /> {t('common.delete')}
                  </S.DropdownItem>
                </S.DropdownContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <S.Button $variant="primary" onClick={() => setIsEditing(true)}>
              <Edit2 size={18} /> {t('notes.editNote')}
            </S.Button>
          </>
        )
      }
    >
      {isEditing ? (
        <S.EditContainer>
          <S.DynamicFieldsSection>
            <S.SectionHeader>
              <S.HeaderLabel><PlusCircle size={14} /> {t('notes.additionalFields')}</S.HeaderLabel>
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
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onFocus={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                ) : (
                  <S.FieldInput 
                    $variant="value"
                    $isDate={field.label.toLowerCase().includes('date')}
                    $isLink={field.label.toLowerCase().includes('link')}
                    value={field.value}
                    type={field.label.toLowerCase().includes('pass') ? 'password' : field.label.toLowerCase().includes('date') ? 'date' : 'text'}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = [...customFields];
                      updated[idx].value = val;
                      setCustomFields(updated);

                      if (field.label.toLowerCase().includes('link') && val.startsWith('http')) {
                        handleMetadataFetch(val.trim());
                      }
                    }}
                  />
                )}
                {field.label.toLowerCase().includes('link') && isFetchingMetadata && (
                  <S.FetchingIndicator
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <Loader2 size={12} />
                    Fetching
                  </S.FetchingIndicator>
                )}
                {field.label.toLowerCase().includes('date') && (
                  <S.DateIconWrapper size={16} />
                )}
                <S.AbsoluteIconButton 
                  onClick={() => setCustomFields(customFields.filter((_, i) => i !== idx))} 
                  $variant="danger"
                >
                  <Trash2 size={14} />
                </S.AbsoluteIconButton>
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
        </S.EditContainer>
      ) : (
        <S.ViewContainer>
          <S.ViewHeaderWrapper>
            {customFields.find(f => f.label.toLowerCase() === 'title')?.value && (
              <S.ViewTitle>{customFields.find(f => f.label.toLowerCase() === 'title')?.value}</S.ViewTitle>
            )}
            {tagList.length > 0 && (
              <S.ViewTags>
                {tagList.map((tag, tIdx) => (
                  <S.TagChip key={`${tag}-${tIdx}`}>
                    <Hash size={14} /> {tag}
                  </S.TagChip>
                ))}
              </S.ViewTags>
            )}
          </S.ViewHeaderWrapper>

          {customFields.length > 0 && (
            <S.CustomFieldDisplay>
              {customFields.map((field, idx) => (
                <S.FieldCard key={idx}>
                  <S.CardHeader>
                    <S.FieldLabel>{field.label}</S.FieldLabel>
                    <S.ActionIconButton 
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(field.value);
                          toast.success(t('notes.fieldCopied', { label: field.label }));
                        } catch (err) {
                          toast.error(t('notes.copyFailed'));
                        }
                      }}
                    >
                      <Copy size={12} />
                    </S.ActionIconButton>
                  </S.CardHeader>
                  <S.FieldValue>
                    <S.FieldValueWrapper>
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
                          <S.PeriodBadge>
                            {period}
                          </S.PeriodBadge>
                        ) : null;
                      })()}
                      
                      {field.label.toLowerCase().includes('pass') && (
                        <S.RevealIconButton 
                          onClick={() => setRevealedFields(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        >
                          {revealedFields[idx] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </S.RevealIconButton>
                      )}
                    </S.FieldValueWrapper>
                  </S.FieldValue>
                </S.FieldCard>
              ))}
            </S.CustomFieldDisplay>
          )}

          {customFields.find(f => f.label.toLowerCase().includes('desc') || f.label.toLowerCase().includes('content'))?.value && (
            <S.ViewBody>{customFields.find(f => f.label.toLowerCase().includes('desc') || f.label.toLowerCase().includes('content'))?.value}</S.ViewBody>
          )}

          <S.FooterSpacer>
            {note && (
              <S.Timestamp title={t('notes.createdDate')}>
                <Calendar size={14} />
                {formatDate(note.createdAt)}
              </S.Timestamp>
            )}
          </S.FooterSpacer>
        </S.ViewContainer>
      )}

      {showDeleteConfirm && note && (
        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            onDelete(note.id);
            onClose();
          }}
          title={t('notes.deleteNote')}
          message={t('notes.deleteConfirm')}
        />
      )}

      <Suspense fallback={null}>
        {showShareModal && note && (
          <ShareModal
            item={note}
            onClose={() => setShowShareModal(false)}
            onShare={onShare}
          />
        )}
      </Suspense>
    </Modal>
  );
};
