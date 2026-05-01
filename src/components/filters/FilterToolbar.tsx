import React from 'react';
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

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
`;

const ModalPanel = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
`;

const TagItem = styled.button<{ $selected: boolean }>`
  padding: 0.625rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.surface};
  border: 1px solid ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $selected }) => $selected ? 'white' : theme.colors.text};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $selected }) => $selected ? theme.colors.primaryDark : theme.colors.surfaceLight};
  }
`;

const IconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
            onClick={() => setIsModalOpen(true)}
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
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalPanel
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <h3>Filter by Tags</h3>
                <IconButton onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </IconButton>
              </ModalHeader>
              <ModalBody>
                {allTags.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>
                    No tags found. Add tags to your notes to filter them.
                  </p>
                ) : (
                  <TagGrid>
                    {Array.from(new Set(allTags)).sort().map((tag, idx) => (
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
              </ModalBody>
            </ModalPanel>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ToolbarContainer>
  );
};
