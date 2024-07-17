import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiMail, FiInstagram, FiX, FiBell } from "react-icons/fi";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #00508c;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 46px;
    height: 46px;
  }
`;

const NotificationBubble = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  background-color: #00963c;
  font-weight: bold;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

const ExpandedMenu = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
  transition: all 0.2s ease-in-out;
  animation: ${(props) => (props.isOpen ? fadeIn : fadeOut)} 0.2s forwards;

  @media (max-width: 768px) {
    bottom: 76px;
    right: 16px;
  }
`;

const MenuItem = styled.a`
  color: #00508c;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #003366;
  }

  svg {
    margin-right: 10px;
  }
`;

const FloatingContactButton = ({ showNotification, onAlertReopen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const alertReopen = () => {
    onAlertReopen();
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FloatingButton onClick={toggleMenu}>
        {isOpen ? <FiX size={24} /> : <FiMail size={24} />}
        {showNotification && !isOpen && (
          <NotificationBubble>1</NotificationBubble>
        )}
      </FloatingButton>
      {isOpen && (
        <ExpandedMenu isOpen={isOpen}>
          <MenuItem href="mailto:atendimento@ifmsabrazil.org">
            <FiMail size={20} />
            atendimento@ifmsabrazil.org
          </MenuItem>
          <MenuItem href="https://instagram.com/ifmsabrazil" target="_blank">
            <FiInstagram size={20} />
            @ifmsabrazil
          </MenuItem>
          {showNotification && (
            <MenuItem onClick={alertReopen}>
              <FiBell size={20} />
              Ver aviso novamente
            </MenuItem>
          )}
        </ExpandedMenu>
      )}
    </>
  );
};

export default FloatingContactButton;
