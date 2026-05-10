import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;

  @media (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 24px 24px 0 0;
    max-height: 95vh;
  }
`;

export const Header = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Body = styled.div`
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 0.875rem 1.25rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}15;
  }
`;

export const Select = styled.select`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 0.875rem 1.25rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  padding-right: 3rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}15;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 180px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 3000;
  animation: slideUpAndFade 0.2s ease-out;

  @keyframes slideUpAndFade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DropdownItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.danger {
    color: ${({ theme }) => theme.colors.error};
    &:hover {
      background: ${({ theme }) => theme.colors.error}15;
    }
  }
`;

export const FixedActionButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant, theme }) => $variant === 'outline' ? css`
    background: transparent;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text};
    &:hover { background: ${theme.colors.surfaceLight}; border-color: ${theme.colors.primary}; }
  ` : css`
    background: ${theme.colors.primary};
    border: none;
    color: white;
  `}
`;

export const Footer = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          border: none;
          &:hover { filter: brightness(1.1); transform: translateY(-1px); }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error}15;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}33;
          &:hover { background: ${theme.colors.error}; color: white; }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textMuted};
          border: 1px solid ${theme.colors.border};
          &:hover { background: ${theme.colors.surfaceLight}; color: ${theme.colors.text}; }
        `;
      default:
        return `
          background: ${theme.colors.surfaceLight};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const PreviewCard = styled.div<{ $network: string }>`
  background: ${({ $network }) => {
    switch ($network) {
      case 'visa': return 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
      case 'mastercard': return 'linear-gradient(135deg, #1e293b 0%, #475569 100%)';
      case 'amex': return 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)';
      case 'discover': return 'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)';
      case 'rupay': return 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'; // Darker premium look for RuPay
      default: return 'linear-gradient(135deg, #334155 0%, #64748b 100%)';
    }
  }};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
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
  width: 45px;
  height: 32px;
  background: linear-gradient(135deg, #ffd700 0%, #ffcc00 100%);
  border-radius: 6px;
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
  font-size: 1.5rem;
  letter-spacing: 3px;
  margin: 1rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Value = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const BankName = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.875rem;
  font-weight: 800;
  opacity: 0.9;
  text-transform: uppercase;
`;

export const NetworkLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  font-style: italic;
  opacity: 0.9;
`;

export const TypeBadge = styled.div<{ $type: string }>`
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.875rem;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
`;

export const ViewValue = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 0.875rem 1.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const CreditFields = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
