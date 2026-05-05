import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserDropdown } from '../UserDropdown';
import * as S from './styles';

interface HeaderProps {
  onAddNote: () => void;
  onThemeToggle: () => void;
  onSettingsClick: () => void;
  themeMode: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ 
  onAddNote,
  onThemeToggle,
  onSettingsClick,
  themeMode
}) => {
  const { t } = useTranslation();

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftSection>
          <S.Logo onClick={() => window.location.reload()}>
            <img src="/favicon.svg" alt={t('app.logoAlt')} width="32" height="32" />
            <span>{t('app.title')}</span>
          </S.Logo>
        </S.LeftSection>

        <S.RightSection>
          <S.AddButton onClick={onAddNote}>
            <Plus size={20} />
            <span>{t('app.newNote')}</span>
          </S.AddButton>
          <UserDropdown 
            onThemeToggle={onThemeToggle} 
            onSecurityClick={onSettingsClick}
            themeMode={themeMode} 
          />
        </S.RightSection>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};
