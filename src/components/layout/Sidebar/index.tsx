import React from 'react';
import * as S from './styles';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <S.SidebarContainer $isOpen={isOpen}>
      {/* Sidebar content removed per user request */}
    </S.SidebarContainer>
  );
};
