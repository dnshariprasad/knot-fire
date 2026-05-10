import React from 'react';
import type { Note } from '../../../types';
import { 
  Hash, 
  Users, 
  Share2,
  Lock,
  MapPin,
  User as UserIcon,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { maskText } from '../../../utils/masking';
import * as S from './styles';

const isUrl = (val: string) => val?.startsWith('http');

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onToggleTag: (tag: string) => void;
  onShare: () => void;
  'data-testid'?: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onToggleTag, onShare, 'data-testid': testId }) => {
  const { user } = useAuth();

  const isSharedWithMe = note.userId !== user?.uid;
  const collaboratorsCount = note.sharedWithUids?.length || 0;
  const isSecure = note.isEncrypted;

  return (
    <S.Card
      data-testid={testId}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <S.Header>
        {note.title && <S.Title $blurred={isSecure}>{isSecure ? maskText(note.title) : note.title}</S.Title>}
        {!note.title && <S.HeaderSpacer />}
        {isSecure && <Lock size={12} style={{ opacity: 0.5 }} />}
      </S.Header>

      {note.content && (
        <S.Content $blurred={isSecure}>
          {isSecure ? maskText(note.content) : note.content}
        </S.Content>
      )}

      {note.customFields?.length > 0 && (
        <S.FieldsGrid $blurred={isSecure}>
          {note.customFields.slice(0, 2).map((field, idx) => (
            <S.FieldItem key={idx}>
              {field.label.toLowerCase().includes('location') && <MapPin size={12} />}
              {field.label.toLowerCase().includes('id') && <UserIcon size={12} />}
              {field.label.toLowerCase().includes('pass') && <Lock size={12} />}
              {isUrl(field.value) && <ExternalLink size={12} />}
              <span>
                <strong>{field.label}:</strong> {isSecure ? maskText(field.value) : field.value}
              </span>
            </S.FieldItem>
          ))}
        </S.FieldsGrid>
      )}

      {note.tags.length > 0 && (
        <S.TagContainer $blurred={isSecure}>
          {note.tags.map(tag => (
            <S.Tag key={tag} onClick={(e) => { e.stopPropagation(); onToggleTag(tag); }}>
              <Hash size={8} /> {isSecure ? '••••' : tag}
            </S.Tag>
          ))}
        </S.TagContainer>
      )}

      {isSecure && (
        <S.PrivateOverlay>
          <S.PrivateBadge>
            <Lock size={14} />
            Secure Note
          </S.PrivateBadge>
        </S.PrivateOverlay>
      )}


      <S.Footer>
        <S.DateInfo>
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
          })}
        </S.DateInfo>

        <S.BadgeGroup>
          {isSharedWithMe ? (
            <>
              <S.FieldBadge 
                $clickable
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                title={note.ownerEmail || ''}
              >
                <Users size={9} />
              </S.FieldBadge>
              <S.FieldBadge 
                $variant="primary"
                $clickable
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
              >
                <Share2 size={9} />
              </S.FieldBadge>
            </>
          ) : (
            collaboratorsCount > 0 && (
              <S.FieldBadge 
                $variant="primary"
                $clickable
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
              >
                <Share2 size={9} /> {collaboratorsCount}
              </S.FieldBadge>
            )
          )}
        </S.BadgeGroup>
      </S.Footer>

    </S.Card>
  );
};
