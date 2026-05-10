import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../../../types';
import { 
  Hash, 
  Users,
  ListTodo, CheckCircle2, Circle, Share2, Lock
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { maskText } from '../../../utils/masking';
import * as S from '../../notes/NoteCard/styles'; // Reusing styles for visual consistency

interface TodoCardProps {
  todo: Todo;
  onClick: () => void;
  onToggleTag: (tag: string) => void;
  onShare: () => void;
  'data-testid'?: string;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onClick, onToggleTag, onShare, 'data-testid': testId }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const isSharedWithMe = todo.userId !== user?.uid;
  const collaboratorsCount = todo.sharedWithUids?.length || 0;
  const isSecure = todo.isEncrypted;

  const todoItems = todo.items || [];
  const completedCount = todoItems.filter(i => i.completed).length;
  const progressPercent = todoItems.length > 0 ? (completedCount / todoItems.length) * 100 : 0;
  const allDone = todoItems.length > 0 && completedCount === todoItems.length;

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
        {todo.title && <S.Title $blurred={isSecure}>{isSecure ? maskText(todo.title) : todo.title}</S.Title>}
        {isSecure && <Lock size={12} style={{ opacity: 0.5 }} />}
      </S.Header>

      {todoItems.length > 0 && (
        <>
          <S.TodoPreview style={{ filter: isSecure ? 'blur(6px)' : 'none', opacity: isSecure ? 0.3 : 1 }}>
            {todoItems.slice(0, 3).map((item) => (
              <S.TodoPreviewItem key={item.id} $completed={item.completed}>
                {item.completed ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                <span>{isSecure ? '••••••••' : item.text}</span>
              </S.TodoPreviewItem>
            ))}
            {todoItems.length > 3 && (
              <S.TodoPreviewItem style={{ opacity: 0.5, fontSize: '0.7rem', paddingLeft: '1.2rem' }}>
                + {todoItems.length - 3} {t('common.more')}...
              </S.TodoPreviewItem>
            )}
          </S.TodoPreview>
          <S.TodoProgress style={{ filter: isSecure ? 'blur(4px)' : 'none', opacity: isSecure ? 0.3 : 1 }}>
            <S.TodoProgressText>
              {Math.round(progressPercent)}%
            </S.TodoProgressText>
            <S.TodoProgressBar>
              <S.TodoProgressFill $width={progressPercent} />
            </S.TodoProgressBar>
          </S.TodoProgress>
        </>
      )}

      {isSecure && (
        <S.PrivateOverlay>
          <S.PrivateBadge>
            <Lock size={14} />
            Secure Todo
          </S.PrivateBadge>
        </S.PrivateOverlay>
      )}

      {todo.tags.length > 0 && (
        <S.TagContainer $blurred={isSecure}>
          {todo.tags.map(tag => (
            <S.Tag key={tag} onClick={(e) => { e.stopPropagation(); onToggleTag(tag); }}>
              <Hash size={8} /> {isSecure ? '••••' : tag}
            </S.Tag>
          ))}
        </S.TagContainer>
      )}

      <S.Footer>
        <S.DateInfo>
          {new Date(todo.updatedAt || todo.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
          })}
        </S.DateInfo>

        <S.BadgeGroup>
          <S.TodoBadge $completed={allDone}>
            <ListTodo size={10} />
            {completedCount}/{todoItems.length}
          </S.TodoBadge>
          
          {isSharedWithMe ? (
            <>
              <S.FieldBadge 
                $clickable
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                title={todo.ownerEmail || ''}
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
