import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserDropdown } from '../UserDropdown';
import * as S from './styles';

interface HeaderProps {
  onThemeToggle: () => void;
  onSettingsClick: () => void;
  themeMode: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ 
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
