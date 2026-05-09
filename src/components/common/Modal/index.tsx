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
  progress?: number;
  footer?: ReactNode;
  'data-testid'?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  showCloseButton = true,
  progress,
  footer,
  'data-testid': testId
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
          data-testid={testId}
        >
          <S.ModalContainer
            $maxWidth={maxWidth}
            data-testid={testId ? `${testId}-content` : undefined}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof progress === 'number' && (
              <S.TopProgressBar>
                <S.TopProgressFill $width={progress} />
              </S.TopProgressBar>
            )}
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
            {footer && (
              <S.Footer>
                {footer}
              </S.Footer>
            )}
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
