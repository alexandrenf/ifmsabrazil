import React from 'react';
import styled from 'styled-components';
import LinkButton from '../components/LinkButton'; // Adjust the path as needed

const LinkTreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #00508c;
  margin-bottom: 20px;
`;

const LinkTreePage = () => {
  return (
    <LinkTreeContainer>
      <Header>Links COBEM 2024</Header>
      <LinkButton name="Site da IFMSA Brazil" link="https://ifmsabrazil.org" />
      <LinkButton name="Instagram" link="https://instagram.com/ifmsabrazil" />
      <LinkButton name='Instagram de Intercâmbios Internacionais' link='https://instagram.com/ifmsabrazilexchanges' />
      <LinkButton name="Instagram de Intercâmbios Nacionais" link="https://instagram.com/ifmsabrazilintercamnbios" />
      <LinkButton name="BMS Journal Instagram" link="https://instagram.com/bmsjournal" />
      <LinkButton name="Declarações de Política" link="https://ifmsabrazil.org/arquivos/declaracoes-de-politica" />
      <LinkButton name="Em Breve" link="#" />
      <LinkButton name="Em Breve" link="#" />
    </LinkTreeContainer>
  );
};

export default LinkTreePage;
