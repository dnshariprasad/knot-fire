import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;

  @media (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 12px 12px 0 0;
    border-bottom: none;
  }
`;

export const ModalHandle = styled.div`
  display: none;
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TabList = styled.div`
  display: flex;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight + '50'};
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 1rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  border-bottom: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  margin-right: 2rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatusCard = styled.div<{ $active: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '10' : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StatusIcon = styled.div<{ $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  span:first-child {
    font-weight: 700;
    font-size: 1rem;
  }
  
  span:last-child {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'outline' }>`
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;

  ${({ $variant, theme }) => {
    if ($variant === 'primary') return `
      background: ${theme.colors.primary};
      color: white;
      &:hover { background: ${theme.colors.primaryDark}; }
    `;
    if ($variant === 'danger') return `
      background: ${theme.colors.error + '15'};
      color: ${theme.colors.error};
      &:hover { background: ${theme.colors.error + '25'}; }
    `;
    return `
      background: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text};
      &:hover { background: ${theme.colors.surfaceLight}; }
    `;
  }}
`;

export const IconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const WarningBox = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  gap: 0.75rem;
  color: #991b1b;
  font-size: 0.8125rem;
  line-height: 1.5;
`;

export const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

export const LanguageButton = styled.button<{ $active: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '10' : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $active }) => $active ? '700' : '500' };
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;
  text-align: left;

  span:last-child {
    font-size: 0.75rem;
    opacity: 0.7;
    font-weight: 500;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + '05'};
  }
`;
