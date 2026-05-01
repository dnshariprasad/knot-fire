import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LogOut, User as UserIcon, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  position: relative;
`;

const Trigger = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  z-index: 1001;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
`;

const UserEmail = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  word-break: break-all;
`;

const MenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  color: ${({ theme, $danger }) => ($danger ? theme.colors.error : theme.colors.text)};
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

interface UserDropdownProps {
  onThemeToggle: () => void;
  themeMode: 'light' | 'dark';
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ onThemeToggle, themeMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={dropdownRef}>
      <Trigger onClick={() => setIsOpen(!isOpen)}>
        <Avatar>
          {user?.email?.charAt(0).toUpperCase() || <UserIcon size={16} />}
        </Avatar>
        <ChevronDown size={14} color="#94a3b8" />
      </Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <UserInfo>
              <span style={{ fontWeight: 600 }}>Signed in as</span>
              <UserEmail>{user?.email}</UserEmail>
            </UserInfo>
            
            <MenuItem onClick={() => { onThemeToggle(); setIsOpen(false); }}>
              {themeMode === 'light' ? (
                <><Moon size={16} /> Dark Mode</>
              ) : (
                <><Sun size={16} /> Light Mode</>
              )}
            </MenuItem>

            <MenuItem $danger onClick={logout}>
              <LogOut size={16} /> Logout
            </MenuItem>
          </Dropdown>
        )}
      </AnimatePresence>
    </Container>
  );
};
