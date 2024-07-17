import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export default function Alert({
  message,
  title,
  buttonUrl,
  buttonText,
  toggleButton,
  toggleMessage,
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Container>
        <CloseButton onClick={() => setIsOpen(false)}>
          <XIcon />
          <span className="sr-only">Close</span>
        </CloseButton>
        <Content>
          <Heading>{title}</Heading>
          {toggleMessage ? <Paragraph>{message}</Paragraph> : null}
          {toggleButton ? (
            <StyledLink to={buttonUrl}>{buttonText}</StyledLink>
          ) : null}
        </Content>
      </Container>
    </Overlay>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  background-color: hsl(142, 86%, 28%);
  padding: 2rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 42rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: hsl(356, 29%, 98%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    color: rgba(356, 29%, 98%, 0.8);
  }

  &:focus {
    outline: 2px solid hsl(142, 86%, 28%);
    outline-offset: 2px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: hsl(356, 29%, 98%);
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: hsl(356, 29%, 98%);
  margin-bottom: 1.5rem;
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  background-color: hsl(356, 29%, 98%);
  color: hsl(142, 86%, 28%);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: rgba(356, 29%, 98%, 0.9);
  }

  &:focus {
    outline: 2px solid hsl(142, 86%, 28%);
    outline-offset: 2px;
  }
`;
