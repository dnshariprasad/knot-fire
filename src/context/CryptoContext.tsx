import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Unlock, Shield, Key, ChevronRight } from 'lucide-react';
import { encrypt, decrypt } from '../utils/cryptoUtils';
import type { Note } from '../types';

interface CryptoContextType {
  masterKey: string | null;
  setKey: (key: string) => void;
  encryptNote: (note: Partial<Note>) => any;
  decryptNote: (note: any) => Note;
  clearKey: () => void;
  isSkipped: boolean;
  setSkipped: (skipped: boolean) => void;
}

const CryptoContext = createContext<CryptoContextType | null>(null);

const LockOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LockCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const LockTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const LockDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

const KeyInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.875rem 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.25rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const UnlockButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.875rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  background: #10b98115;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
`;

const ViewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LockScreen: React.FC<{ onSkip?: () => void }> = ({ onSkip }) => {
  const { setKey } = useCrypto();
  const [inputKey, setInputKey] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.length >= 4) {
      setKey(inputKey);
    }
  };

  return (
    <LockOverlay>
      <LockCard>
        <IconWrapper>
          <Shield size={32} />
        </IconWrapper>
        <ViewHeader>
          <LockTitle>Securing your Knot</LockTitle>
          <LockDesc>Your data is protected by AES-256 bit encryption. Enter your Master Key to continue.</LockDesc>
        </ViewHeader>
        
        <form onSubmit={handleUnlock} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <KeyInput 
            type="password" 
            placeholder="Enter Master Key" 
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            autoFocus
          />
          <UnlockButton type="submit">
            <Key size={18} /> Unlock Data
          </UnlockButton>
        </form>

        {onSkip && (
          <SkipButton onClick={onSkip}>
            Proceed without encryption <ChevronRight size={14} />
          </SkipButton>
        )}

        <SecurityBadge>
          <Unlock size={12} /> AES-256 Bit Encryption Active
        </SecurityBadge>
      </LockCard>
    </LockOverlay>
  );
};

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
      isEncrypted: true,
      isPrivate: note.isPrivate || false,
      pin: note.pin ? encrypt(note.pin, masterKey) : ''
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
        })) : [],
        isPrivate: note.isPrivate || false,
        pin: note.pin ? decrypt(note.pin, masterKey) : ''
      };
    } catch (e) {
      return {
        ...note,
        title: '[Decryption Failed]',
        content: '[Decryption Failed]',
        tags: [],
        customFields: []
      };
    }
  };

  return (
    <CryptoContext.Provider value={{ 
      masterKey, setKey, encryptNote, decryptNote, 
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
