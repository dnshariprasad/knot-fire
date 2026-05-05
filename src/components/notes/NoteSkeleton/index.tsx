import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  background-image: linear-gradient(
    90deg, 
    ${({ theme }) => theme.colors.surfaceLight} 0%, 
    ${({ theme }) => theme.colors.border} 50%, 
    ${({ theme }) => theme.colors.surfaceLight} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 140px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.25rem;
  width: 60%;
`;

const SkeletonLine = styled(SkeletonBase)`
  height: 0.875rem;
  width: 100%;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1.25rem;
  width: 3rem;
  border-radius: 12px;
`;

export const NoteSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonTitle />
      <SkeletonLine style={{ width: '90%' }} />
      <SkeletonLine style={{ width: '70%' }} />
      <SkeletonTags>
        <SkeletonTag />
        <SkeletonTag />
      </SkeletonTags>
    </SkeletonCard>
  );
};
