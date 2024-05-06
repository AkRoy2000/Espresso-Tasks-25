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
  height: 100%; // Setting height to 100%, will allow the task panel and sidebar to display across the full screen
`;

export default GlobalStylesProvider;