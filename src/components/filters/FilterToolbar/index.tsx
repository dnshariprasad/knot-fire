import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface FilterToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
  viewMode: 'grid' | 'list';
  onViewModeToggle: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  toggleTag,
  allTags,
  viewMode,
  onViewModeToggle
}) => {
  const { t } = useTranslation();
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
    <S.ToolbarContainer $viewMode={viewMode}>
      <S.SearchRow>
        <S.ToolbarButton 
          onClick={onViewModeToggle}
          title={viewMode === 'grid' ? 'Switch to List' : 'Switch to Grid'}
        >
          {viewMode === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
        </S.ToolbarButton>

        <S.SearchWrapper>
          <S.SearchIcon size={18} />
          <S.SearchInput
            placeholder={t('app.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchWrapper>

        <S.FilterButton 
          $active={selectedTags.length > 0} 
          onClick={() => setIsSheetOpen(true)}
          title={t('app.filterByTags')}
        >
          <SlidersHorizontal size={18} />
        </S.FilterButton>
      </S.SearchRow>

      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <S.SelectedTagsRow>
              {selectedTags.map((tag) => (
                <S.TagChip key={tag} $active onClick={() => toggleTag(tag)}>
                  <X size={12} />
                  {tag}
                </S.TagChip>
              ))}
              <S.TagChip onClick={() => selectedTags.forEach(t => toggleTag(t))}>
                {t('common.clearAll')}
              </S.TagChip>
            </S.SelectedTagsRow>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSheetOpen && (
          <>
            <S.Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
            />
            <S.BottomSheet
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <S.SheetHandle />
              <S.SheetHeader>
                <h3>{t('app.exploreTags')}</h3>
                <S.IconButton onClick={() => {
                  setIsSheetOpen(false);
                  setTagSearch('');
                }}>
                  <X size={20} />
                </S.IconButton>
              </S.SheetHeader>
              <S.SheetBody>
                {allTags.length > 0 && (
                  <S.TagSearchInput>
                    <Search size={18} />
                    <input 
                      placeholder={t('app.findTagPlaceholder')} 
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      autoFocus
                    />
                  </S.TagSearchInput>
                )}
                
                {filteredTags.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 0' }}>
                    {allTags.length === 0 ? t('app.noTagsFound') : t('app.noTagsMatch')}
                  </p>
                ) : (
                  <S.TagGrid>
                    {filteredTags.map((tag, idx) => (
                      <S.TagItem
                        key={`${tag}-${idx}`}
                        $selected={selectedTags.includes(tag)}
                        onClick={() => toggleTag(tag)}
                      >
                        {selectedTags.includes(tag) ? <X size={14} /> : '#'}
                        {tag}
                      </S.TagItem>
                    ))}
                  </S.TagGrid>
                )}
              </S.SheetBody>
            </S.BottomSheet>
          </>
        )}
      </AnimatePresence>
    </S.ToolbarContainer>
  );
};
