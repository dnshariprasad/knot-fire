import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import type { Note } from '../../../types';
import { 
  Tag as TagIcon, MoreVertical, MapPin, Hash, 
  Calendar, Share2, Trash2, 
  ExternalLink, Globe, User as UserIcon, Lock as LockIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import * as S from './styles';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: (id: string) => void;
  onToggleTag: (tag: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onDelete, onToggleTag }) => {
  const { t } = useTranslation();

  const handleShare = async (e: Event) => {
    e.stopPropagation();
    if (note.isPrivate) {
      toast.error(t('notes.shareFailedPrivate')); // Need to add this to translation.json
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({
          title: note.title,
          text: note.content,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
        toast.success(t('notes.copySuccess'));
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error(t('notes.shareFailed'));
      }
    }
  };

  const handleDelete = (e: Event) => {
    e.stopPropagation();
    if (window.confirm(t('notes.deleteConfirm'))) {
      onDelete(note.id);
    }
  };

  const getFieldIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('link') || l.includes('url')) return <Globe size={14} />;
    if (l.includes('date') || l.includes('dob')) return <Calendar size={14} />;
    if (l.includes('loc')) return <MapPin size={14} />;
    if (l.includes('id') || l.includes('user')) return <UserIcon size={14} />;
    if (l.includes('pass') || l.includes('pwd')) return <LockIcon size={14} />;
    return <TagIcon size={14} />;
  };

  return (
    <S.Card
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <S.Header>
        <S.Title $blurred={note.isPrivate}>{note.title || t('notes.untitled')}</S.Title>
        <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <S.MoreButton>
                <MoreVertical size={16} />
              </S.MoreButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <S.Popover sideOffset={4} align="end">
                <S.PopoverItem onSelect={handleShare}>
                  <Share2 size={14} /> {t('common.share')}
                </S.PopoverItem>
                <S.PopoverItem $danger onSelect={handleDelete}>
                  <Trash2 size={14} /> {t('common.delete')}
                </S.PopoverItem>
              </S.Popover>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </S.Header>

      <S.Content $blurred={note.isPrivate}>
        {note.isPrivate ? t('notes.privateHidden') : note.content}
      </S.Content>

      {note.tags.length > 0 && (
        <S.TagContainer $blurred={note.isPrivate}>
          {note.tags.map(tag => (
            <S.Tag key={tag} onClick={(e) => { e.stopPropagation(); onToggleTag(tag); }}>
              <Hash size={10} /> {tag}
            </S.Tag>
          ))}
        </S.TagContainer>
      )}

      {note.customFields.length > 0 && (
        <S.FieldsGrid $blurred={note.isPrivate}>
          {note.customFields.map((field, idx) => (
            <S.FieldItem key={idx}>
              {getFieldIcon(field.label)}
              <span>
                {field.label.toLowerCase().includes('pass') ? '••••••••' : field.value}
              </span>
              {field.value.startsWith('http') && <ExternalLink size={10} style={{ opacity: 0.5 }} />}
            </S.FieldItem>
          ))}
        </S.FieldsGrid>
      )}

      {note.isPrivate && (
        <S.PrivateOverlay>
          <S.PrivateBadge>
            <LockIcon size={14} /> {t('notes.private')}
          </S.PrivateBadge>
        </S.PrivateOverlay>
      )}
    </S.Card>
  );
};
