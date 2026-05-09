import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Calendar } from 'lucide-react';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;

  @media (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
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
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  font-size: 0.85rem;
  font-weight: 800;
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
  border-radius: 14px;
  padding: 0.875rem 1.25rem;
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
  border-radius: 14px;
  padding: 1.25rem;
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
  border-radius: 14px;
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

export const QuickActionButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '10' : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
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
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight + '40'};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight + '60'};
    box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.1);
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
    $variant === 'label' ? '0.75rem' : 
    $isDate ? '1.25rem' : 
    $isLink ? '0.9rem' : 
    '1.1rem'
  };
  font-weight: ${({ $variant, $isLink }) => $variant === 'label' ? '800' : $isLink ? '400' : '600'};
  font-family: ${({ $isDate, $isLink }) => ($isDate || $isLink) ? "'JetBrains Mono', monospace" : 'inherit'};

  &::placeholder {
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.4;
  }

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

export const FetchingIndicator = styled(motion.div)`
  position: absolute;
  right: 2.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  pointer-events: none;
  z-index: 2;

  svg {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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
  bottom: 0;
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.surface + 'cc'};
  backdrop-filter: blur(12px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  z-index: 10;
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
  font-size: 1.5rem;
  font-weight: 900;
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
  font-size: 0.8rem;
  font-weight: 800;
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

export const DropdownContent = styled(DropdownMenu.Content)`
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

export const DropdownItem = styled(DropdownMenu.Item)`
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
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const ModalTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
`;

export const ModalTitleText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LockIconWrapper = styled.div<{ $revealed?: boolean; $primary?: boolean }>`
  flex-shrink: 0;
  color: ${({ theme, $primary }) => $primary ? theme.colors.primary : 'inherit'};
  opacity: ${({ $revealed }) => $revealed ? 0.5 : 1};
  display: flex;
  align-items: center;
`;

export const LockView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 1.5rem;
`;

export const LockIconHero = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary + '15'};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LockContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

export const LockTitleText = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const LockDescriptionText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;

export const VerifyForm = styled.form`
  width: 100%;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const UnlockInput = styled(Input)`
  text-align: center;
  letter-spacing: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const UnlockButton = styled(Button)`
  height: 48px;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

export const ViewHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const FieldValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const PeriodBadge = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
  font-weight: 800;
  background: ${({ theme }) => theme.colors.primary + '12'};
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
  white-space: nowrap;
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PrivacySection = styled(FormGroup)`
  padding: 1.25rem;
  background: #f8fafc05;
  border-radius: 12px;
  border: 1px solid #e2e8f010;
`;

export const PrivacyLabel = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : 'inherit'};
`;

export const PrivacyDesc = styled.p<{ $hasMargin: boolean }>`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ $hasMargin }) => $hasMargin ? '1rem' : 0};
`;

export const PINInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PINLabel = styled(Label)`
  font-size: 0.65rem;
`;

export const PINInput = styled(Input)`
  margin-top: 0.4rem;
  text-align: center;
  letter-spacing: 0.5rem;
  font-size: 1.25rem;
`;

export const FooterSpacer = styled.div`
  margin-top: auto;
`;

export const HeaderLabel = styled(Label)`
  margin: 0;
`;

export const DateIconWrapper = styled(Calendar)`
  position: absolute;
  left: 1rem;
  top: 68%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

export const AbsoluteIconButton = styled(IconButton)`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 0.25rem;
`;

export const FixedActionButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  padding: 0;
  margin-right: auto;
`;

export const ActionIconButton = styled(IconButton)`
  padding: 0.25rem;
`;

export const RevealIconButton = styled(IconButton)`
  padding: 0.25rem;
  margin-left: auto;
`;

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

export const TodoItemRow = styled(motion.div)<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, $completed }) => $completed ? theme.colors.primary + '30' : theme.colors.border};
  opacity: ${({ $completed }) => $completed ? 0.7 : 1};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const TodoCheckbox = styled.button<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid ${({ theme, $checked }) => $checked ? theme.colors.primary : theme.colors.textMuted + '40'};
  background: ${({ theme, $checked }) => $checked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TodoText = styled.input<{ $completed?: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme, $completed }) => $completed ? theme.colors.textMuted : theme.colors.text};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  font-size: 0.9375rem;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.4;
    text-decoration: none;
  }
`;

export const TodoDueDate = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  outline: none;
  width: 100px;
  cursor: pointer;
  text-align: right;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const TodoDeleteButton = styled.button`
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.colors.error + '10'};
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const TodoAddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: 0.5rem;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const TodoAddInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9375rem;
  font-weight: 600;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.6;
  }
`;

export const EmptyTodoState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  font-style: italic;
`;

export const TodoProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ProgressLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const ProgressBarFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

export const SharedBadge = styled.div<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  
  ${({ $variant, theme }) => $variant === 'secondary' ? `
    background: ${theme.colors.secondary || '#6366f1'}15;
    color: ${theme.colors.secondary || '#6366f1'};
    border: 1px solid ${theme.colors.secondary || '#6366f1'}33;
  ` : `
    background: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary}33;
  `}

  span {
    line-height: 1;
  }
`;

