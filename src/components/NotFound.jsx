import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 24px;
`;

const HomeLink = styled(Link)`
  font-size: 1.2rem;
  color: #00508c;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>Sorry, the page you are looking for does not exist.</Message>
      <HomeLink to="/">Go to Home</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
