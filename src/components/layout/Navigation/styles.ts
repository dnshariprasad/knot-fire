import styled from 'styled-components';

export const BottomBar = styled.nav`
  position: fixed;
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: ${({ theme }) => theme.colors.surface + '95'};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(64px + env(safe-area-inset-bottom));
  }
`;

export const BottomTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ $active, theme }) => $active ? theme.colors.primary + '10' : 'transparent'};
  border: none;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textMuted};
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    min-width: unset;
    flex: 1;
    border-radius: 0;
    background: transparent;
  }

  span {
    font-size: 0.875rem;
    font-weight: 800;
    letter-spacing: 0.02em;

    @media (max-width: 768px) {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  &:hover {
    background: ${({ $active, theme }) => $active ? theme.colors.primary + '15' : theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;
