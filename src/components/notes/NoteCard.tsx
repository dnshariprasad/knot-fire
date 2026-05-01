import React from 'react';
import styled from 'styled-components';
import type { Note } from '../../types';
import { Tag as TagIcon, MoreVertical, MapPin, Hash, Link as LinkIcon, Calendar, Share2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

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
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const MoreButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem;
  border-radius: 4px;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 140px;
  overflow: hidden;
  margin-top: 0.25rem;
  z-index: 10;
`;

const PopoverItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  font-size: 0.8125rem;
  background: transparent;
  color: ${({ theme, $danger }) => $danger ? theme.colors.error : theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const Content = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CustomFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `Knot: ${note.title}`,
      text: note.content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
        toast.success('Copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Sharing failed');
      }
    }
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this note?')) {
      onDelete(note.id);
    }
    setShowMenu(false);
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
        <Title>{note.title}</Title>
        <div style={{ position: 'relative' }}>
          <MoreButton onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}>
            <MoreVertical size={16} />
          </MoreButton>
          {showMenu && (
            <Popover>
              <PopoverItem onClick={handleShare}>
                <Share2 size={14} /> Share
              </PopoverItem>
              <PopoverItem $danger onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </PopoverItem>
            </Popover>
          )}
        </div>
      </Header>

      <Content>{note.content}</Content>

      {note.tags.length > 0 && (
        <TagContainer>
          {note.tags.map(tag => (
            <Tag key={tag}>
              <Hash size={12} /> {tag}
            </Tag>
          ))}
        </TagContainer>
      )}

      {note.customFields.length > 0 && (
        <CustomFields>
          {note.customFields.map((field, idx) => (
            <Field key={idx}>
              {field.label.toLowerCase().includes('location') ? <MapPin size={12} /> : 
               field.label.toLowerCase().includes('link') ? <LinkIcon size={12} /> :
               field.label.toLowerCase().includes('dob') || field.label.toLowerCase().includes('date') ? <Calendar size={12} /> :
               <TagIcon size={12} />}
              <strong>{field.label}:</strong> {field.value.startsWith('http') ? (
                <a 
                  href={field.value} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: '#6366f1', textDecoration: 'underline' }}
                >
                  {field.value.length > 30 ? field.value.substring(0, 30) + '...' : field.value}
                </a>
              ) : field.value}
            </Field>
          ))}
        </CustomFields>
      )}
    </Card>
  );
};
