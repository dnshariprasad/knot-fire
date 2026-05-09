import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Input = styled.input`
  padding: 0.875rem 1.25rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    outline: none;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  width: 100%;
  padding: 0.875rem 1.5rem;
  border-radius: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  background: ${({ theme, $variant }) => $variant === 'outline' ? theme.colors.surfaceLight : theme.colors.primary};
  color: ${({ theme, $variant }) => $variant === 'outline' ? theme.colors.text : 'white'};
  border: ${({ theme, $variant }) => $variant === 'outline' ? `1px solid ${theme.colors.border}` : 'none'};
  cursor: pointer;

  &:hover {
    background: ${({ theme, $variant }) => $variant === 'outline' ? theme.colors.border + '22' : theme.colors.primaryDark};
    transform: translateY(-1px);
    ${({ $variant, theme }) => $variant !== 'outline' && `box-shadow: 0 4px 12px ${theme.colors.primary}44;`}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    padding: 0 0.75rem;
  }
`;

export const ToggleText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;
