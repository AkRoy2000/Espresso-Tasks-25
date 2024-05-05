"use client"; // Not sure what this comment means; it seems to be a directive but isn't a standard JavaScript or TypeScript directive.

// Importing necessary modules and components
import { useGlobalState } from "@/app/context/globalProvider"; // Importing custom hook for global state management
import React from "react"; // Importing React
import styled from "styled-components"; // Importing styled-components for styling

// Interface for component props
interface Props {
  content: React.ReactNode;
}

// Functional component for a modal
function Modal({ content }: Props) {
  // Accessing global state and functions using custom hook
  const { closeModal, theme } = useGlobalState();

  // Rendering JSX for the component
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div> {/* Overlay for closing modal */}
      <div className="modal-content">{content}</div> {/* Modal content */}
    </ModalStyled>
  );
}

// Styled component for the modal
const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
    max-width: 700px;
    width: 100%;
    z-index: 100;
    border: solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.colorTasks}; // Modal content background color
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadius}; // Border radius for modal

    @media screen and (max-width: 450px) {
      font-size: 90%; // Adjusting font size for smaller screens
    }
  }
`;

export default Modal;
