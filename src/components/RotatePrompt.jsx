import React from "react";
import styled from "styled-components";
import { FiRotateCcw, FiX } from "react-icons/fi";

const PromptOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
`;

const RotateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ArrowIcon = styled(FiRotateCcw)`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const MessageText = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: white;
  color: #003366;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    color: white;
  }
`;

const RotatePrompt = ({ onClose }) => {
  return (
    <PromptOverlay>
      <RotateMessage>
        <ArrowIcon />
        <MessageText>
          Por favor, gire seu dispositivo para o modo paisagem
        </MessageText>
        <CloseButton onClick={onClose}>
          <FiX size={24} />
        </CloseButton>
      </RotateMessage>
    </PromptOverlay>
  );
};

export default RotatePrompt;
