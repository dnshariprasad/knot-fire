import React from 'react';
import { useTranslation } from 'react-i18next';
import { StickyNote, CheckSquare } from 'lucide-react';
import * as S from './styles';

interface NavigationProps {
  activeTab: 'notes' | 'todos';
  setActiveTab: (tab: 'notes' | 'todos') => void;
  'data-testid'?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, 'data-testid': testId }) => {
  const { t } = useTranslation();

  return (
    <S.BottomBar data-testid={testId}>
      <S.BottomTab 
        $active={activeTab === 'notes'} 
        onClick={() => setActiveTab('notes')}
      >
        <StickyNote size={20} />
        <span>{t('app.notes')}</span>
      </S.BottomTab>
      <S.BottomTab 
        $active={activeTab === 'todos'} 
        onClick={() => setActiveTab('todos')}
      >
        <CheckSquare size={20} />
        <span>{t('app.todos')}</span>
      </S.BottomTab>
    </S.BottomBar>
  );
};
