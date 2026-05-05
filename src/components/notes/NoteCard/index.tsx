import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Note } from '../../../types';
import { 
  Tag as TagIcon, MapPin, Hash, 
  Calendar, Globe, User as UserIcon, Lock as LockIcon, ExternalLink
} from 'lucide-react';
import * as S from './styles';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onToggleTag: (tag: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onToggleTag }) => {
  const { t } = useTranslation();


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
      {(note.title || !note.isPrivate) && (
        <S.Header>
          {note.title && <S.Title $blurred={note.isPrivate}>{note.title}</S.Title>}
        </S.Header>
      )}

      {(note.isPrivate || note.content) && (
        <S.Content $blurred={note.isPrivate}>
          {note.isPrivate ? t('notes.privateHidden') : note.content}
        </S.Content>
      )}

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
