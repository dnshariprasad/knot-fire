import React from 'react';
import { Plus } from 'lucide-react';
import * as S from './styles';

interface FABProps {
  onClick: () => void;
  'data-testid'?: string;
}

export const FAB: React.FC<FABProps> = ({ onClick, 'data-testid': testId }) => {
  return (
    <S.FABContainer
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label="Add new note"
      data-testid={testId}
    >
      <Plus size={24} />
    </S.FABContainer>
  );
};
