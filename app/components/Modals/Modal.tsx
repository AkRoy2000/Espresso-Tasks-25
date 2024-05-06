"use client";
// Importing necessary modules and components
import { useGlobalState } from "@/app/context/globalProvider"; 
import React from "react"; 
import styled from "styled-components"; 


interface Props {
  content: React.ReactNode;
}

// Functional component for a modal
function Modal({ content }: Props) {

  const { closeModal, theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div> {/* Overlay for closing modal */}
      <div className="modal-content">{content}</div> {/* Modal content */}
    </ModalStyled>
  );
}

// Styled component for the modal
const ModalStyled = styled.div`
//ensures model is in the middle
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 94vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.backgroundDim}; // Dimming background color
  }

  .modal-content {
    margin: 1rem;
    padding: 1rem;
    position: relative;
    max-width: 700px; //model width
    width: 100%;
    z-index: 100;
    border: solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.colorTasks}; // Modal content background color
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadius}; // Border radius for modal
  }
`;

export default Modal;
