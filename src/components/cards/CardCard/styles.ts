import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardContainer = styled(motion.div)<{ $network: string }>`
  background: ${({ theme, $network }) => {
    switch ($network) {
      case 'visa': return 'linear-gradient(135deg, #1a237e 0%, #283593 100%)';
      case 'mastercard': return 'linear-gradient(135deg, #37474f 0%, #263238 100%)';
      case 'amex': return 'linear-gradient(135deg, #006064 0%, #00838f 100%)';
      default: return theme.colors.surface;
    }
  }};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const Chip = styled.div`
  width: 35px;
  height: 25px;
  background: linear-gradient(135deg, #ffd700 0%, #ffcc00 100%);
  border-radius: 4px;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border: 1px solid rgba(0,0,0,0.1);
  }
`;

export const CardNumber = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.125rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  filter: blur(4px); // Masked by default
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Label = styled.div`
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;

export const Value = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const BankName = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 0.75rem;
  font-weight: 800;
  opacity: 0.9;
  text-transform: uppercase;
`;

export const NetworkLogo = styled.div`
  font-size: 1.25rem;
  font-weight: 900;
  font-style: italic;
  opacity: 0.9;
`;

export const TypeBadge = styled.div<{ $type: 'credit' | 'debit' }>`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
`;

export const PrivateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  z-index: 10;
`;

export const PrivateBadge = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;
