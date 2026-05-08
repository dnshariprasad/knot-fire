import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Note } from '../../../types';
import { 
  Hash, 
  User as UserIcon, Lock as LockIcon,
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
              <Hash size={8} /> {tag}
            </S.Tag>
          ))}
        </S.TagContainer>
      )}


      <S.Footer $blurred={note.isPrivate}>
        <S.DateInfo>
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
          })}
        </S.DateInfo>

        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
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
      </S.Footer>

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
