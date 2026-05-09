import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  height: 100vh;
  width: ${({ $isOpen }) => $isOpen ? '260px' : '80px'};
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 1.5rem 0.75rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: ${({ $isOpen }) => $isOpen ? 'row' : 'column'};
  align-items: center;
  justify-content: ${({ $isOpen }) => $isOpen ? 'space-between' : 'center'};
  gap: ${({ $isOpen }) => $isOpen ? '0' : '1.5rem'};
  margin-bottom: 2.5rem;
  padding: 0 0.25rem;
`;

export const LogoSection = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  img {
    flex-shrink: 0;
  }
`;

export const AppName = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.text}, ${({ theme }) => theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
`;

export const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + '10'};
  }
`;

export const NavSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textMuted};
  background: ${({ $active, theme }) => $active ? theme.colors.primary + '10' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;

  svg {
    flex-shrink: 0;
    stroke-width: ${({ $active }) => $active ? '2.5px' : '2px'};
  }

  &:hover {
    background: ${({ $active, theme }) => $active ? theme.colors.primary + '15' : theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavItemLabel = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  flex: 1;
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const UserSection = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 14px;
  overflow: hidden;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
