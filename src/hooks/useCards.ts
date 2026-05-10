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
import type { Card } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCrypto } from '../context/CryptoContext';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { encryptCard, decryptCard, masterKey } = useCrypto();

  useEffect(() => {
    if (!user) {
      setCards([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'cards'),
      or(
        where('userId', '==', user.uid),
        where('sharedWithUids', 'array-contains', user.uid)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cardsData: Card[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const decryptedCard = decryptCard({ id: doc.id, ...data } as any);
        cardsData.push(decryptedCard);
      });
      cardsData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setCards(cardsData);
      setLoading(false);
    }, (error) => {
      console.error("[useCards] Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, masterKey]);

  const addCard = async (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    try {
      const now = Date.now();
      const processedData = encryptCard({ ...card, isEncrypted: true });
      
      await addDoc(collection(db, 'cards'), {
        ...processedData,
        userId: user.uid,
        ownerEmail: user.email,
        sharedWithUids: [],
        sharedWith: [],
        createdAt: now,
        updatedAt: now,
      });
    } catch (error: any) {
      console.error("[useCards] Add Error:", error);
      throw error;
    }
  };

  const updateCard = async (id: string, card: Partial<Card>) => {
    if (!user) return;
    
    try {
      const cardRef = doc(db, 'cards', id);
      const processedData = encryptCard(card);
      
      await updateDoc(cardRef, {
        ...processedData,
        updatedAt: Date.now(),
      });
    } catch (error: any) {
      console.error("[useCards] Update Error:", error);
      throw error;
    }
  };

  const shareCard = async (id: string, sharedWith: Card['sharedWith']) => {
    if (!user) return;
    
    try {
      const cardRef = doc(db, 'cards', id);
      const sharedWithUids = sharedWith?.map(u => u.userId) || [];
      
      await updateDoc(cardRef, {
        sharedWith,
        sharedWithUids,
        updatedAt: Date.now(),
      });
    } catch (error: any) {
      console.error("[useCards] Share Error:", error);
      throw error;
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'cards', id));
    } catch (error: any) {
      console.error("[useCards] Delete Error:", error);
      throw error;
    }
  };

  return { cards, loading, addCard, updateCard, deleteCard, shareCard };
};
