import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function Alert({
  message,
  title,
  buttonUrl,
  buttonText,
  toggleButton,
  toggleMessage,
  onClose,
  forceOpen,
  isOpen,
  setIsOpen,
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setIsClosing(false);
    }
  }, [forceOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 800); // Match the new animation duration
  };

  if (!isOpen && !forceOpen && !isClosing) return null;

  return (
    <Overlay isClosing={isClosing}>
      <Container isClosing={isClosing}>
        <CloseButton onClick={handleClose}>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </CloseButton>
        {!isClosing && (
          <Content>
            <IconWrapper>
              <AlertIcon />
            </IconWrapper>
            <Heading>{title}</Heading>
            {toggleMessage && <Message>{message}</Message>}
            {toggleButton && (
              <ButtonWrapper>
                <ActionButton to={buttonUrl} target="_blank" rel="noopener noreferrer">
                  <span>{buttonText}</span>
                </ActionButton>
              </ButtonWrapper>
            )}
          </Content>
        )}
      </Container>
    </Overlay>
  );
}

const AlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00508c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Main circle */}
    <circle cx="12" cy="12" r="10" />
    {/* Exclamation mark with rounded ends */}
    <path d="M12 7v6" strokeLinecap="round" />
    {/* Dot with a heart shape */}
    <path d="M12 16.5c.2-.1.5-.1.7 0 .2.1.3.3.3.5s-.1.4-.3.5c-.2.1-.5.1-.7 0-.2-.1-.3-.3-.3-.5s.1-.4.3-.5z" fill="#00508c" />
  </svg>
);

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  display: grid;
  place-items: center;
  z-index: 1000;
  animation: ${props => props.isClosing ? 'fadeOut' : 'fadeIn'} 0.5s ease-out;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.isClosing ? '50%' : '28px'};
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.6) inset;
  max-width: 500px;
  width: ${props => props.isClosing ? '50px' : 'calc(100% - 48px)'};
  height: ${props => props.isClosing ? '50px' : 'auto'};
  position: relative;
  margin: 24px;
  animation: ${props => props.isClosing ? 'shrinkToButton' : 'slideUp'} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: forwards;

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px) scale(0.96);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes shrinkToButton {
    to { 
      opacity: 0;
      transform: translate(calc(50vw - 45px), calc(50vh - 45px));
      width: 50px;
      height: 50px;
    }
  }
`;

const Content = styled.div`
  padding: 48px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(0, 80, 140, 0.08);
  border-radius: 50%;
  display: grid;
  place-items: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.3;
`;

const Message = styled.p`
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 32px;
  line-height: 1.6;
  max-width: 400px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
  perspective: 1000px; // Adds depth to the animation
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #00508c, #006bb8);
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    border-radius: 50%;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    transition: all 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    background: linear-gradient(135deg, #006bb8, #0080dd);
    box-shadow: 
      0 8px 24px rgba(0, 80, 140, 0.25),
      0 2px 4px rgba(0, 80, 140, 0.1),
      0 -2px 8px rgba(255, 255, 255, 0.2) inset;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 80, 140, 0.3);
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  svg {
    position: relative;
    z-index: 2;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover svg {
    transform: translateX(6px) scale(1.1);
  }

  animation: buttonFloat 6s ease-in-out infinite;

  @keyframes buttonFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
    75% {
      transform: translateY(-2px);
    }
  }

  /* Text content needs to be above the hover effect */
  span {
    position: relative;
    z-index: 2;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
