import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  break-inside: avoid;
  margin-bottom: 0.75rem;
  width: 100%;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Title = styled.h3<{ $blurred?: boolean }>`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.3 : 1};
`;

export const MoreButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Popover = styled(DropdownMenu.Content)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 140px;
  overflow: hidden;
  margin-top: 0.25rem;
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
  padding: 0.625rem 0.875rem;
  font-size: 0.8125rem;
  background: transparent;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const Content = styled.p<{ $blurred?: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
  filter: ${({ $blurred }) => $blurred ? 'blur(8px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

export const TagContainer = styled.div<{ $blurred?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.15rem 0.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const FieldsGrid = styled.div<{ $blurred?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
  filter: ${({ $blurred }) => $blurred ? 'blur(6px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

export const FieldItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 0;
  width: 100%;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    a {
      &:hover {
        color: ${({ theme }) => theme.colors.primary} !important;
        text-decoration: underline !important;
      }
    }
  }
`;

export const PrivateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 5;
  background: transparent;
`;

export const PrivateBadge = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const FieldBadge = styled.div<{ $variant?: 'primary'; $clickable?: boolean }>`
  background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary + '15' : theme.colors.surfaceLight};
  color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary : theme.colors.textMuted};
  border: 1px solid ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary + '25' : theme.colors.border};
  padding: 0.15rem 0.4rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 800;
  min-height: 22px;
  min-width: 22px;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  ${({ $clickable, theme }) => $clickable && `
    &:hover {
      background: ${theme.colors.primary + '25'};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
      transform: translateY(-1px);
    }
  `}
`;

export const Footer = styled.div<{ $blurred?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.3 : 1};
`;

export const DateInfo = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`;

export const HeaderSpacer = styled.div`
  flex: 1;
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const TodoPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.5rem 0;
`;

export const TodoPreviewItem = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: ${({ theme, $completed }) => $completed ? theme.colors.textMuted : theme.colors.text};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  opacity: ${({ $completed }) => $completed ? 0.6 : 1};

  svg {
    flex-shrink: 0;
    color: ${({ theme, $completed }) => $completed ? theme.colors.primary : theme.colors.border};
  }
`;

export const TodoProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: ${({ theme }) => theme.colors.border}22;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  z-index: 5;
`;

export const TodoProgressText = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 0.65rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary + '10'};
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  z-index: 5;
`;

export const TodoProgressBar = styled.div`
  width: 100%;
  height: 100%;
`;

export const TodoProgressFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

export const TodoBadge = styled.div<{ $completed?: boolean }>`
  background: ${({ theme, $completed }) => $completed ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $completed }) => $completed ? 'white' : theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.1rem 0.5rem;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

