import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Plus, Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useNotes } from './hooks/useNotes';
import { Login } from './components/auth/Login';
import { Header } from './components/layout/Header';
import { NoteCard } from './components/notes/NoteCard';
import { NoteModal } from './components/notes/NoteModal';
import type { Note } from './types';
import { FilterToolbar } from './components/filters/FilterToolbar';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';
import { useTheme } from './styles/ThemeContext';

const AppContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NotesGrid = styled.div`
  column-count: 3;
  column-gap: 1.5rem;
  width: 100%;

  @media (max-width: 1100px) {
    column-count: 2;
  }

  @media (max-width: 640px) {
    column-count: 1;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  gap: 1rem;
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 2rem;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
`;

function App() {
  const { user } = useAuth();
  const { notes, loading: notesLoading, addNote, updateNote, deleteNote } = useNotes();
  const { themeMode, toggleTheme, currentTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveNote = async (noteData: Partial<Note>) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await addNote(noteData as any);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
      note.customFields.forEach(field => {
        if (field.label.trim()) tags.add(field.label.trim());
      });
    });
    return Array.from(tags).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           note.customFields.some(f => f.value.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => note.tags.includes(tag) || note.customFields.some(f => f.label === tag));
      
      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  return (
    <>
      <GlobalStyles />
      {!user ? (
        <Login />
      ) : (
        <AppContainer>
          <Header 
            onAddNote={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
            onThemeToggle={toggleTheme}
            themeMode={themeMode}
          />

          <FilterToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={handleToggleTag}
          />
          
          <MainContent>
            {!notesLoading && filteredNotes.length === 0 && (
               <EmptyState>
                 <p>{searchQuery || selectedTags.length > 0 ? "No notes match your filters." : "Start by creating your first note!"}</p>
                 {!searchQuery && selectedTags.length === 0 && (
                   <AddButton onClick={() => setIsModalOpen(true)} style={{ marginTop: '1rem' }}>
                      <Plus size={18} /> New Note
                   </AddButton>
                 )}
               </EmptyState>
            )}

            {notesLoading ? (
              <EmptyState>
                <Loader2 size={32} className="animate-spin" color={currentTheme.colors.primary} />
                <p>Loading your notes...</p>
              </EmptyState>
            ) : (
              <NotesGrid>
                {filteredNotes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onDelete={deleteNote}
                    onToggleTag={handleToggleTag}
                    onClick={() => {
                      setEditingNote(note);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </NotesGrid>
            )}
          </MainContent>

          <Footer>
            &copy; {new Date().getFullYear()} Knot Notes. All rights reserved.
          </Footer>

          {isModalOpen && (
            <NoteModal 
              note={editingNote}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveNote}
              onDelete={(id) => {
                deleteNote(id);
                setIsModalOpen(false);
              }}
            />
          )}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: currentTheme.colors.surface,
                color: currentTheme.colors.text,
                border: `1px solid ${currentTheme.colors.border}`,
              },
            }}
          />
        </AppContainer>
      )}
    </>
  );
}

export default App;
