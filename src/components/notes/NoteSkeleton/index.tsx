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
    ${({ theme }) => theme.colors.border}55 50%, 
    ${({ theme }) => theme.colors.surfaceLight} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 160px;
  position: relative;
  overflow: hidden;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.25rem;
  width: 60%;
  margin-bottom: 0.5rem;
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
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1.25rem;
  width: 3.5rem;
  border-radius: 6px;
`;

const SkeletonFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;

const SkeletonDate = styled(SkeletonBase)`
  height: 0.75rem;
  width: 4rem;
`;

const SkeletonBadge = styled(SkeletonBase)`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 8px;
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
