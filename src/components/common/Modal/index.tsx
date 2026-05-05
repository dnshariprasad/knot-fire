import React, { type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as S from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  showCloseButton = true
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const variants = {
    initial: isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 },
    animate: isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 },
    exit: isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.ModalContainer
            $maxWidth={maxWidth}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.ModalHandle />
            <S.Header>
              <S.Title>{title}</S.Title>
              {showCloseButton && (
                <S.CloseButton onClick={onClose}>
                  <X size={20} />
                </S.CloseButton>
              )}
            </S.Header>
            <S.Body>
              {children}
            </S.Body>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
