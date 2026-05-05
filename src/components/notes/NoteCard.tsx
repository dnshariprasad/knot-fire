import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';
import type { Note } from '../../types';
import { 
  Tag as TagIcon, MoreVertical, MapPin, Hash, 
  Calendar, Share2, Trash2, 
  ExternalLink, Globe, User as UserIcon, Lock as LockIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h3<{ $blurred?: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.3 : 1};
`;

const MoreButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Popover = styled(DropdownMenu.Content)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 140px;
  overflow: hidden;
  margin-top: 0.25rem;
  z-index: 9999;
  
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  animation: scaleIn 0.2s ease;
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const PopoverItem = styled(DropdownMenu.Item)<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  font-size: 0.8125rem;
  background: transparent;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const Content = styled.p<{ $blurred?: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
  filter: ${({ $blurred }) => $blurred ? 'blur(8px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

const TagContainer = styled.div<{ $blurred?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
  filter: ${({ $blurred }) => $blurred ? 'blur(4px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.6875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const FieldsGrid = styled.div<{ $blurred?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  filter: ${({ $blurred }) => $blurred ? 'blur(6px)' : 'none'};
  opacity: ${({ $blurred }) => $blurred ? 0.2 : 1};
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 0;
  width: 100%;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;

const PrivateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 5;
  background: transparent;
`;

const PrivateBadge = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: (id: string) => void;
  onToggleTag: (tag: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onDelete, onToggleTag }) => {
  const handleShare = async (e: Event) => {
    e.stopPropagation();
    if (note.isPrivate) {
      toast.error('Cannot share private notes from the dashboard. Open the note first.');
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({
          title: note.title,
          text: note.content,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
        toast.success('Note copied to clipboard');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Sharing failed');
      }
    }
  };

  const handleDelete = (e: Event) => {
    e.stopPropagation();
    if (window.confirm('Delete this note?')) {
      onDelete(note.id);
    }
  };

  const getFieldIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('link') || l.includes('url')) return <Globe size={14} />;
    if (l.includes('date') || l.includes('dob')) return <Calendar size={14} />;
    if (l.includes('loc')) return <MapPin size={14} />;
    if (l.includes('id') || l.includes('user')) return <UserIcon size={14} />;
    if (l.includes('pass') || l.includes('pwd')) return <LockIcon size={14} />;
    return <TagIcon size={14} />;
  };

  return (
    <Card
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <Header>
        <Title $blurred={note.isPrivate}>{note.title || 'Untitled Private Note'}</Title>
        <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MoreButton>
                <MoreVertical size={16} />
              </MoreButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <Popover sideOffset={4} align="end">
                <PopoverItem onSelect={handleShare}>
                  <Share2 size={14} /> Share
                </PopoverItem>
                <PopoverItem $danger onSelect={handleDelete}>
                  <Trash2 size={14} /> Delete
                </PopoverItem>
              </Popover>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </Header>

      <Content $blurred={note.isPrivate}>
        {note.isPrivate ? 'This content is hidden because the note is private. Click to reveal.' : note.content}
      </Content>

      {note.tags.length > 0 && (
        <TagContainer $blurred={note.isPrivate}>
          {note.tags.map(tag => (
            <Tag key={tag} onClick={(e) => { e.stopPropagation(); onToggleTag(tag); }}>
              <Hash size={10} /> {tag}
            </Tag>
          ))}
        </TagContainer>
      )}

      {note.customFields.length > 0 && (
        <FieldsGrid $blurred={note.isPrivate}>
          {note.customFields.map((field, idx) => (
            <FieldItem key={idx}>
              {getFieldIcon(field.label)}
              <span>
                {field.label.toLowerCase().includes('pass') ? '••••••••' : field.value}
              </span>
              {field.value.startsWith('http') && <ExternalLink size={10} style={{ opacity: 0.5 }} />}
            </FieldItem>
          ))}
        </FieldsGrid>
      )}

      {note.isPrivate && (
        <PrivateOverlay>
          <PrivateBadge>
            <LockIcon size={14} /> Private
          </PrivateBadge>
        </PrivateOverlay>
      )}
    </Card>
  );
};
