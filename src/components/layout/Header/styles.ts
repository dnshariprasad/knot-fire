import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  width: 100%;
`;

export const HeaderContent = styled.div<{ $viewMode?: 'grid' | 'list' }>`
  max-width: ${({ $viewMode }) => $viewMode === 'list' ? '800px' : '1200px'};
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.div`
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

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const IconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;
