import React from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../Modal';
import { useTranslation } from 'react-i18next';

const ConfirmContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.error + '15'};
  color: ${({ theme }) => theme.colors.error};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 0.5rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'outline' }>`
  flex: 1;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;

  ${({ $variant, theme }) => {
    if ($variant === 'danger') return `
      background: ${theme.colors.error};
      color: white;
      &:hover { background: ${theme.colors.error}dd; }
    `;
    if ($variant === 'outline') return `
      background: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text};
      &:hover { background: ${theme.colors.surfaceLight}; }
    `;
    return '';
  }}
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="400px"
      showCloseButton={!isLoading}
    >
      <ConfirmContent>
        <IconWrapper>
          <AlertTriangle size={32} />
        </IconWrapper>
        <Message>{message}</Message>
        <Actions>
          <Button 
            $variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
          >
            {cancelText || t('common.cancel')}
          </Button>
          <Button 
            $variant="danger" 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : (confirmText || t('common.delete'))}
          </Button>
        </Actions>
      </ConfirmContent>
    </Modal>
  );
};
