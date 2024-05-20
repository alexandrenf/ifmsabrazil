import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo-fundo-azul.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  background: #00508C;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
`;

const NavLogo = styled.img`
  height: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.div`
  position: relative;
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0 1rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #FAC800;
  }
`;

const SubMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background: #00508C;
  padding: 1rem;
  border-radius: 5px;
  z-index: 20;

  & a {
    display: block;
    color: white;
    margin: 0.5rem 0;
    transition: color 0.3s;

    &:hover {
      color: #FAC800;
    }
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: #00508C;
    padding: 1rem 0;
  }
`;

const MobileSubMenu = styled.div`
  width: 100%;
  text-align: center;
`;

const MobileLink = styled.div`
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #FAC800;
  }
`;

const MobileSubLink = styled(Link)`
  display: block;
  color: white;
  margin: 0.5rem 0;
  transition: color 0.3s;

  &:hover {
    color: #FAC800;
  }
`;

const JoinButton = styled(Link)`
  background: #28a745; /* Verde */
  color: white; /* Letras brancas */
  font-weight: bold; /* Negrito */
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #218838; /* Verde mais escuro para hover */
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('');

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? '' : menu);
  };

  return (
    <Nav>
      <Link to="/">
        <NavLogo src={logo} alt="Logo" />
      </Link>
      <MobileIcon onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </MobileIcon>
      <NavLinks>
        <NavLink
          onMouseEnter={() => setActiveSubMenu('quemSomos')}
          onMouseLeave={() => setActiveSubMenu('')}
          onClick={() => toggleSubMenu('quemSomosMobile')}
        >
          Quem Somos
          <SubMenu isOpen={activeSubMenu === 'quemSomos' || activeSubMenu === 'quemSomosMobile'}>
            <Link to="/institucional">Institucional</Link>
            <Link to="/estrutura">Estrutura</Link>
            <Link to="/filiacao">Filiação</Link>
            <Link to="/estatuto">Estatuto Social</Link>
          </SubMenu>
        </NavLink>
        <NavLink
          onMouseEnter={() => setActiveSubMenu('oQueFazemos')}
          onMouseLeave={() => setActiveSubMenu('')}
          onClick={() => toggleSubMenu('oQueFazemosMobile')}
        >
          O Que Fazemos
          <SubMenu isOpen={activeSubMenu === 'oQueFazemos' || activeSubMenu === 'oQueFazemosMobile')}>
            <Link to="/eixos">Eixos de Atuação</Link>
            <Link to="/acoes">Ações e Temáticas</Link>
            <Link to="/eventos">Eventos e Workshops</Link>
          </SubMenu>
        </NavLink>
        <NavLink
          onMouseEnter={() => setActiveSubMenu('mobilidade')}
          onMouseLeave={() => setActiveSubMenu('')}
          onClick={() => toggleSubMenu('mobilidadeMobile')}
        >
          Mobilidade Estudantil
          <SubMenu isOpen={activeSubMenu === 'mobilidade' || activeSubMenu === 'mobilidadeMobile')}>
            <Link to="/nacionais">Intercâmbios Nacionais</Link>
            <Link to="/internacionais">Intercâmbios Internacionais</Link>
            <Link to="/outras-modalidades">Outras Modalidades de Intercâmbio</Link>
            <Link to="/social-programs">Social Programs</Link>
          </SubMenu>
        </NavLink>
        <NavLink
          onMouseEnter={() => setActiveSubMenu('midias')}
          onMouseLeave={() => setActiveSubMenu('')}
          onClick={() => toggleSubMenu('midiasMobile')}
        >
          Mídias e Documentos
          <SubMenu isOpen={activeSubMenu === 'midias' || activeSubMenu === 'midiasMobile')}>
            <Link to="/ressonancia">Ressonância Poética</Link>
            <Link to="/informa-susi">Informa SUSi</Link>
            <Link to="/brazilian-medical-students">Brazilian Medical Students</Link>
            <Link to="/relatorios">Relatórios</Link>
            <Link to="/notas">Notas de Posicionamento</Link>
            <Link to="/declaracoes">Declarações de Política</Link>
          </SubMenu>
        </NavLink>
        <NavLink
          onMouseEnter={() => setActiveSubMenu('membros')}
          onMouseLeave={() => setActiveSubMenu('')}
          onClick={() => toggleSubMenu('membrosMobile')}
        >
          Membros
          <SubMenu isOpen={activeSubMenu === 'membros' || activeSubMenu === 'membrosMobile')}>
            <Link to="/solar">SOLAR</Link>
            <Link to="/database">DATABASE</Link>
            <Link to="/exchange">EXCHANGE</Link>
          </SubMenu>
        </NavLink>
        <JoinButton to="/filie-se">FILIE-SE</JoinButton>
      </NavLinks>
      <MobileMenu isOpen={isOpen}>
        <MobileSubMenu>
          <MobileLink onClick={() => toggleSubMenu('quemSomosMobile')}>
            Quem Somos
          </MobileLink>
          {activeSubMenu === 'quemSomosMobile' && (
            <>
              <MobileSubLink to="/institucional" onClick={toggleMobileMenu}>Institucional</MobileSubLink>
              <MobileSubLink to="/estrutura" onClick={toggleMobileMenu}>Estrutura</MobileSubLink>
              <MobileSubLink to="/filiacao" onClick={toggleMobileMenu}>Filiação</MobileSubLink>
              <MobileSubLink to="/estatuto" onClick={toggleMobileMenu}>Estatuto Social</MobileSubLink>
            </>
          )}
        </MobileSubMenu>
        <MobileSubMenu>
          <MobileLink onClick={() => toggleSubMenu('oQueFazemosMobile')}>
            O Que Fazemos
          </MobileLink>
          {activeSubMenu === 'oQueFazemosMobile' && (
            <>
              <MobileSubLink to="/eixos" onClick={toggleMobileMenu}>Eixos de Atuação</MobileSubLink>
              <MobileSubLink to="/acoes" onClick={toggleMobileMenu}>Ações e Temáticas</MobileSubLink>
              <MobileSubLink to="/eventos" onClick={toggleMobileMenu}>Eventos e Workshops</MobileSubLink>
            </>
          )}
        </MobileSubMenu>
        <MobileSubMenu>
          <MobileLink onClick={() => toggleSubMenu('mobilidadeMobile')}>
            Mobilidade Estudantil
          </MobileLink>
          {activeSubMenu === 'mobilidadeMobile' && (
            <>
              <MobileSubLink to="/nacionais" onClick={toggleMobileMenu}>Intercâmbios Nacionais</MobileSubLink>
              <MobileSubLink to="/internacionais" onClick={toggleMobileMenu}>Intercâmbios Internacionais</MobileSubLink>
              <MobileSubLink to="/outras-modalidades" onClick={toggleMobileMenu}>Outras Modalidades de Intercâmbio</MobileSubLink>
              <MobileSubLink to="/social-programs" onClick={toggleMobileMenu}>Social Programs</MobileSubLink>
            </>
          )}
        </MobileSubMenu>
        <MobileSubMenu>
          <MobileLink onClick={() => toggleSubMenu('midiasMobile')}>
            Mídias e Documentos
          </MobileLink>
          {activeSubMenu === 'midiasMobile' && (
            <>
              <MobileSubLink to="/ressonancia" onClick={toggleMobileMenu}>Ressonância Poética</MobileSubLink>
              <MobileSubLink to="/informa-susi" onClick={toggleMobileMenu}>Informa SUSi</MobileSubLink>
              <MobileSubLink to="/brazilian-medical-students" onClick={toggleMobileMenu}>Brazilian Medical Students</MobileSubLink>
              <MobileSubLink to="/relatorios" onClick={toggleMobileMenu}>Relatórios</MobileSubLink>
              <MobileSubLink to="/notas" onClick={toggleMobileMenu}>Notas de Posicionamento</MobileSubLink>
              <MobileSubLink to="/declaracoes" onClick={toggleMobileMenu}>Declarações de Política</MobileSubLink>
            </>
          )}
        </MobileSubMenu>
        <MobileSubMenu>
          <MobileLink onClick={() => toggleSubMenu('membrosMobile')}>
            Membros
          </MobileLink>
          {activeSubMenu === 'membrosMobile' && (
            <>
              <MobileSubLink to="/solar" onClick={toggleMobileMenu}>SOLAR</MobileSubLink>
              <MobileSubLink to="/database" onClick={toggleMobileMenu}>DATABASE</MobileSubLink>
              <MobileSubLink to="/exchange" onClick={toggleMobileMenu}>EXCHANGE</MobileSubLink>
            </>
          )}
        </MobileSubMenu>
        <MobileLink to="/filie-se" onClick={toggleMobileMenu}>FILIE-SE</MobileLink>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
