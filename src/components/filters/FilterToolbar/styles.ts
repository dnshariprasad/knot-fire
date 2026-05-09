import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const ToolbarContainer = styled.div<{ $viewMode?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 1.25rem;
  width: 100%;
  max-width: ${({ $viewMode }) => $viewMode === 'list' ? '900px' : '1300px'};
  margin: 0 auto 1.5rem auto;
  position: sticky;
  top: 1rem;
  z-index: 100;

  @media (max-width: 768px) {
    margin: 0 0 1rem 0;
    width: 100%;
    padding: 0.5rem 0;
    top: 0.5rem;
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '10' : 'transparent'};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + '05'};
  }
`;

export const TabBadge = styled.span`
  background: ${({ theme }) => theme.colors.textMuted + '20'};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 900;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 42px;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 0.75rem 0 2.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  width: 14px;
  height: 14px;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '20' : theme.colors.surface};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ToolbarButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SelectedTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;

export const TagChip = styled.button<{ $active?: boolean }>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8125rem;
  font-weight: 700;
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? 'white' : theme.colors.textMuted)};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $active }) => ($active ? theme.colors.primaryDark : theme.colors.surfaceLight)};
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 2000;
`;
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  pointer-events: none;
  padding: 1rem;

  @media (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const BottomSheet = styled(motion.div)`
  pointer-events: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 2001;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    max-height: 70vh;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
  }
`;

export const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 12px auto;
  flex-shrink: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const SheetHeader = styled.div`
  padding: 0 1.5rem 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SheetBody = styled.div`
  padding: 0 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const TagItem = styled.button<{ $selected: boolean }>`
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $selected }) => $selected ? 'white' : theme.colors.text};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  white-space: nowrap;
  width: auto;
  height: auto;
  min-height: 0;
  min-width: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $selected }) => $selected ? theme.colors.primaryDark : theme.colors.surface};
  }
`;

export const IconButton = styled.button`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TagSearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.surface};
      outline: none;
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary + '10'};
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TagsAnimationWrapper = styled(motion.div)`
  overflow: hidden;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 3rem 0;
`;
