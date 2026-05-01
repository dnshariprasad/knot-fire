import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  padding: 1.5rem 2rem 0.5rem 2rem;
  gap: 0.75rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  padding: 0.625rem 3rem 0.625rem 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '20' : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textMuted};
  padding: 0.375rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SelectedTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;

const TagChip = styled.button<{ $active?: boolean }>`
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 2000;
`;

const BottomSheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
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

const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 12px auto;
  flex-shrink: 0;
`;

const SheetHeader = styled.div`
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

const SheetBody = styled.div`
  padding: 0 1.5rem 2rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
`;

const TagItem = styled.button<{ $selected: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $selected }) => $selected ? 'white' : theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $selected }) => $selected ? theme.colors.primaryDark : theme.colors.surface};
  }
`;

const IconButton = styled.button`
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

const TagSearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceLight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
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

interface FilterToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  toggleTag,
  allTags,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState('');

  const filteredTags = useMemo(() => {
    const uniqueTags = Array.from(new Set(allTags));
    if (!tagSearch.trim()) return uniqueTags.sort();
    return uniqueTags
      .filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))
      .sort();
  }, [allTags, tagSearch]);

  return (
    <ToolbarContainer>
      <SearchRow>
        <SearchWrapper>
          <SearchIcon size={18} />
          <SearchInput
            placeholder="Search notes, links, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterButton 
            $active={selectedTags.length > 0} 
            onClick={() => setIsSheetOpen(true)}
            title="Filter by tags"
          >
            <SlidersHorizontal size={18} />
          </FilterButton>
        </SearchWrapper>
      </SearchRow>

      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <SelectedTagsRow>
              {selectedTags.map((tag) => (
                <TagChip key={tag} $active onClick={() => toggleTag(tag)}>
                  <X size={12} />
                  {tag}
                </TagChip>
              ))}
              <TagChip onClick={() => selectedTags.forEach(t => toggleTag(t))}>
                Clear All
              </TagChip>
            </SelectedTagsRow>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSheetOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
            />
            <BottomSheet
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SheetHandle />
              <SheetHeader>
                <h3>Explore Tags</h3>
                <IconButton onClick={() => {
                  setIsSheetOpen(false);
                  setTagSearch('');
                }}>
                  <X size={20} />
                </IconButton>
              </SheetHeader>
              <SheetBody>
                {allTags.length > 0 && (
                  <TagSearchInput>
                    <Search size={18} />
                    <input 
                      placeholder="Find a tag..." 
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      autoFocus
                    />
                  </TagSearchInput>
                )}
                
                {filteredTags.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 0' }}>
                    {allTags.length === 0 ? "No tags found. Add tags to your notes to filter them." : "No tags match your search."}
                  </p>
                ) : (
                  <TagGrid>
                    {filteredTags.map((tag, idx) => (
                      <TagItem
                        key={`${tag}-${idx}`}
                        $selected={selectedTags.includes(tag)}
                        onClick={() => toggleTag(tag)}
                      >
                        {selectedTags.includes(tag) ? <X size={14} /> : '#'}
                        {tag}
                      </TagItem>
                    ))}
                  </TagGrid>
                )}
              </SheetBody>
            </BottomSheet>
          </>
        )}
      </AnimatePresence>
    </ToolbarContainer>
  );
};
