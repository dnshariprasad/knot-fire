import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Note } from '../../../types';
import { 
  Tag as TagIcon, MapPin, Hash, 
  Calendar, Globe, User as UserIcon, Lock as LockIcon, ExternalLink,
  Share2
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import * as S from './styles';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onToggleTag: (tag: string) => void;
  onShare: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onToggleTag, onShare }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const isSharedWithMe = note.userId !== user?.uid;
  const collaboratorsCount = note.sharedWithUids?.length || 0;


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
        {note.title && <S.Title $blurred={note.isPrivate}>{note.title}</S.Title>}
        {!note.title && !note.isPrivate && <div style={{ flex: 1 }} />}
        
        <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto', alignItems: 'center' }}>
          {isSharedWithMe && (
            <S.FieldBadge 
              $clickable
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              title={note.ownerEmail || ''}
            >
              <UserIcon size={9} />
            </S.FieldBadge>
          )}
          <S.FieldBadge 
            $variant={collaboratorsCount > 0 ? 'primary' : undefined}
            $clickable
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
          >
            <Share2 size={9} /> {collaboratorsCount > 0 ? collaboratorsCount : ''}
          </S.FieldBadge>
        </div>
      </S.Header>

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
                {field.label.toLowerCase().includes('pass') ? (
                  '••••••••'
                ) : field.value.startsWith('http') ? (
                  <a 
                    href={field.value} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {field.value}
                  </a>
                ) : (
                  field.value
                )}
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
