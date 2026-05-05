import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FABContainer = styled(motion.button)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary + '40'};
  border: none;
  cursor: pointer;
  z-index: 1000;
  
  @media (max-width: 768px) {
    right: 1.5rem;
    bottom: 1.5rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary + '60'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;
