import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-280px')};
    z-index: 100;
  }
`;
