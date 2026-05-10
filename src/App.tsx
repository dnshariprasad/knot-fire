import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/AuthContext';
import { useNotes } from './hooks/useNotes';
import { Login } from './components/auth/Login';
import { Header } from './components/layout/Header';
import { NoteCard } from './components/notes/NoteCard';
import { NoteModal } from './components/notes/NoteModal';
import { TodoCard } from './components/todos/TodoCard';
import { TodoModal } from './components/todos/TodoModal';
import { CardCard } from './components/cards/CardCard';
import { CardModal } from './components/cards/CardModal';
import { NoteSkeleton } from './components/notes/NoteSkeleton';
import type { Note, Todo, Card } from './types';
import { FilterToolbar } from './components/filters/FilterToolbar';
import { useTodos } from './hooks/useTodos';
import { useCards } from './hooks/useCards';
import { Toaster, toast } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';
import { useTheme } from './styles/ThemeContext';
import { FAB } from './components/layout/FAB';
import { Navigation } from './components/layout/Navigation';
import { Sidebar } from './components/layout/Sidebar';

const ShareModal = lazy(() => import('./components/notes/ShareModal').then(m => ({ default: m.ShareModal })));
const SettingsModal = lazy(() => import('./components/layout/SettingsModal').then(m => ({ default: m.SettingsModal })));

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  padding: 1.5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 8rem;
  }
`;

const ContentGrid = styled.div<{ $viewMode: 'grid' | 'list' }>`
  column-count: ${({ $viewMode }) => $viewMode === 'grid' ? '3' : '1'};
  column-gap: 0.5rem;
  max-width: ${({ $viewMode }) => $viewMode === 'list' ? '900px' : 'none'};
  margin: ${({ $viewMode }) => $viewMode === 'list' ? '0 auto' : '0'};
  width: 100%;
  
  @media (max-width: 1200px) {
    column-count: ${({ $viewMode }) => $viewMode === 'grid' ? '2' : '1'};
  }

  @media (max-width: 768px) {
    column-count: ${({ $viewMode }) => $viewMode === 'grid' ? '2' : '1'};
    column-gap: 0.5rem;
  }

  & > * {
    break-inside: avoid;
    margin-bottom: 0.1rem;
    display: inline-block;
    width: 100%;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  text-align: center;
  width: 100%;
`;

const EmptyIcon = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.3;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 300px;
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    display: none; // Hidden on mobile due to bottom nav
  }
`;

const CreateButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border: none;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}33;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}44;
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Mobile only styles
// Removed unused DesktopOnly and MobileOnly to fix TS errors

