"use client";
import React from 'react'
import styled from 'styled-components';

interface Props{
    children: React.ReactNode;
}

function GlobalStylesProvider({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
padding: 1.5rem;
gap: 1.5rem;
display: flex; 
height: 100%;

 .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 0.5rem;
  } 
`;

export default GlobalStylesProvider;