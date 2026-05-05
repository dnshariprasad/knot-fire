import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const Title = styled.h3<{ $blurred?: boolean }>`
  font-size: 1rem;
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
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
  margin-top: 0.25rem;
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.6875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
  padding-top: 0.75rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
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
