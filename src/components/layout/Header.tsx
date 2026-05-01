import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { UserDropdown } from './UserDropdown';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  width: 100%;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
      <HeaderContent>
        <LeftSection>
          <Logo onClick={() => window.location.reload()}>
            <img src="/favicon.svg" alt="Knot Logo" width="32" height="32" />
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
      </HeaderContent>
    </HeaderContainer>
  );
};
