// components/NotFound.jsx
import React from "react";
import styled from "styled-components";
import { Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h4" component="h2">
        Page Not Found
      </Typography>
      <Typography variant="body1" component="p">
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link to="/">Go to Home</Link>
    </NotFoundContainer>
  );
};

export default NotFound;
