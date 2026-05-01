import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Note } from '../types';
import { useAuth } from '../context/AuthContext';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData: Note[] = [];
      snapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      // Sort manually so we don't need a Firestore index
      notesData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setNotes(notesData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    const now = Date.now();
    await addDoc(collection(db, 'notes'), {
      ...note,
      userId: user.uid,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateNote = async (id: string, note: Partial<Note>) => {
    const noteRef = doc(db, 'notes', id);
    await updateDoc(noteRef, {
      ...note,
      updatedAt: Date.now(),
    });
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  return { notes, loading, addNote, updateNote, deleteNote };
};
