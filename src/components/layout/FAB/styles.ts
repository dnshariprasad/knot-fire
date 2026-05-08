import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FABContainer = styled(motion.button)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px ${({ theme }) => theme.colors.primary + '60'};
  border: none;
  cursor: pointer;
  z-index: 1000;
  
  @media (max-width: 768px) {
    right: 1.5rem;
    bottom: 1.5rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 25px -5px ${({ theme }) => theme.colors.primary + '80'};
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
`;
