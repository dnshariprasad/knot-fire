import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
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

  @media (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const ModalContainer = styled(motion.div)<{ $maxWidth?: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '500px'};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
  }
`;

export const ModalHandle = styled.div`
  display: none;
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Body = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 85vh;
  }
`;

export const CloseButton = styled.button`
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
