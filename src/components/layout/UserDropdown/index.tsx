import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User as UserIcon, Moon, Sun, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface UserDropdownProps {
  onThemeToggle: () => void;
  onSecurityClick: () => void;
  themeMode: 'light' | 'dark';
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ onThemeToggle, onSecurityClick: onSettingsClick, themeMode }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <S.Container ref={dropdownRef}>
      <S.Trigger onClick={() => setIsOpen(!isOpen)}>
        <S.Avatar>
          {user?.email?.charAt(0).toUpperCase() || <UserIcon size={16} />}
        </S.Avatar>
        <ChevronDown size={14} color="#94a3b8" />
      </S.Trigger>

      <AnimatePresence>
        {isOpen && (
          <S.Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <S.UserInfo>
              <span style={{ fontWeight: 600 }}>{t('auth.signedInAs')}</span>
              <S.UserEmail>{user?.email}</S.UserEmail>
            </S.UserInfo>
            
            <S.MenuItem onClick={() => { onThemeToggle(); setIsOpen(false); }}>
              {themeMode === 'light' ? (
                <><Moon size={16} /> {t('common.darkMode')}</>
              ) : (
                <><Sun size={16} /> {t('common.lightMode')}</>
              )}
            </S.MenuItem>

            <S.MenuItem onClick={() => { onSettingsClick(); setIsOpen(false); }}>
              <Settings size={16} /> {t('settings.title')}
            </S.MenuItem>

            <S.MenuItem $danger onClick={logout}>
              <LogOut size={16} /> {t('auth.logout')}
            </S.MenuItem>
          </S.Dropdown>
        )}
      </AnimatePresence>
    </S.Container>
  );
};
