import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { 
  Shield, Trash2, Check, UserPlus
} from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../../../firebase';
import type { SharedUser } from '../../../types';
import { Modal } from '../../common/Modal';
import * as S from './styles';
import toast from 'react-hot-toast';

interface ShareModalProps {
  item: {
    id: string;
    sharedWith?: SharedUser[];
  };
  onClose: () => void;
  onShare: (sharedWith: SharedUser[]) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ item, onClose, onShare }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'read' | 'write'>('read');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSharedUser = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;
    
    if (item.sharedWith?.some(u => u.email.toLowerCase() === trimmedEmail)) {
      toast.error(t('notes.userAlreadyAdded'));
      return;
    }

    setIsSubmitting(true);
    try {
      const q = query(collection(db, 'users'), where('email', '==', trimmedEmail));
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

      const currentSharedWith = item.sharedWith || [];
      onShare([...currentSharedWith, newSharedUser]);
      setEmail('');
      toast.success(t('notes.shareSuccess'));
    } catch (error) {
      console.error("Error sharing item:", error);
      toast.error(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveUser = (userId: string) => {
    const updated = (item.sharedWith || []).filter(u => u.userId !== userId);
    onShare(updated);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={<><UserPlus size={20} /> {t('notes.shareWith')}</>}
      maxWidth="500px"
    >
      <S.Content>
        <S.ShareInputGroup>
          <S.SectionLabel>{t('notes.enterUserEmail')}</S.SectionLabel>
          <S.ActionGroup>
            <S.ShareInputBox>
              <S.MailIcon size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSharedUser()}
              />
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <S.SelectTrigger>
                    {permission === 'read' ? t('notes.readOnly') : t('notes.readWrite')}
                    <S.DropdownIcon size={14} />
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
            </S.ShareInputBox>
            
            <S.AddButton 
              $variant="primary" 
              onClick={handleAddSharedUser} 
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : <Check size={18} />}
            </S.AddButton>
          </S.ActionGroup>
        </S.ShareInputGroup>

        {item.sharedWith && item.sharedWith.length > 0 && (
          <S.CollaboratorList>
            <S.SectionLabel>{t('notes.collaborators')}</S.SectionLabel>
            {item.sharedWith.map((collaborator) => (
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
    </Modal>
  );
};
