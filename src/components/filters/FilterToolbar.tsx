import React from 'react';
import styled from 'styled-components';
import { Search, Hash } from 'lucide-react';

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.75rem 1.5rem;
  gap: 0.75rem;
  position: sticky;
  top: 64px;
  z-index: 900;

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
  }
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  
  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagChip = styled.button<{ $active?: boolean }>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? 'white' : theme.colors.textMuted)};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $active }) => ($active ? theme.colors.primaryDark : theme.colors.surfaceLight)};
  }
`;

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  tags,
  selectedTags,
  onToggleTag,
  onClearTags,
}) => {
  return (
    <ToolbarContainer>
      <SearchRow>
        <SearchWrapper>
          <SearchIcon size={16} />
          <SearchInput 
            placeholder="Search notes, links, location..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchWrapper>
      </SearchRow>

      <TagRow>
        <TagChip 
          $active={selectedTags.length === 0} 
          onClick={onClearTags}
        >
          All
        </TagChip>
        {tags.map(tag => (
          <TagChip 
            key={tag} 
            $active={selectedTags.includes(tag)}
            onClick={() => onToggleTag(tag)}
          >
            <Hash size={12} /> {tag}
          </TagChip>
        ))}
      </TagRow>
    </ToolbarContainer>
  );
};
