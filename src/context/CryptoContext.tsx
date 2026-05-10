import React, { createContext, useContext, useState } from 'react';
import { encrypt, decrypt } from '../utils/cryptoUtils';
import type { Note, Todo } from '../types';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface CryptoContextType {
  masterKey: string | null;
  setKey: (key: string) => void;
  encryptNote: (note: Partial<Note>) => any;
  decryptNote: (note: any) => Note;
  encryptTodo: (todo: Partial<Todo>) => any;
  decryptTodo: (todo: any) => Todo;
  clearKey: () => void;
  generateRecoveryKey: () => string;
  saveRecoveryData: (recoveryKey: string, userId: string) => Promise<void>;
  recoverMasterKey: (recoveryKey: string, userId: string) => Promise<string | null>;
}

const CryptoContext = createContext<CryptoContextType | null>(null);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [masterKey, setMasterKey] = useState<string | null>(() => sessionStorage.getItem('master_key'));

  const setKey = (key: string) => {
    setMasterKey(key);
    sessionStorage.setItem('master_key', key);
  };

  const clearKey = () => {
    setMasterKey(null);
    sessionStorage.removeItem('master_key');
  };

  const encryptNote = (note: Partial<Note>) => {
    if (!note.isEncrypted || !masterKey) {
      return { ...note, isEncrypted: !!note.isEncrypted && !!masterKey };
    }
    
    return {
      ...note,
      title: note.title ? encrypt(note.title, masterKey) : '',
      content: note.content ? encrypt(note.content, masterKey) : '',
      tags: note.tags ? note.tags.map(t => encrypt(t, masterKey)) : [],
      customFields: note.customFields ? note.customFields.map(f => ({
        label: encrypt(f.label, masterKey),
        value: encrypt(f.value, masterKey)
      })) : [],
      isEncrypted: true
    };
  };

  const decryptNote = (note: any): Note => {
    if (!masterKey || !note.isEncrypted) return note as Note;

    try {
      return {
        ...note,
        title: decrypt(note.title, masterKey),
        content: decrypt(note.content, masterKey),
        tags: note.tags ? note.tags.map((t: string) => decrypt(t, masterKey)) : [],
        customFields: note.customFields ? note.customFields.map((f: any) => ({
          label: decrypt(f.label, masterKey),
          value: decrypt(f.value, masterKey)
        })) : []
      };
    } catch (e) {
      console.error("Decryption failed", e);
      return note as Note; 
    }
  };

  const encryptTodo = (todo: Partial<Todo>) => {
    if (!todo.isEncrypted || !masterKey) {
      return { ...todo, isEncrypted: !!todo.isEncrypted && !!masterKey };
    }
    
    return {
      ...todo,
      title: todo.title ? encrypt(todo.title, masterKey) : '',
      items: todo.items ? todo.items.map(item => ({
        ...item,
        text: encrypt(item.text, masterKey)
      })) : [],
      tags: todo.tags ? todo.tags.map(t => encrypt(t, masterKey)) : [],
      isEncrypted: true
    };
  };

  const decryptTodo = (todo: any): Todo => {
    if (!masterKey || !todo.isEncrypted) return todo as Todo;

    try {
      return {
        ...todo,
        title: decrypt(todo.title, masterKey),
        items: todo.items ? todo.items.map((item: any) => ({
          ...item,
          text: decrypt(item.text, masterKey)
        })) : [],
        tags: todo.tags ? todo.tags.map((t: string) => decrypt(t, masterKey)) : []
      };
    } catch (e) {
      console.error("Decryption failed", e);
      return todo as Todo;
    }
  };

  const generateRecoveryKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) result += '-';
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const saveRecoveryData = async (recoveryKey: string, userId: string) => {
    if (!masterKey) return;
    
    try {
      const encryptedMasterKey = encrypt(masterKey, recoveryKey);
      await setDoc(doc(db, 'user_security', userId), {
        encryptedMasterKey,
        updatedAt: Date.now()
      });
      toast.success('Recovery data saved successfully');
    } catch (e) {
      console.error("Failed to save recovery data", e);
      toast.error('Failed to save recovery data');
    }
  };

  const recoverMasterKey = async (recoveryKey: string, userId: string) => {
    try {
      const docRef = doc(db, 'user_security', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const { encryptedMasterKey } = docSnap.data();
        const recoveredKey = decrypt(encryptedMasterKey, recoveryKey);
        if (recoveredKey) {
          setKey(recoveredKey);
          return recoveredKey;
        }
      }
    } catch (e) {
      console.error("Recovery failed", e);
    }
    return null;
  };

  return (
    <CryptoContext.Provider value={{ 
      masterKey, setKey, encryptNote, decryptNote, 
      encryptTodo, decryptTodo,
      clearKey,
      generateRecoveryKey,
      saveRecoveryData,
      recoverMasterKey
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) throw new Error('useCrypto must be used within a CryptoProvider');
  return context;
};
