import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  or
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Todo } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCrypto } from '../context/CryptoContext';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { encryptTodo, decryptTodo, masterKey } = useCrypto();

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'todos'),
      or(
        where('userId', '==', user.uid),
        where('sharedWithUids', 'array-contains', user.uid)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData: Todo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const decryptedTodo = decryptTodo({ id: doc.id, ...data } as any);
        todosData.push(decryptedTodo);
      });
      todosData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setTodos(todosData);
      setLoading(false);
    }, (error) => {
      console.error("[useTodos] Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, masterKey]);

  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    const now = Date.now();
    const processedData = encryptTodo(todo);
    
    await addDoc(collection(db, 'todos'), {
      ...processedData,
      userId: user.uid,
      ownerEmail: user.email,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateTodo = async (id: string, todo: Partial<Todo>) => {
    if (!user) return;
    
    const todoRef = doc(db, 'todos', id);
    const processedData = encryptTodo(todo);
    
    await updateDoc(todoRef, {
      ...processedData,
      updatedAt: Date.now(),
    });
  };

  const shareTodo = async (id: string, sharedWith: Todo['sharedWith']) => {
    if (!user) return;
    
    const todoRef = doc(db, 'todos', id);
    const sharedWithUids = sharedWith?.map(u => u.userId) || [];
    
    await updateDoc(todoRef, {
      sharedWith,
      sharedWithUids,
      updatedAt: Date.now(),
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return { todos, loading, addTodo, updateTodo, deleteTodo, shareTodo };
};
