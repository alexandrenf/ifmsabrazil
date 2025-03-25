import React from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap"
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons/faHandsHelping"
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons/faHeartbeat"
import { faHospital } from "@fortawesome/free-solid-svg-icons/faHospital"
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"

import { library } from "@fortawesome/fontawesome-svg-core"

// Add only the icons you need to the library
library.add(faBook, faGraduationCap, faHandsHelping, faHeartbeat, faHospital, faUniversity, faSearch)

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const AreasSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 80px 20px;
  background-color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00508C;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }
`

const AreasContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 15px;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`

const CardLink = styled.a`
  text-decoration: none;
  width: 250px;

  @media (max-width: 991px) {
    width: calc(33.33% - 15px);
    min-width: 200px;
  }

  @media (max-width: 768px) {
    width: calc(50% - 10px);
    min-width: 150px;
  }

  @media (max-width: 480px) {
    width: calc(100% - 10px);
    min-width: auto;
  }
`

const AreaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color || "rgba(255, 255, 255, 1)"};
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
  text-align: center;
  border: ${(props) => props.border || "none"};
  height: 100%;
  min-height: 180px;
  position: relative;
  overflow: hidden;
  animation: ${popIn} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.$delay || "0s"};
  opacity: 0;

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    z-index: 1;
  }
`

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  
  svg {
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
  }
`

const AreaText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 10px;
  position: relative;
  z-index: 2;
`

export default function AreasOfIFMSABrazil() {
  const areasData = [
    {
      id: 1,
      bgColor: "rgba(182, 120, 38, 1)",
      text: "Representatividade estudantil",
      icon: faGraduationCap,
      link: "/eixos#representatividade-estudantil",
      delay: "0.1s",
    },
    {
      id: 2,
      bgColor: "rgba(0, 0, 0, 1)",
      text: "Capacity Building",
      icon: faBook,
      link: "/eixos#construcao-de-habilidades",
      delay: "0.2s",
    },
    {
      id: 3,
      bgColor: "#FFFFFF",
      text: "Educação Médica",
      icon: faHospital,
      color: "#000",
      border: "2px solid #000",
      link: "/eixos#educacao-medica",
      delay: "0.3s",
    },
    {
      id: 4,
      bgColor: "rgba(220, 0, 0, 1)",
      text: "Promoção de Saúde",
      icon: faHeartbeat,
      link: "/eixos#promocao-de-saude",
      delay: "0.4s",
    },
    {
      id: 5,
      bgColor: "rgba(0, 150, 60, 1)",
      text: "Humanização",
      icon: faHandsHelping,
      link: "/eixos#humanizacao",
      delay: "0.5s",
    },
    {
      id: 6,
      bgColor: "rgba(0, 80, 140, 1)",
      text: "Mobilidade Estudantil",
      icon: faUniversity,
      link: "/eixos#mobilidade-academica",
      delay: "0.6s",
    },
    {
      id: 7,
      bgColor: "rgba(128, 128, 128, 1)",
      text: "Pesquisa e Extensão",
      icon: faSearch,
      link: "/eixos#pesquisa",
      delay: "0.7s",
    },
  ];

  return (
    <AreasSection>
      <Title>Nossos eixos de atuação</Title>
      <AreasContainer>
        <CardsWrapper>
          {areasData.map((area) => (
            <CardLink href={area.link} key={area.id}>
              <AreaCard 
                bgColor={area.bgColor} 
                color={area.color} 
                border={area.border} 
                $delay={area.delay}
              >
                <IconWrapper>
                  <FontAwesomeIcon icon={area.icon} />
                </IconWrapper>
                <AreaText>{area.text}</AreaText>
              </AreaCard>
            </CardLink>
          ))}
        </CardsWrapper>
      </AreasContainer>
    </AreasSection>
  );
}

