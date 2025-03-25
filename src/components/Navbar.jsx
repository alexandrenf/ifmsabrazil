"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes"
import { library } from "@fortawesome/fontawesome-svg-core"
import logoFundoAzul from "../assets/logo-fundo-azul.png"

// Add only the icons you need to the library
library.add(faBars, faTimes)

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const Nav = styled.nav`
  background: ${(props) => (props.$scrolled ? "rgba(0, 80, 140, 0.95)" : "rgba(0, 80, 140, 1)")};
  backdrop-filter: blur(10px);
  padding: ${(props) => (props.$scrolled ? "0.5rem 2rem" : "0.8rem 2rem")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.$scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none")};
`

const NavLogo = styled.img`
  height: ${(props) => (props.$scrolled ? "45px" : "50px")};
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1040px) {
    display: none;
  }
`

const NavLink = styled.div`
  position: relative;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #fac800;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fac800;
    
    &:after {
      width: 100%;
    }
  }

  @media screen and (max-width: 1200px) {
    font-size: 1rem;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #fac800;
    }
  }
`

const SubMenu = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(0, 80, 140, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 8px;
  z-index: 20;
  min-width: 200px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
  transform-origin: top left;

  & a {
    display: block;
    color: white;
    margin: 0.75rem 0;
    transition: all 0.3s ease;
    padding: 0.5rem;
    border-radius: 4px;

    &:hover {
      color: #fac800;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }
  }
`

const JoinButton = styled(Link)`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  margin-left: 1.5rem;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(40, 167, 69, 0.4);
    background: linear-gradient(135deg, #218838, #1e7e34);
  }
`

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 1040px) {
    display: block;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 1001;
    transition: all 0.3s ease;
    
    &:hover {
      color: #fac800;
    }
  }
`

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 1040px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    background: rgba(0, 80, 140, 0.98);
    backdrop-filter: blur(10px);
    padding: 5rem 2rem 2rem;
    z-index: 1000;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    animation: ${slideInRight} 0.3s ease-out;
  }
`

const MobileOverlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(3px);
`

const MobileSubMenu = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`

const MobileLink = styled.div`
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  
  &:hover {
    color: #fac800;
    background: rgba(255, 255, 255, 0.1);
  }
  
  a {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: center;
  }
`

const MobileSubLink = styled(Link)`
  display: block;
  color: white;
  margin: 0.75rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  text-align: center;
  width: 100%;

  &:hover {
    color: #fac800;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`

const MobileExternalSubLink = styled.div`
  display: block;
  margin: 0.75rem 0;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  
  a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    text-align: center;
    
    &:hover {
      color: #fac800;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }
  }
`

const MobileJoinButton = styled(Link)`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  text-decoration: none;
  width: 80%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(40, 167, 69, 0.4);
    background: linear-gradient(135deg, #218838, #1e7e34);
  }
`

const Spacer = styled.div`
  background: #FAC800;
  height: ${(props) => (props.$scrolled ? "70px" : "84px")};
  transition: height 0.3s ease;
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubMenu, setActiveSubMenu] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Close mobile menu and reset body scroll when route changes
    setIsOpen(false)
    setActiveSubMenu("")
    document.body.style.overflow = "auto" // Add this line to ensure body scroll is restored
  }, [location])

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
    setActiveSubMenu("") // Add this line to reset submenus when toggling mobile menu

    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "auto"
  }

  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? "" : menu)
  }

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Link to="/">
          <NavLogo src={logoFundoAzul} alt="Logo" $scrolled={scrolled} />
        </Link>
        <MobileIcon onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </MobileIcon>
        <NavLinks>
          <NavLink onMouseEnter={() => setActiveSubMenu("quemSomos")} onMouseLeave={() => setActiveSubMenu("")}>
            Quem Somos
            <SubMenu $isOpen={activeSubMenu === "quemSomos"}>
              <Link to="/institucional">Institucional</Link>
              <Link to="/estrutura">Estrutura</Link>
              <Link to="/filiacao">Filiação</Link>
              <Link to="/memoria">Memória Institucional</Link>
            </SubMenu>
          </NavLink>
          <NavLink onMouseEnter={() => setActiveSubMenu("oQueFazemos")} onMouseLeave={() => setActiveSubMenu("")}>
            O Que Fazemos
            <SubMenu $isOpen={activeSubMenu === "oQueFazemos"}>
              <Link to="/eixos">Eixos de Atuação</Link>
              <Link to="/acoes">Ações e Temáticas</Link>
              <Link to="/eventos">Eventos e Workshops</Link>
            </SubMenu>
          </NavLink>
          <NavLink onMouseEnter={() => setActiveSubMenu("mobilidade")} onMouseLeave={() => setActiveSubMenu("")}>
            Intercâmbios
            <SubMenu $isOpen={activeSubMenu === "mobilidade"}>
              <Link to="/intercambio_nacional">Intercâmbios Nacionais</Link>
              <Link to="/intercambio_internacional">Intercâmbios Internacionais</Link>
              <Link to="/regulamento">Regulamento de Intercâmbios</Link>
              <Link to="/outras-modalidades">Outras Modalidades de Intercâmbio</Link>
              <Link to="/social-programs">Social Programs</Link>
            </SubMenu>
          </NavLink>
          <NavLink onMouseEnter={() => setActiveSubMenu("midias")} onMouseLeave={() => setActiveSubMenu("")}>
            Mídias e Documentos
            <SubMenu $isOpen={activeSubMenu === "midias"}>
              <Link to="/arquivos/ressonancia-poetica">Ressonância Poética</Link>
              <Link to="/arquivos/informa-susi">Informa SUSi</Link>
              <Link to="/arquivos/bms">Brazilian Medical Students</Link>
              <Link to="/arquivos/relatorios">Relatórios</Link>
              <Link to="/arquivos/notas-de-posicionamento">Notas de Posicionamento</Link>
              <Link to="/arquivos/declaracoes-de-politica">Declarações de Política</Link>
              <Link to="/arquivos/intercambio-nacional">Intercâmbio Nacional</Link>
              <Link to="/arquivos/intercambio-internacional">Intercâmbio Internacional</Link>
              <Link to="/arquivos/regulamento-intercambios">Regulamento de Intercâmbios</Link>
            </SubMenu>
          </NavLink>
          <NavLink>
            <Link to="/noticias">Notícias</Link>
          </NavLink>
          <NavLink onMouseEnter={() => setActiveSubMenu("membros")} onMouseLeave={() => setActiveSubMenu("")}>
            Membros
            <SubMenu $isOpen={activeSubMenu === "membros"}>
              <a href="https://solar.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                SOLAR
              </a>
              <a href="https://database.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                DATABASE
              </a>
              <a href="https://exchange.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                EXCHANGE
              </a>
            </SubMenu>
          </NavLink>
          <JoinButton to="/filie-se">FILIE-SE</JoinButton>
        </NavLinks>

        <MobileOverlay $isOpen={isOpen} onClick={toggleMobileMenu} />
        <MobileMenu $isOpen={isOpen}>
          <MobileSubMenu>
            <MobileLink onClick={() => toggleSubMenu("quemSomosMobile")}>Quem Somos</MobileLink>
            {activeSubMenu === "quemSomosMobile" && (
              <>
                <MobileSubLink to="/institucional" onClick={toggleMobileMenu}>
                  Institucional
                </MobileSubLink>
                <MobileSubLink to="/estrutura" onClick={toggleMobileMenu}>
                  Estrutura
                </MobileSubLink>
                <MobileSubLink to="/filiacao" onClick={toggleMobileMenu}>
                  Filiação
                </MobileSubLink>
                <MobileSubLink to="/memoria" onClick={toggleMobileMenu}>
                  Memória Institucional
                </MobileSubLink>
              </>
            )}
          </MobileSubMenu>
          <MobileSubMenu>
            <MobileLink onClick={() => toggleSubMenu("oQueFazemosMobile")}>O Que Fazemos</MobileLink>
            {activeSubMenu === "oQueFazemosMobile" && (
              <>
                <MobileSubLink to="/eixos" onClick={toggleMobileMenu}>
                  Eixos de Atuação
                </MobileSubLink>
                <MobileSubLink to="/acoes" onClick={toggleMobileMenu}>
                  Ações e Temáticas
                </MobileSubLink>
                <MobileSubLink to="/eventos" onClick={toggleMobileMenu}>
                  Eventos e Workshops
                </MobileSubLink>
              </>
            )}
          </MobileSubMenu>
          <MobileSubMenu>
            <MobileLink onClick={() => toggleSubMenu("mobilidadeMobile")}>Intercâmbios</MobileLink>
            {activeSubMenu === "mobilidadeMobile" && (
              <>
                <MobileSubLink to="/intercambio_nacional" onClick={toggleMobileMenu}>
                  Intercâmbios Nacionais
                </MobileSubLink>
                <MobileSubLink to="/intercambio_internacional" onClick={toggleMobileMenu}>
                  Intercâmbios Internacionais
                </MobileSubLink>
                <MobileSubLink to="/regulamento" onClick={toggleMobileMenu}>
                  Regulamento de Intercâmbios
                </MobileSubLink>
                <MobileSubLink to="/outras-modalidades" onClick={toggleMobileMenu}>
                  Outras Modalidades de Intercâmbio
                </MobileSubLink>
                <MobileSubLink to="/social-programs" onClick={toggleMobileMenu}>
                  Social Programs
                </MobileSubLink>
              </>
            )}
          </MobileSubMenu>
          <MobileSubMenu>
            <MobileLink onClick={() => toggleSubMenu("midiasMobile")}>Mídias e Documentos</MobileLink>
            {activeSubMenu === "midiasMobile" && (
              <>
                <MobileSubLink to="/arquivos/ressonancia-poetica" onClick={toggleMobileMenu}>
                  Ressonância Poética
                </MobileSubLink>
                <MobileSubLink to="/arquivos/informa-susi" onClick={toggleMobileMenu}>
                  Informa SUSi
                </MobileSubLink>
                <MobileSubLink to="/arquivos/bms" onClick={toggleMobileMenu}>
                  Brazilian Medical Students
                </MobileSubLink>
                <MobileSubLink to="/arquivos/relatorios" onClick={toggleMobileMenu}>
                  Relatórios
                </MobileSubLink>
                <MobileSubLink to="/arquivos/notas-de-posicionamento" onClick={toggleMobileMenu}>
                  Notas de Posicionamento
                </MobileSubLink>
                <MobileSubLink to="/arquivos/declaracoes-de-politica" onClick={toggleMobileMenu}>
                  Declarações de Política
                </MobileSubLink>
                <MobileSubLink to="/arquivos/intercambio-nacional" onClick={toggleMobileMenu}>
                  Intercâmbio Nacional
                </MobileSubLink>
                <MobileSubLink to="/arquivos/intercambio-internacional" onClick={toggleMobileMenu}>
                  Intercâmbio Internacional
                </MobileSubLink>
                <MobileSubLink to="/arquivos/regulamento-intercambios" onClick={toggleMobileMenu}>
                  Regulamento de Intercâmbios
                </MobileSubLink>
              </>
            )}
          </MobileSubMenu>
          <MobileLink>
            <Link to="/noticias">Notícias</Link>
          </MobileLink>
          <MobileSubMenu>
            <MobileLink onClick={() => toggleSubMenu("membrosMobile")}>Membros</MobileLink>
            {activeSubMenu === "membrosMobile" && (
              <>
                <MobileExternalSubLink>
                  <a href="https://solar.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                    SOLAR
                  </a>
                </MobileExternalSubLink>
                <MobileExternalSubLink>
                  <a href="https://database.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                    DATABASE
                  </a>
                </MobileExternalSubLink>
                <MobileExternalSubLink>
                  <a href="https://exchange.ifmsabrazil.org" target="_blank" rel="noopener noreferrer">
                    EXCHANGE
                  </a>
                </MobileExternalSubLink>
              </>
            )}
          </MobileSubMenu>
          <MobileJoinButton to="/filie-se">FILIE-SE</MobileJoinButton>
        </MobileMenu>
      </Nav>
      <Spacer $scrolled={scrolled} />
    </>
  )
}

export default Navbar

