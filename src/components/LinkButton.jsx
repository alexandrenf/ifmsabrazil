import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  display: block;
  padding: 15px;
  margin: 10px 0;
  width: 80%;
  text-align: center;
  background-color: #00963c;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #007f33;
  }
`;

const LinkButton = ({ name, link }) => {
  return (
    <Button href={link} target="_blank" rel="noopener noreferrer">
      {name}
    </Button>
  );
};

export default LinkButton;
