"use client";
import React from 'react'
import styled from 'styled-components';

// Interface for defining Props for GlobalStylesProvider component
interface Props {
  children: React.ReactNode; // Children elements passed to the GlobalStylesProvider
}

// Functional component for providing global styles to the application
function GlobalStylesProvider({ children }: Props) {
  // Returning the children wrapped inside GlobalStyles styled component
  return <GlobalStyles>{children}</GlobalStyles>;
}

// Styled component for defining global styles
const GlobalStyles = styled.div`
  padding: 1.5rem; // Padding for the entire application
  gap: 1.5rem; // Gap between elements
  display: flex; // Setting display to flex
  height: 100%; // Setting height to 100%

  // Styling for grid layout
  .grid {
      display: grid; // Setting display to grid
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); // Defining grid columns
      gap: 0.5rem; // Gap between grid items
  } 
`;

// Exporting the GlobalStylesProvider component as default
export default GlobalStylesProvider;