import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const ToolbarContainer = styled.div<{ $viewMode?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  background: transparent;
  padding: 1.5rem 2rem 0.25rem 2rem;
  gap: 0.75rem;
  width: 100%;
  max-width: ${({ $viewMode }) => $viewMode === 'list' ? '800px' : '1200px'};
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem 1rem 0.25rem 1rem;
  }
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.625rem;
  height: 36px;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 0.875rem 0 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
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
  width: 16px;
  height: 16px;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '20' : theme.colors.surface};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
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
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
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
  font-size: 0.75rem;
  font-weight: 600;
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

export const BottomSheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 2001;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -8px 10px -6px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 12px auto;
  flex-shrink: 0;
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
