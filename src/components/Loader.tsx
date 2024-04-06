import React from 'react';
import 'ldrs/hourglass';
import styled from '@emotion/styled';


interface LoaderType {
  isLoading: boolean;
}

// StyledLoader component with conditional styles based on isLoading prop
const StyledLoader = styled.div<{ isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader: React.FC<LoaderType> = ({ isLoading }) => {
  return (
    <StyledLoader isLoading={isLoading} aria-live="polite" aria-busy={isLoading}>
      {isLoading && <l-hourglass size="80" color="#c09569"></l-hourglass>}
    </StyledLoader>
  );
};

export default Loader;
