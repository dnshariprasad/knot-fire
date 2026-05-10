import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  StickyNote, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  LogOut,
  User,
  Lock
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCrypto } from '../../../context/CryptoContext';
import * as S from './styles';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: 'notes' | 'todos';
  onTabChange: (tab: 'notes' | 'todos') => void;
  onOpenSettings: () => void;
  stats: {
    notes: number;
    todos: number;
  };
  'data-testid'?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeTab,
  onTabChange,
  onOpenSettings,
  stats,
  'data-testid': testId
}) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { masterKey, clearKey } = useCrypto();

  return (
    <S.SidebarContainer $isOpen={isOpen} data-testid={testId}>
      <S.SidebarHeader $isOpen={isOpen}>
        <S.LogoSection $isOpen={isOpen}>
          <img src="/favicon.svg" alt="Knot" width="24" height="24" />
          {isOpen && <S.AppName>{t('app.title')}</S.AppName>}
        </S.LogoSection>
        <S.ToggleButton onClick={onToggle}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </S.ToggleButton>
      </S.SidebarHeader>

      <S.NavSection>
        <S.NavItem 
          $active={activeTab === 'notes'} 
          onClick={() => onTabChange('notes')}
          title={t('app.notes')}
        >
          <StickyNote size={22} />
          {isOpen && (
            <>
              <S.NavItemLabel>{t('app.notes')}</S.NavItemLabel>
              <S.Badge>{stats.notes}</S.Badge>
            </>
          )}
        </S.NavItem>

        <S.NavItem 
          $active={activeTab === 'todos'} 
          onClick={() => onTabChange('todos')}
          title={t('app.todos')}
        >
          <CheckSquare size={22} />
          {isOpen && (
            <>
              <S.NavItemLabel>{t('app.todos')}</S.NavItemLabel>
              <S.Badge>{stats.todos}</S.Badge>
            </>
          )}
        </S.NavItem>
      </S.NavSection>

      <S.FooterSection>
        <S.NavItem onClick={onOpenSettings} title={t('settings.title')}>
          <Settings size={22} />
          {isOpen && <S.NavItemLabel>{t('settings.title')}</S.NavItemLabel>}
        </S.NavItem>

        <S.UserSection $isOpen={isOpen}>
          <S.UserAvatar>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} />
            ) : (
              <User size={20} />
            )}
          </S.UserAvatar>
          {isOpen && (
            <S.UserInfo>
              <S.UserName>{user?.displayName || 'User'}</S.UserName>
              <S.UserEmail>{user?.email}</S.UserEmail>
            </S.UserInfo>
          )}
        </S.UserSection>

        {masterKey && (
          <S.NavItem onClick={clearKey} title={t('security.lockVault') || 'Lock Vault'}>
            <Lock size={22} style={{ color: '#ff4d4d' }} />
            {isOpen && <S.NavItemLabel>{t('security.lockVault') || 'Lock Vault'}</S.NavItemLabel>}
          </S.NavItem>
        )}

        <S.NavItem onClick={logout} title={t('auth.logout')}>
          <LogOut size={22} />
          {isOpen && <S.NavItemLabel>{t('auth.logout')}</S.NavItemLabel>}
        </S.NavItem>
      </S.FooterSection>
    </S.SidebarContainer>
  );
};
