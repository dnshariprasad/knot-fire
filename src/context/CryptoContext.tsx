import React, { createContext, useContext, useState } from 'react';
import { encrypt, decrypt } from '../utils/cryptoUtils';
import type { Note, Todo, Card } from '../types';
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
  encryptCard: (card: Partial<Card>) => any;
  decryptCard: (card: any) => Card;
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
    // If explicitly marked as unencrypted, return as-is (plain text)
    if (note.isEncrypted === false) {
      return { ...note, isEncrypted: false };
    }

    // If no master key exists, we cannot encrypt, so return as-is but keep isEncrypted false
    if (!masterKey) {
      return { ...note, isEncrypted: false };
    }
    
    // Otherwise, encrypt all user data fields
    return {
      ...note,
      title: note.title ? encrypt(note.title, masterKey) : '',
      content: note.content ? encrypt(note.content, masterKey) : '',
      tags: note.tags || [], // Tags are never secured
      customFields: note.customFields ? note.customFields.map(f => ({
        label: encrypt(f.label, masterKey),
        value: encrypt(f.value, masterKey)
      })) : [],
      isEncrypted: true
    };
  };

  const decryptNote = (note: any): Note => {
    // If not encrypted in DB, return as is
    if (!note.isEncrypted) return note as Note;
    
    // If encrypted but no master key, return as is (UI will mask it)
    if (!masterKey) return note as Note;

    try {
      const safeDecrypt = (val: string) => {
        if (!val) return '';
        if (val.startsWith('U2F')) {
          try { return decrypt(val, masterKey); } catch (e) { return val; }
        }
        return val;
      };

      return {
        ...note,
        title: decrypt(note.title, masterKey),
        content: decrypt(note.content, masterKey),
        tags: note.tags ? note.tags.map((t: string) => safeDecrypt(t)) : [],
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
    if (todo.isEncrypted === false || !masterKey) {
      return { ...todo, isEncrypted: false };
    }
    
    return {
      ...todo,
      title: todo.title ? encrypt(todo.title, masterKey) : '',
      items: todo.items ? todo.items.map(item => ({
        ...item,
        text: encrypt(item.text, masterKey)
      })) : [],
      tags: todo.tags || [], // Tags are never secured
      isEncrypted: true
    };
  };

  const decryptTodo = (todo: any): Todo => {
    if (!masterKey || !todo.isEncrypted) return todo as Todo;

    try {
      const safeDecrypt = (val: string) => {
        if (!val) return '';
        if (val.startsWith('U2F')) {
          try { return decrypt(val, masterKey); } catch (e) { return val; }
        }
        return val;
      };

      return {
        ...todo,
        title: decrypt(todo.title, masterKey),
        items: todo.items ? todo.items.map((item: any) => ({
          ...item,
          text: decrypt(item.text, masterKey)
        })) : [],
        tags: todo.tags ? todo.tags.map((t: string) => safeDecrypt(t)) : []
      };
    } catch (e) {
      console.error("Decryption failed", e);
      return todo as Todo;
    }
  };

  const encryptCard = (card: Partial<Card>) => {
    if (!masterKey) return card;
    
    return {
      ...card,
      cardNumber: card.cardNumber ? encrypt(card.cardNumber, masterKey) : '',
      expiryDate: card.expiryDate ? encrypt(card.expiryDate, masterKey) : '',
      cvv: card.cvv ? encrypt(card.cvv, masterKey) : '',
      pin: card.pin ? encrypt(card.pin, masterKey) : '',
      isEncrypted: true
    };
  };

  const decryptCard = (card: any): Card => {
    if (!masterKey || !card.isEncrypted) return card as Card;

    try {
      // Gracefully decrypt fields. If they are already plain text, decrypt() should handle it or return as is
      // But usually our decrypt() might throw if it's not a valid AES string.
      // So we wrap each one or check if it looks encrypted.
      const safeDecrypt = (val: string) => {
        if (!val) return '';
        // If it looks like AES encrypted string (starts with U2F...)
        if (val.startsWith('U2F')) {
          try { return decrypt(val, masterKey); } catch (e) { return val; }
        }
        return val;
      };

      return {
        ...card,
        name: safeDecrypt(card.name),
        cardholderName: safeDecrypt(card.cardholderName),
        bankName: safeDecrypt(card.bankName),
        cardNumber: decrypt(card.cardNumber, masterKey),
        expiryDate: decrypt(card.expiryDate, masterKey),
        cvv: decrypt(card.cvv, masterKey),
        pin: card.pin ? decrypt(card.pin, masterKey) : '',
        benefits: card.benefits ? card.benefits.map((b: string) => safeDecrypt(b)) : [],
        tags: card.tags ? card.tags.map((t: string) => safeDecrypt(t)) : []
      };
    } catch (e) {
      console.error("Card decryption failed", e);
      return card as Card;
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
      encryptCard, decryptCard,
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
