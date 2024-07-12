import React from "react";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logoFundoAzul from "./assets/logo-fundo-azul.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #014f8c;
  color: white;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Message = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  position: relative;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
`;

const App = () => {
  return (
    <Container>
      <Logo src={logoFundoAzul} alt="Logo" />
      <Message>
        Estamos construindo uma nova experiência para você! Retornamos em breve!
      </Message>
      <Footer>
        <ContactItem>
          <FaInstagram size={24} />
          <a
            href="https://www.instagram.com/ifmsabrazil"
            style={{ color: "white", textDecoration: "none" }}
          >
            @ifmsabrazil
          </a>
        </ContactItem>
        <ContactItem>
          <MdEmail size={24} />
          <a
            href="mailto:atendimento@ifmsabrazil.org"
            style={{ color: "white", textDecoration: "none" }}
          >
            atendimento@ifmsabrazil.org
          </a>
        </ContactItem>
      </Footer>
    </Container>
  );
};

export default App;
