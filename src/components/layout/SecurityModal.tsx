import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ShieldAlert, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { useCrypto } from '../../context/CryptoContext';
import toast from 'react-hot-toast';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Body = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatusCard = styled.div<{ $active: boolean }>`
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '10' : theme.colors.surfaceLight};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatusIcon = styled.div<{ $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  span:first-child {
    font-weight: 700;
    font-size: 1rem;
  }
  
  span:last-child {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'outline' }>`
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;

  ${({ $variant, theme }) => {
    if ($variant === 'primary') return `
      background: ${theme.colors.primary};
      color: white;
      &:hover { background: ${theme.colors.primaryDark}; }
    `;
    if ($variant === 'danger') return `
      background: ${theme.colors.error + '15'};
      color: ${theme.colors.error};
      &:hover { background: ${theme.colors.error + '25'}; }
    `;
    return `
      background: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text};
      &:hover { background: ${theme.colors.surfaceLight}; }
    `;
  }}
`;

const IconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const WarningBox = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  gap: 0.75rem;
  color: #991b1b;
  font-size: 0.8125rem;
  line-height: 1.5;
`;

interface SecurityModalProps {
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ onClose }) => {
  const { masterKey, setKey, clearKey, setSkipped } = useCrypto();
  const [newKey, setNewKey] = useState('');
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnable = () => {
    if (newKey.length < 4) {
      toast.error('Master Key must be at least 4 characters');
      return;
    }
    setKey(newKey);
    toast.success('End-to-End Encryption Enabled');
    setIsEnabling(false);
    setNewKey('');
  };

  const handleDisable = () => {
    if (window.confirm('WARNING: Disabling encryption will make your encrypted notes unreadable until you re-enable it with the SAME key. Continue?')) {
      clearKey();
      setSkipped(true);
      toast.success('Encryption Disabled');
    }
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            <Title><Shield size={20} /> Security Settings</Title>
            <IconButton onClick={onClose}><X size={20} /></IconButton>
          </Header>

          <Body>
            <Section>
              <SectionTitle>Encryption Status</SectionTitle>
              <StatusCard $active={!!masterKey}>
                <StatusIcon $active={!!masterKey}>
                  {masterKey ? <Lock size={24} /> : <Unlock size={24} />}
                </StatusIcon>
                <StatusText>
                  <span>{masterKey ? 'AES-256 E2EE Active' : 'Encryption Disabled'}</span>
                  <span>{masterKey ? 'Your notes are protected locally.' : 'Your notes are currently not encrypted.'}</span>
                </StatusText>
                {masterKey && <CheckCircle2 size={20} color="#10b981" style={{ marginLeft: 'auto' }} />}
              </StatusCard>
            </Section>

            {masterKey ? (
              <Section>
                <WarningBox>
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <div>
                    If you disable encryption, your existing encrypted notes will be hidden until you provide the key again.
                  </div>
                </WarningBox>
                <Button $variant="danger" onClick={handleDisable}>
                  Disable Encryption
                </Button>
              </Section>
            ) : isEnabling ? (
              <Section>
                <SectionTitle>Set Master Key</SectionTitle>
                <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  This key will be used to encrypt all your future notes. **Do not lose it.**
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Input 
                    type="password" 
                    placeholder="New Master Key" 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    autoFocus
                  />
                  <Button $variant="primary" onClick={handleEnable}>Enable</Button>
                </div>
                <Button $variant="outline" onClick={() => setIsEnabling(false)}>Cancel</Button>
              </Section>
            ) : (
              <Button $variant="primary" onClick={() => setIsEnabling(true)}>
                Enable End-to-End Encryption
              </Button>
            )}

            <Section>
              <SectionTitle>What is E2EE?</SectionTitle>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                End-to-End Encryption ensures that your notes are "locked" on your device before being sent to our servers. Not even the app developers can read your notes.
              </p>
            </Section>
          </Body>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};
