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
import { useCrypto } from '../context/CryptoContext';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { encryptNote, decryptNote, masterKey, isSkipped } = useCrypto();

  useEffect(() => {
    // We only load notes if the user is logged in AND they have either entered a key OR skipped encryption
    if (!user || (!masterKey && !isSkipped)) {
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
        const data = doc.data();
        // If it's encrypted but we don't have a key, it will stay encrypted (and show blur/lock in UI)
        const decryptedNote = decryptNote({ id: doc.id, ...data });
        notesData.push(decryptedNote);
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
  }, [user, masterKey, isSkipped]);

  const addNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    const now = Date.now();
    const processedData = encryptNote(note);
    
    await addDoc(collection(db, 'notes'), {
      ...processedData,
      userId: user.uid,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateNote = async (id: string, note: Partial<Note>) => {
    if (!user) return;
    
    const noteRef = doc(db, 'notes', id);
    const processedData = encryptNote(note);
    
    await updateDoc(noteRef, {
      ...processedData,
      updatedAt: Date.now(),
    });
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  return { notes, loading, addNote, updateNote, deleteNote };
};
