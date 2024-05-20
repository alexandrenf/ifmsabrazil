import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
  background: #00508C;
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-family: 'Poppins', sans-serif;
  margin: 10px 0;
  line-height: 1.5;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;

  svg {
    margin-right: 10px;
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #FAC800;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterText>
        Alameda Santos, n.º 1.800, 8º andar, 8032, Bairro Cerqueira César, São Paulo/SP - Brasil | CEP: 01418-200 | CNPJ: 02.300.156/0001-13
      </FooterText>
      <ContactInfo>
        <ContactItem>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>atendimento@ifmsabrazil.org</span>
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faPhone} />
          <span>Tel: + 55 11 3170-3251</span>
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Alameda Santos, n.º 1.800, 8º andar, 8032, Bairro Cerqueira César, São Paulo/SP - Brasil</span>
        </ContactItem>
      </ContactInfo>
      <SocialLinks>
        <SocialLink href="https://twitter.com/ifmsabrazil" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </SocialLink>
        <SocialLink href="https://instagram.com/ifmsabrazil" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </SocialLink>
      </SocialLinks>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
