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
  z-index: 3000;
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
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 12px 12px 0 0;
    max-height: 85vh;
    width: 100%;
    margin: 0;
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
  gap: 0.5rem;
`;

export const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

export const ShareInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0 0.25rem;
  transition: all 0.2s ease;
  min-width: 0;
  flex: 1;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  input {
    background: transparent !important;
    border: none !important;
    flex: 1;
    font-size: 0.9rem;
    padding: 0.75rem 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    min-width: 0;
    &:focus { box-shadow: none !important; }

    &::placeholder {
      opacity: 0.5;
    }

    /* Fix for browser autofill background */
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.surfaceLight} inset !important;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  @media (max-width: 768px) {
    padding: 0 0.15rem;
  }
`;

export const SelectTrigger = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.25rem;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }

  @media (max-width: 768px) {
    padding: 0.35rem 0.4rem;
    font-size: 0.65rem;
    margin-right: 0.1rem;
  }
`;

export const SelectContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 120px;
  z-index: 10000;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SelectItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary + '15' : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.text};
  font-size: 0.75rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const CollaboratorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CollaboratorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const CollaboratorInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`;

export const Name = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Role = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

export const SectionLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ $variant, theme }) => {
    if ($variant === 'primary') return `
      background: ${theme.colors.primary};
      color: white;
      border: none;
      &:hover { opacity: 0.9; transform: translateY(-1px); }
    `;
    if ($variant === 'outline') return `
      background: transparent;
      color: ${theme.colors.text};
      border: 1px solid ${theme.colors.border};
      &:hover { background: ${theme.colors.surfaceLight}; }
    `;
    return `
      background: ${theme.colors.surfaceLight};
      color: ${theme.colors.text};
      border: 1px solid ${theme.colors.border};
    `;
  }}
`;

export const IconButton = styled.button<{ $variant?: 'danger' | 'ghost' }>`
  background: transparent;
  border: none;
  color: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error : theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error + '10' : theme.colors.surfaceLight};
  }
`;
