import React from 'react';
import styled from 'styled-components';
import { Plus, Hash } from 'lucide-react';
import { UserDropdown } from './UserDropdown';

const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;

  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    @media (max-width: 640px) {
      display: none;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

interface HeaderProps {
  onAddNote: () => void;
  onThemeToggle: () => void;
  themeMode: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ 
  onAddNote,
  onThemeToggle,
  themeMode
}) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <Logo>
          <Hash size={24} />
          <span>Knot</span>
        </Logo>
      </LeftSection>

      <RightSection>
        <AddButton onClick={onAddNote}>
          <Plus size={20} />
          <span>New Note</span>
        </AddButton>
        <UserDropdown onThemeToggle={onThemeToggle} themeMode={themeMode} />
      </RightSection>
    </HeaderContainer>
  );
};
