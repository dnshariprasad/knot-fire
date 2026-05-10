import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Tag as TagIcon, Trash2, Plus, Check, Calendar, Hash, Edit2, Share2, MoreVertical, Users, Lock as LockIcon, Eye, EyeOff
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useCrypto } from '../../../context/CryptoContext';
import { LockScreen } from '../../layout/LockScreen';
import type { Todo, TodoItem } from '../../../types';
import { Modal } from '../../common/Modal';
import { ConfirmModal } from '../../common/ConfirmModal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import toast from 'react-hot-toast';
import * as S from './styles';

const ShareModal = lazy(() => import('../../notes/ShareModal').then(m => ({ default: m.ShareModal })));

interface TodoModalProps {
  todo?: Todo | null;
  allTags: string[];
  onClose: () => void;
  onSave: (todo: Partial<Todo>) => void;
  onDelete?: (id: string) => void;
  onShare: (sharedWith: any[]) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ 
  todo, 
  allTags,
  onClose, 
  onSave,
  onDelete,
  onShare
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(!todo);
  
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const { masterKey, setKey } = useCrypto();
  const [isEncrypted, setIsEncrypted] = useState(todo?.isEncrypted || false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isLocked = (todo?.isEncrypted || isEncrypted) && !isUnlocked;

  const [revealedTitle, setRevealedTitle] = useState(false);
  const [revealedItems, setRevealedItems] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const query = tagInputValue.trim().toLowerCase();
    if (!query) return [];
    return allTags.filter(tag => 
      tag.toLowerCase().includes(query) && 
      !tagList.includes(tag)
    );
  }, [allTags, tagInputValue, tagList]);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setItems(todo.items || []);
      setTagList(todo.tags || []);
      setIsEditing(false);
    } else {
      setTitle('');
      setItems([]);
      setTagList([]);
      setIsEditing(true);
    }
    setRevealedTitle(false);
    setRevealedItems(false);
  }, [todo]);

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;
    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false
    };
    setItems([...items, newItem]);
    setNewTodoText('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddTag = () => {
    const val = tagInputValue.trim().toLowerCase();
    if (val && !tagList.includes(val)) {
      setTagList([...tagList, val]);
      setTagInputValue('');
    }
  };

  const handleSave = () => {
    onSave({
      title,
      items,
      tags: tagList,
      isEncrypted
    });
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  const modalTitle = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span>{isEditing ? (todo ? t('app.editTodo') : t('app.newTodo')) : t('app.todoPreview')}</span>
      <S.ProgressValue>{Math.round(progressPercent)}%</S.ProgressValue>
      {todo && (todo.sharedWithUids?.length || 0) > 0 && (
        <S.SharedBadge title={t('notes.collaborators')}>
          <Users size={14} />
          <span>{todo.sharedWithUids?.length}</span>
        </S.SharedBadge>
      )}
      {todo && todo.userId !== user?.uid && (
        <S.SharedBadge $variant="secondary" title={todo.ownerEmail || ''}>
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
      maxWidth="600px"
      progress={progressPercent}
      data-testid="todo-modal"
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
      {isLocked ? (
        <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <LockScreen 
            onUnlock={(enteredKey) => {
              if (!masterKey) {
                setKey(enteredKey);
                setIsUnlocked(true);
              } else if (enteredKey === masterKey) {
                setIsUnlocked(true);
              } else {
                toast.error(t('security.invalidKey') || 'Invalid Master Key');
              }
            }} 
            onSkip={() => {}} 
          />
        </div>
      ) : isEditing ? (
        <S.EditContainer>
          <S.TitleWrapper>
            <S.TitleInput 
              placeholder={t('notes.titleLabel')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </S.TitleWrapper>

          <S.TodoSection>
            <S.ItemsList>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <S.TodoItem 
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    $completed={item.completed}
                    onClick={() => toggleItem(item.id)}
                  >
                    <S.Checkbox $checked={item.completed}>
                      {item.completed && <Check size={14} />}
                    </S.Checkbox>
                    <input 
                      value={item.text} 
                      placeholder={t('notes.addTodoItem')}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setItems(items.map(i => i.id === item.id ? { ...i, text: e.target.value } : i));
                      }}
                    />
                    <S.IconButton 
                      onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} 
                      $variant="danger"
                    >
                      <Trash2 size={14} />
                    </S.IconButton>
                  </S.TodoItem>
                ))}
              </AnimatePresence>
            </S.ItemsList>

            <S.AddTodoRow>
              <S.AddIconWrapper><Plus size={18} /></S.AddIconWrapper>
              <input 
                placeholder={t('notes.addTodoItem')}
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              {newTodoText && (
                <S.IconButton onClick={handleAddTodo} $variant="primary">
                  <Check size={14} />
                </S.IconButton>
              )}
            </S.AddTodoRow>
          </S.TodoSection>

          <S.TagSection>
             <S.SectionLabel><TagIcon size={14} /> {t('notes.tagsLabel')}</S.SectionLabel>
             <S.TagInputWrapper onClick={() => document.getElementById('todo-tag-input')?.focus()}>
               {tagList.map(tag => (
                 <S.TagChip key={tag}>
                   # {tag}
                   <X size={14} onClick={(e) => { e.stopPropagation(); setTagList(tagList.filter(t => t !== tag)); }} />
                 </S.TagChip>
               ))}
               <S.TagInput 
                 id="todo-tag-input"
                 placeholder={t('notes.addTagPlaceholder')}
                 value={tagInputValue}
                 onChange={(e) => {
                   setTagInputValue(e.target.value);
                   setShowSuggestions(true);
                 }}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     if (showSuggestions && filteredSuggestions.length > 0) {
                       const tag = filteredSuggestions[selectedIndex];
                       if (!tagList.includes(tag)) setTagList([...tagList, tag]);
                       setTagInputValue('');
                       setShowSuggestions(false);
                     } else {
                       handleAddTag();
                     }
                   } else if (e.key === 'ArrowDown') {
                     setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
                   } else if (e.key === 'ArrowUp') {
                     setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
                   } else if (e.key === 'Escape') {
                     setShowSuggestions(false);
                   }
                 }}
                 onFocus={() => setShowSuggestions(true)}
                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
               />
               
               {showSuggestions && tagInputValue && filteredSuggestions.length > 0 && (
                 <S.SuggestionsContainer>
                   {filteredSuggestions.map((tag: string, idx: number) => (
                     <S.SuggestionItem 
                       key={tag}
                       $selected={idx === selectedIndex}
                       onMouseDown={(e) => {
                         e.preventDefault();
                         if (!tagList.includes(tag)) setTagList([...tagList, tag]);
                         setTagInputValue('');
                         setShowSuggestions(false);
                       }}
                     >
                       <Hash size={12} /> {tag}
                     </S.SuggestionItem>
                   ))}
                 </S.SuggestionsContainer>
               )}
             </S.TagInputWrapper>
          </S.TagSection>

          <S.SettingsSection>
            <S.SectionLabel><LockIcon size={14} /> {t('security.title') || 'Security & Privacy'}</S.SectionLabel>
            <S.SettingsRow>
              <S.SettingsInfo>
                <S.SettingsTitle>{t('todos.secure') || 'Secure Todo'}</S.SettingsTitle>
                <S.SettingsDesc>{t('todos.secureDesc') || 'Encrypt this entire list with your Master Key'}</S.SettingsDesc>
              </S.SettingsInfo>
              <S.SettingsToggle 
                $active={isEncrypted} 
                onClick={() => setIsEncrypted(!isEncrypted)}
              >
                <S.SettingsToggleThumb $active={isEncrypted} />
              </S.SettingsToggle>
            </S.SettingsRow>
          </S.SettingsSection>
        </S.EditContainer>
      ) : (
        <S.ViewContainer>
           {title && (
             <S.ViewTitleWrapper>
               <S.ViewTitle $blurred={todo?.isEncrypted && !revealedTitle}>
                 {todo?.isEncrypted && !revealedTitle ? '••••••••••••' : title}
               </S.ViewTitle>
               {todo?.isEncrypted && (
                 <S.RevealIconButton onClick={() => setRevealedTitle(!revealedTitle)}>
                   {revealedTitle ? <EyeOff size={16} /> : <Eye size={16} />}
                 </S.RevealIconButton>
               )}
             </S.ViewTitleWrapper>
           )}
           
           {tagList.length > 0 && (
             <S.ViewTags>
               {tagList.map(tag => (
                 <S.TagChip key={tag}>
                   <Hash size={14} /> {tag}
                 </S.TagChip>
               ))}
             </S.ViewTags>
           )}

           <S.TodoSection>
             <S.ViewTitleWrapper style={{ marginBottom: '1rem' }}>
               <S.SectionLabel style={{ margin: 0 }}>{t('notes.todoItems') || 'Tasks'}</S.SectionLabel>
               {todo?.isEncrypted && (
                 <S.RevealIconButton onClick={() => setRevealedItems(!revealedItems)}>
                   {revealedItems ? <EyeOff size={16} /> : <Eye size={16} />}
                 </S.RevealIconButton>
               )}
             </S.ViewTitleWrapper>
             <S.ItemsList>
               {items.map(item => (
                 <S.TodoItem 
                    key={item.id} 
                    $viewOnly 
                    $completed={item.completed}
                    onClick={() => toggleItem(item.id)}
                  >
                   <S.Checkbox $checked={item.completed}>
                     {item.completed && <Check size={14} />}
                   </S.Checkbox>
                   <S.TodoText $completed={item.completed} $blurred={todo?.isEncrypted && !revealedItems}>
                     {todo?.isEncrypted && !revealedItems ? '••••••••••••••••' : item.text}
                   </S.TodoText>
                 </S.TodoItem>
               ))}
             </S.ItemsList>
           </S.TodoSection>

           <S.FooterSpacer>
            {todo && (
              <S.Timestamp title={t('todos.createdDate')}>
                <Calendar size={14} />
                {new Date(todo.createdAt).toLocaleDateString()}
              </S.Timestamp>
            )}
          </S.FooterSpacer>
        </S.ViewContainer>
      )}

      {showDeleteConfirm && todo && onDelete && (
        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            onDelete(todo.id);
            onClose();
          }}
          title={t('notes.deleteNote')}
          message={t('notes.deleteConfirm')}
        />
      )}

      <Suspense fallback={null}>
        {showShareModal && todo && (
          <ShareModal
            item={todo}
            onClose={() => setShowShareModal(false)}
            onShare={onShare}
          />
        )}
      </Suspense>
    </Modal>
  );
};
