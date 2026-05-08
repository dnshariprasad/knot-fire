import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 12px 12px 0 0;
    max-height: 95vh;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
`;

export const Header = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Body = styled.div`
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '20'};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '20'};
  }
`;

export const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 42px;
  align-items: center;

  position: relative;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: -1px;
`;

export const SuggestionItem = styled.div<{ $selected?: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, $selected }) => $selected ? theme.colors.surfaceLight : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TagInput = styled.input`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  outline: none;
  padding: 0.25rem 0;
`;

export const Chip = styled.span`
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary + '30'};
  padding: 0.375rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  button {
    background: transparent;
    border: none;
    color: inherit;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
`;

export const DynamicFieldsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const QuickActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
`;

export const QuickActionButton = styled.button`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + '10'};
  }
`;

export const FieldRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '20'};
  }
`;

export const FieldInput = styled.input<{ $variant?: 'label' | 'value'; $isDate?: boolean; $isLink?: boolean }>`
  background: transparent;
  border: none;
  padding: ${({ $variant, $isDate }) => {
    if ($variant === 'label') return '0.75rem 1rem 0.25rem';
    return $isDate ? '0.25rem 1rem 0.75rem 2.75rem' : '0.25rem 1rem 0.75rem';
  }};
  color: ${({ theme, $variant }) => $variant === 'label' ? theme.colors.textMuted : theme.colors.text};
  
  &:focus {
    outline: none;
  }
  font-size: ${({ $variant, $isDate, $isLink }) => 
    $variant === 'label' ? '0.6rem' : 
    $isDate ? '1.25rem' : 
    $isLink ? '0.9rem' : 
    '1.1rem'
  };
  font-weight: ${({ $variant, $isLink }) => $variant === 'label' ? '800' : $isLink ? '400' : '600'};
  font-family: ${({ $isDate, $isLink }) => ($isDate || $isLink) ? "'JetBrains Mono', monospace" : 'inherit'};

  ${({ $isDate, theme }) => $isDate && `
    &::-webkit-datetime-edit {
      color: ${theme.colors.textMuted};
      opacity: 0.5;
    }
    &:focus::-webkit-datetime-edit,
    &:not([value=""])::-webkit-datetime-edit {
      color: ${theme.colors.text};
      opacity: 1;
    }
  `}

  text-transform: ${({ $variant }) => $variant === 'label' ? 'uppercase' : 'none'};
  letter-spacing: ${({ $variant }) => $variant === 'label' ? '0.08em' : 'normal'};
  width: 100%;
  min-width: 0;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.4;
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    width: 2rem;
    position: absolute;
    left: 0.5rem;
    bottom: 0.75rem;
    height: 1.5rem;
  }
`;

export const FieldTextArea = styled.textarea<{ $variant?: 'label' | 'value' }>`
  background: transparent;
  border: none;
  padding: 0.25rem 1rem 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.6;
  width: 100%;
  min-width: 0;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.4;
  }
`;

export const FieldDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  opacity: 0.3;
`;

export const StickyFooter = styled.div`
  position: sticky;
  bottom: -1.5rem; /* Match Modal Body padding */
  left: -1.5rem;
  right: -1.5rem;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 0.75rem;
  margin: 1.5rem -1.5rem -1.5rem -1.5rem;
  z-index: 10;
  backdrop-filter: blur(8px);
`;

export const IconButton = styled.button<{ $variant?: 'primary' | 'danger' | 'outline' }>`
  background: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.primary : 
    $variant === 'danger' ? theme.colors.error + '10' : 
    'transparent'};
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? 'white' : 
    $variant === 'danger' ? theme.colors.error : 
    theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 8px;
  border: ${({ theme, $variant }) => 
    $variant === 'danger' ? `1px solid ${theme.colors.error}30` : 
    $variant === 'outline' ? `1px solid ${theme.colors.border}` : 
    'none'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme, $variant }) => 
      $variant === 'primary' ? theme.colors.primaryDark : 
      $variant === 'danger' ? theme.colors.error + '20' : 
      theme.colors.surfaceLight};
    border-color: ${({ theme, $variant }) => 
      $variant === 'outline' ? theme.colors.primary : 'none'};
    color: ${({ theme, $variant }) => 
      $variant === 'primary' ? 'white' : 
      $variant === 'danger' ? theme.colors.error : 
      theme.colors.text};
  }
`;

export const AddFieldButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.primary + '40'};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.primary + '60'};
  }
`;

export const Footer = styled.div`
  padding: 1.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const Timestamp = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  padding: 0.625rem 1.25rem;
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
      box-shadow: 0 2px 4px ${theme.colors.primary}40;
      &:hover { 
        background: ${theme.colors.primaryDark};
        box-shadow: 0 4px 8px ${theme.colors.primary}60;
      }
    `;
    if ($variant === 'outline') return `
      background: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text};
      &:hover { 
        background: ${theme.colors.surfaceLight};
        border-color: ${theme.colors.primary};
      }
    `;
    return '';
  }}
`;

export const Toggle = styled.button<{ $active: boolean }>`
  width: 36px;
  height: 18px;
  border-radius: 18px;
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => $active ? '20px' : '2px'};
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

export const ViewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100%;
`;

export const ViewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ViewTitle = styled.h1`
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const ViewBody = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
`;

export const ViewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const TagChip = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.15rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.6875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const CustomFieldDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const FieldCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FieldLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FieldValue = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  word-break: break-all;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    &:hover { text-decoration: underline; }
  }
`;

export const LockView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1.5rem;
  text-align: center;
`;

export const LockIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary + '15'};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Popover = styled(DropdownMenu.Content)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 160px;
  overflow: hidden;
  margin-top: 0.5rem;
  z-index: 9999;

  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  animation: scaleIn 0.2s ease;
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const PopoverItem = styled(DropdownMenu.Item)<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  background: transparent;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;
