import styled from 'styled-components';
import { Mail, ChevronDown } from 'lucide-react';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  border-radius: 14px;
  padding: 0 0.5rem;
  transition: all 0.2s ease;
  min-width: 0;
  flex: 1;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}10;
  }

  input {
    background: transparent !important;
    border: none !important;
    flex: 1;
    font-size: 0.9375rem;
    font-weight: 500;
    padding: 0.875rem 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    min-width: 0;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
      opacity: 0.5;
    }
  }
`;

export const SelectTrigger = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-right: 0.25rem;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}05;
  }
`;

export const SelectContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 140px;
  z-index: 10000;
`;

export const SelectItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary + '11' : 'transparent'};
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
  gap: 0.75rem;
`;

export const CollaboratorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary + '44'};
    transform: translateX(4px);
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary + '11'};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.primary}22;
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
  gap: 0.125rem;
  min-width: 0;
`;

export const Name = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Role = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const SectionLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const IconButton = styled.button<{ $variant?: 'danger' | 'ghost' }>`
  background: transparent;
  border: none;
  color: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error : theme.colors.textMuted};
  padding: 0.625rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error + '11' : theme.colors.border + '11'};
    color: ${({ theme, $variant }) => $variant === 'danger' ? theme.colors.error : theme.colors.text};
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const ShareInputBox = styled(InputWrapper)`
  flex: 1;
  position: relative;
`;

export const SuggestionsList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 10001;
  overflow: hidden;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    opacity: 0.5;
  }
`;

export const MailIcon = styled(Mail)`
  margin-left: 0.5rem;
  opacity: 0.4;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DropdownIcon = styled(ChevronDown)`
  opacity: 0.4;
`;

export const AddButton = styled.button<{ $variant?: 'primary' }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}44;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary}66;
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
