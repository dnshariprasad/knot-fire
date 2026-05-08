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
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.375rem 0.5rem 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 140px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.25rem;
  width: 60%;
  margin-bottom: 0.25rem;
`;

const SkeletonLine = styled(SkeletonBase)`
  height: 0.75rem;
  width: 100%;
`;

const SkeletonLineShort = styled(SkeletonLine)`
  width: 90%;
`;

const SkeletonLineShorter = styled(SkeletonLine)`
  width: 70%;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1rem;
  width: 2.5rem;
  border-radius: 4px;
`;

const SkeletonFooter = styled.div`
  margin: auto -0.5rem -0.5rem -0.5rem;
  padding: 0.4rem 0.5rem 0.3rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonDate = styled(SkeletonBase)`
  height: 0.75rem;
  width: 3rem;
`;

const SkeletonBadge = styled(SkeletonBase)`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 6px;
`;

export const NoteSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonTitle />
      <SkeletonLineShort />
      <SkeletonLineShorter />
      <SkeletonTags>
        <SkeletonTag />
        <SkeletonTag />
      </SkeletonTags>
      <SkeletonFooter>
        <SkeletonDate />
        <SkeletonBadge />
      </SkeletonFooter>
    </SkeletonCard>
  );
};
