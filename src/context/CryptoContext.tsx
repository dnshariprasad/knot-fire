import React, { createContext, useContext, useState } from 'react';
import { encrypt, decrypt } from '../utils/cryptoUtils';
import type { Note, Todo } from '../types';

interface CryptoContextType {
  masterKey: string | null;
  setKey: (key: string) => void;
  encryptNote: (note: Partial<Note>) => any;
  decryptNote: (note: any) => Note;
  encryptTodo: (todo: Partial<Todo>) => any;
  decryptTodo: (todo: any) => Todo;
  clearKey: () => void;
  isSkipped: boolean;
  setSkipped: (skipped: boolean) => void;
}

const CryptoContext = createContext<CryptoContextType | null>(null);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [masterKey, setMasterKey] = useState<string | null>(() => sessionStorage.getItem('master_key'));
  const [isSkipped, setIsSkipped] = useState(() => localStorage.getItem('encryption_skipped') === 'true');

  const setKey = (key: string) => {
    setMasterKey(key);
    sessionStorage.setItem('master_key', key);
    localStorage.removeItem('encryption_skipped');
    setIsSkipped(false);
  };

  const clearKey = () => {
    setMasterKey(null);
    sessionStorage.removeItem('master_key');
  };

  const setSkipped = (skipped: boolean) => {
    setIsSkipped(skipped);
    if (skipped) {
      localStorage.setItem('encryption_skipped', 'true');
    } else {
      localStorage.removeItem('encryption_skipped');
    }
  };

  const encryptNote = (note: Partial<Note>) => {
    if (!masterKey) {
      return { ...note, isEncrypted: false };
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
      return {
        ...note,
        title: '[Decryption Failed]',
        content: '[Decryption Failed]',
        tags: [],
        customFields: []
      } as any;
    }
  };

  const encryptTodo = (todo: Partial<Todo>) => {
    if (!masterKey) {
      return { ...todo, isEncrypted: false };
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
      return {
        ...todo,
        title: '[Decryption Failed]',
        items: [],
        tags: []
      } as any;
    }
  };

  return (
    <CryptoContext.Provider value={{ 
      masterKey, setKey, encryptNote, decryptNote, 
      encryptTodo, decryptTodo,
      clearKey, isSkipped, setSkipped 
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