function App() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { notes, loading: notesLoading, addNote, updateNote, deleteNote, shareNote } = useNotes();
  const { todos, loading: todosLoading, addTodo, updateTodo, deleteTodo, shareTodo } = useTodos();
  const { cards, loading: cardsLoading, addCard, updateCard, deleteCard, shareCard } = useCards();
  const { themeMode, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('knot_view_mode') as 'grid' | 'list') || 'grid';
  });
  const [activeTab, setActiveTab] = useState<'notes' | 'todos' | 'cards'>('notes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return localStorage.getItem('knot_sidebar_open') !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('knot_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('knot_sidebar_open', String(isSidebarOpen));
  }, [isSidebarOpen]);

  const noteTags = useMemo(() => {
    return Array.from(new Set(notes.flatMap(n => n.tags))).sort();
  }, [notes]);

  const todoTags = useMemo(() => {
    return Array.from(new Set(todos.flatMap(t => t.tags))).sort();
  }, [todos]);

  const cardTags = useMemo(() => {
    return Array.from(new Set(cards.flatMap(c => c.tags))).sort();
  }, [cards]);

  const allTags = useMemo(() => {
    return Array.from(new Set([...noteTags, ...todoTags, ...cardTags])).sort();
  }, [noteTags, todoTags, cardTags]);

  const stats = useMemo(() => {
    return {
      notes: notes.length,
      todos: todos.length,
      cards: cards.length,
      active: activeTab === 'notes' ? notes.length : (activeTab === 'todos' ? todos.length : cards.length)
    };
  }, [notes, todos, cards, activeTab]);

  const filteredNotes = useMemo(() => {
    return notes.filter(noteItem => {
      const matchesSearch = noteItem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           noteItem.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           noteItem.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           noteItem.customFields.some(f => f.value.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(t => noteItem.tags.includes(t) || noteItem.customFields.some(f => f.label === t));
      
      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todoItem => {
      const matchesSearch = todoItem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           todoItem.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(t => todoItem.tags.includes(t));
      
      return matchesSearch && matchesTags;
    });
  }, [todos, searchQuery, selectedTags]);

  const filteredCards = useMemo(() => {
    return cards.filter(cardItem => {
      const matchesSearch = cardItem.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cardItem.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cardItem.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(t => cardItem.tags.includes(t));
      
      return matchesSearch && matchesTags;
    });
  }, [cards, searchQuery, selectedTags]);

  const handleCreateNew = () => {
    if (activeTab === 'notes') {
      setEditingNote(null);
    } else if (activeTab === 'todos') {
      setEditingTodo(null);
    } else {
      setEditingCard(null);
    }
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (noteData: Partial<Note>) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
    } else {
      await addNote(noteData as Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>);
    }
    setIsModalOpen(false);
  };

  const handleSaveTodo = async (todoData: Partial<Todo>) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, todoData);
    } else {
      await addTodo(todoData as Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'userId'>);
    }
    setIsModalOpen(false);
  };

  if (!user) return <Login />;
  const handleSaveCard = async (cardData: Partial<Card>) => {
    try {
      if (editingCard) {
        await updateCard(editingCard.id, cardData);
        toast.success('Card updated successfully');
      } else {
        await addCard(cardData as Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'userId'>);
        toast.success('Card added successfully');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error('Failed to save card: ' + error.message);
    }
  };

  const isLoading = activeTab === 'notes' ? notesLoading : (activeTab === 'todos' ? todosLoading : cardsLoading);
  const currentData = activeTab === 'notes' ? filteredNotes : (activeTab === 'todos' ? filteredTodos : filteredCards);
  const isEmpty = !isLoading && currentData.length === 0;

  return (
    <AppLayout>
      <GlobalStyles />
      <Toaster position="bottom-center" />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        stats={stats}
        data-testid="sidebar"
      />

      <ContentWrapper>
        <Header 
          onThemeToggle={toggleTheme}
          onSettingsClick={() => setIsSettingsOpen(true)}
          themeMode={themeMode}
          viewMode={viewMode}
          data-testid="header"
        />
        
        <Main>
          <FilterToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={(tag) => {
              setSelectedTags(prev => 
                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
              );
            }}
            viewMode={viewMode}
            onViewModeToggle={() => {
              setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
            }}
            activeTab={activeTab}
            data-testid="filter-toolbar"
          />

          {isLoading ? (
            <ContentGrid $viewMode={viewMode}>
              {[...Array(6)].map((_, i) => <NoteSkeleton key={i} />)}
            </ContentGrid>
          ) : isEmpty ? (
            <EmptyState data-testid="empty-state">
              <EmptyIcon>
                <Plus size={48} />
              </EmptyIcon>
              <EmptyTitle>
                {activeTab === 'notes' ? t('app.emptyState') : activeTab === 'todos' ? t('app.emptyStateTodos') : t('cards.emptyState')}
              </EmptyTitle>
              <EmptyText>
                {activeTab === 'notes' ? t('app.noMatch') : activeTab === 'todos' ? t('app.noMatchTodos') : t('cards.searchPlaceholder')}
              </EmptyText>
              <CreateButton onClick={handleCreateNew} data-testid="create-button-empty">
                <Plus size={18} /> {activeTab === 'notes' ? t('app.newNote') : activeTab === 'todos' ? t('app.newTodo') : t('app.newCard')}
              </CreateButton>
            </EmptyState>
          ) : (
            <ContentGrid $viewMode={viewMode}>
              {activeTab === 'notes' ? (
                filteredNotes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onClick={() => handleEditNote(note)}
                    onToggleTag={(tag) => {
                      setSelectedTags(prev => 
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }}
                    onShare={() => {
                      setEditingTodo(null);
                      setEditingNote(note);
                      setIsShareModalOpen(true);
                    }}
                    data-testid={`note-card-${note.id}`}
                  />
                ))
              ) : activeTab === 'todos' ? (
                filteredTodos.map(todo => (
                  <TodoCard 
                    key={todo.id} 
                    todo={todo} 
                    onClick={() => handleEditTodo(todo)}
                    onToggleTag={(tag) => {
                      setSelectedTags(prev => 
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }}
                    onShare={() => {
                      setEditingNote(null);
                      setEditingTodo(todo);
                      setIsShareModalOpen(true);
                    }}
                    data-testid={`todo-card-${todo.id}`}
                  />
                ))
              ) : (
                filteredCards.map(card => (
                  <CardCard 
                    key={card.id} 
                    card={card} 
                    onClick={() => {
                      setEditingCard(card);
                      setIsModalOpen(true);
                    }}
                  />
                ))
              )}
            </ContentGrid>
          )}
        </Main>

        <Footer>
          &copy; {new Date().getFullYear()} {t('app.title')}. {t('common.allRightsReserved')}
        </Footer>
      </ContentWrapper>

      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data-testid="bottom-nav"
      />

      <FAB onClick={handleCreateNew} data-testid="fab-create" />

      {isModalOpen && activeTab === 'notes' && (
        <NoteModal 
          note={editingNote} 
          allTags={noteTags}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          onDelete={(id) => { deleteNote(id); setIsModalOpen(false); }}
          onShare={(sharedWith) => editingNote && shareNote(editingNote.id, sharedWith)}
        />
      )}
      {activeTab === 'todos' && isModalOpen && (
        <TodoModal 
          todo={editingTodo} 
          allTags={todoTags}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTodo}
          onDelete={(id) => { deleteTodo(id); setIsModalOpen(false); }}
          onShare={(sharedWith) => editingTodo && shareTodo(editingTodo.id, sharedWith)}
        />
      )}
      {activeTab === 'cards' && isModalOpen && (
        <CardModal 
          card={editingCard} 
          allTags={cardTags}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCard}
          onDelete={(id) => { deleteCard(id); setIsModalOpen(false); }}
          onShare={(sharedWith) => editingCard && shareCard(editingCard.id, sharedWith)}
        />
      )}

      <Suspense fallback={null}>
        {isSettingsOpen && (
          <SettingsModal 
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
        {isShareModalOpen && (editingNote || editingTodo) && (
          <ShareModal 
            item={(editingNote || editingTodo)!}
            onClose={() => setIsShareModalOpen(false)}
            onShare={(sharedWith) => {
              if (editingNote) shareNote(editingNote.id, sharedWith);
              else if (editingTodo) shareTodo(editingTodo.id, sharedWith);
            }}
          />
        )}
      </Suspense>
    </AppLayout>
  );
}

export default App;
