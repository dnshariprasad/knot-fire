import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { 
  X, Mail, Shield, Trash2, Check, ChevronDown
} from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../../../firebase';
import type { Note, SharedUser } from '../../../types';
import * as S from './styles';
import toast from 'react-hot-toast';

interface ShareModalProps {
  note: Note;
  onClose: () => void;
  onShare: (sharedWith: SharedUser[]) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ note, onClose, onShare }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'read' | 'write'>('read');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSharedUser = async () => {
    if (!email.trim()) return;
    if (note.sharedWith?.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error(t('notes.userAlreadyAdded'));
      return;
    }

    setIsSubmitting(true);
    try {
      const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error(t('notes.userNotFound'));
        setIsSubmitting(false);
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const newSharedUser: SharedUser = {
        userId: userData.uid,
        email: userData.email,
        permission
      };

      const currentSharedWith = note.sharedWith || [];
      onShare([...currentSharedWith, newSharedUser]);
      setEmail('');
      toast.success(t('notes.shareSuccess'));
    } catch (error) {
      console.error("Error sharing note:", error);
      toast.error(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveUser = (userId: string) => {
    const updated = (note.sharedWith || []).filter(u => u.userId !== userId);
    onShare(updated);
  };

  return (
    <S.Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <S.Modal
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Header>
          <S.Title>
            <Mail size={20} /> {t('notes.shareWith')}
          </S.Title>
          <S.IconButton onClick={onClose} $variant="ghost">
            <X size={20} />
          </S.IconButton>
        </S.Header>

        <S.Content>
          <S.ShareInputGroup>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <S.InputWrapper style={{ flex: 1 }}>
                <Mail size={18} style={{ marginLeft: '0.5rem', opacity: 0.5 }} />
                <input 
                  type="email" 
                  placeholder={t('notes.enterUserEmail')} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSharedUser()}
                />
                
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <S.SelectTrigger>
                      {permission === 'read' ? t('notes.readOnly') : t('notes.readWrite')}
                      <ChevronDown size={14} style={{ opacity: 0.5 }} />
                    </S.SelectTrigger>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content asChild sideOffset={4} align="end">
                      <S.SelectContent>
                        <DropdownMenu.Item asChild onSelect={() => setPermission('read')}>
                          <S.SelectItem $active={permission === 'read'}>
                            {t('notes.readOnly')}
                            {permission === 'read' && <Check size={14} />}
                          </S.SelectItem>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild onSelect={() => setPermission('write')}>
                          <S.SelectItem $active={permission === 'write'}>
                            {t('notes.readWrite')}
                            {permission === 'write' && <Check size={14} />}
                          </S.SelectItem>
                        </DropdownMenu.Item>
                      </S.SelectContent>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </S.InputWrapper>
              
              <S.Button 
                $variant="primary" 
                onClick={handleAddSharedUser} 
                disabled={isSubmitting}
                style={{ width: '44px', height: '44px', padding: 0, borderRadius: '12px', flexShrink: 0 }}
              >
                {isSubmitting ? '...' : <Check size={18} />}
              </S.Button>
            </div>
          </S.ShareInputGroup>

          {note.sharedWith && note.sharedWith.length > 0 && (
            <S.CollaboratorList>
              <S.SectionLabel>{t('notes.collaborators')}</S.SectionLabel>
              {note.sharedWith.map((collaborator) => (
                <S.CollaboratorItem key={collaborator.userId}>
                  <S.CollaboratorInfo>
                    <S.Avatar>
                      {collaborator.email[0].toUpperCase()}
                    </S.Avatar>
                    <S.Details>
                      <S.Name>{collaborator.email}</S.Name>
                      <S.Role>
                        <Shield size={12} />
                        {collaborator.permission === 'read' ? t('notes.readOnly') : t('notes.readWrite')}
                      </S.Role>
                    </S.Details>
                  </S.CollaboratorInfo>
                  <S.IconButton 
                    $variant="danger" 
                    onClick={() => handleRemoveUser(collaborator.userId)}
                  >
                    <Trash2 size={16} />
                  </S.IconButton>
                </S.CollaboratorItem>
              ))}
            </S.CollaboratorList>
          )}
        </S.Content>
      </S.Modal>
    </S.Overlay>
  );
};
