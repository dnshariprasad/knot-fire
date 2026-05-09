import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
  position: relative;
`;

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
  position: relative;
`;

export const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const TitleInput = styled.input`
  font-size: 1.1rem;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 14px;
  padding: 0.875rem 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.5;
  }
`;

export const ViewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
`;

export const ProgressValue = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary + '10'};
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  line-height: 1;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoItem = styled(motion.div)<{ $completed?: boolean; $viewOnly?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  padding: 1.125rem 1.25rem;
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: ${({ theme, $completed }) => $completed ? theme.colors.textMuted : theme.colors.text};
    font-size: 1.05rem;
    font-weight: 500;
    outline: none;
    text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
    transition: all 0.2s;

    &::placeholder {
      opacity: 0.3;
    }
  }

  ${({ $viewOnly }) => $viewOnly && css`
    padding: 1.25rem 0.5rem;
  `}
`;

export const TodoText = styled.span<{ $completed: boolean }>`
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, $completed }) => $completed ? theme.colors.textMuted : theme.colors.text};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  transition: all 0.2s;
`;

export const Checkbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 2px solid ${({ $checked, theme }) => $checked ? theme.colors.primary : theme.colors.border};
  background: ${({ $checked, theme }) => $checked ? theme.colors.primary : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $checked }) => $checked && css`
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}44;
  `}
`;

export const AddTodoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s;

  &:focus-within {
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: 500;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

export const AddIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  padding: 0.875rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  min-height: 50px;
  cursor: text;
`;

export const TagInput = styled.input`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  min-width: 120px;
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.5;
  }
`;

export const TagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primary}11;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.375rem 0.75rem;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.primary}22;

  svg {
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.6; }
  }
`;

export const ViewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const StickyFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.surface};
  z-index: 10;
`;

export const FooterSpacer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Timestamp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button<{ $variant: 'primary' | 'outline' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  border-radius: 14px;
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;

  ${({ $variant, theme }) => $variant === 'primary' ? css`
    background: ${theme.colors.primary};
    color: white;
    box-shadow: 0 4px 15px ${theme.colors.primary}44;

    &:hover {
      background: ${theme.colors.primaryDark || theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${theme.colors.primary}66;
    }
  ` : css`
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};

    &:hover {
      background: ${theme.colors.border}22;
      transform: translateY(-2px);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const IconButton = styled.button<{ $variant: 'primary' | 'outline' | 'danger' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  flex-shrink: 0;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary};
          color: white;
          &:hover { transform: scale(1.1); }
        `;
      case 'danger':
        return css`
          background: transparent;
          color: ${theme.colors.error};
          opacity: 0.4;
          &:hover { 
            opacity: 1; 
            background: ${theme.colors.error}11;
          }
        `;
      default:
        return css`
          background: ${theme.colors.surfaceLight};
          color: ${theme.colors.textMuted};
          border: 1px solid ${theme.colors.border};
          &:hover { 
            color: ${theme.colors.text};
            background: ${theme.colors.border}22;
          }
        `;
    }
  }}
`;

export const FixedActionButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  padding: 0;
  margin-right: auto;
`;

export const DropdownContent = styled(DropdownMenuPrimitive.Content)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  min-width: 180px;
  z-index: 3000;
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DropdownItem = styled(DropdownMenuPrimitive.Item)`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
  }

  &.danger {
    color: ${({ theme }) => theme.colors.error};
    &:hover, &:focus {
      background: ${({ theme }) => theme.colors.error}15;
    }
  }
`;

export const SharedBadge = styled.div<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  
  ${({ $variant, theme }) => $variant === 'secondary' ? css`
    background: ${theme.colors.secondary || '#6366f1'}15;
    color: ${theme.colors.secondary || '#6366f1'};
    border: 1px solid ${theme.colors.secondary || '#6366f1'}33;
  ` : css`
    background: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary}33;
  `}

  span {
    line-height: 1;
  }
`;

