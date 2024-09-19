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
      <LinkButton name="Instagram de Intercâmbios Nacionais" link="https://instagram.com/ifmsabrazilintercambios" />
      <LinkButton name="BMS Journal Instagram" link="https://instagram.com/bmsjournal" />
      <LinkButton name="Declarações de Política" link="https://ifmsabrazil.org/arquivos/declaracoes-de-politica" />
      <LinkButton name="Como submeter à BMS" link="https://drive.google.com/drive/u/0/mobile/folders/1k1PsgHNX-pwwZbzuZWrd2kV3CRsaWv4Z?usp=sharing" />
      <LinkButton name="Introdução à BMS" link="https://drive.google.com/file/d/17RMM6f24aj6QnFgmnP4Wa-IDakiNqI4q/view?usp=drivesdk" />
      <LinkButton name="Chamada Ressonância Poética" link="https://ifmsabrazil.org/arquivo/5/chamada-para-submissao-de-trabalhos-no-v-resson-ncia-poetica" />
      <LinkButton name="Em Breve" link="#" />
    </LinkTreeContainer>
  );
};

export default LinkTreePage;
