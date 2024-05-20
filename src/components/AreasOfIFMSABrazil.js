import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap, faHandsHelping, faHeartbeat, faHospital, faUniversity, faSearch } from '@fortawesome/free-solid-svg-icons';

const AreasSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 30px 20px;
  background-color: #FFFFFF;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const AreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px;
  justify-content: center;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    & > :nth-child(5) {
      grid-column: span 2;
    }
  }
`;

const AreaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color || 'rgba(255, 255, 255, 1)'};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  border: ${(props) => props.border || 'none'};

  &:hover {
    transform: translateY(-10px);
  }
`;

const AreaText = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

export default function AreasOfIFMSABrazil() {
  const areasData = [
    { id: 1, bgColor: 'rgba(182, 120, 38, 1)', text: 'Representatividade estudantil', icon: faGraduationCap },
    { id: 2, bgColor: 'rgba(0, 0, 0, 1)', text: 'Capacity Building', icon: faBook },
    { id: 3, bgColor: '#FFFFFF', text: 'Educação Médica', icon: faHospital, color: '#000', border: '2px solid #000' },
    { id: 4, bgColor: 'rgba(220, 0, 0, 1)', text: 'Promoção de Saúde', icon: faHeartbeat },
    { id: 5, bgColor: 'rgba(0, 150, 60, 1)', text: 'Humanização', icon: faHandsHelping },
    { id: 6, bgColor: 'rgba(0, 80, 140, 1)', text: 'Mobilidade Estudantil', icon: faUniversity },
    { id: 7, bgColor: 'rgba(128, 128, 128, 1)', text: 'Pesquisa e Extensão', icon: faSearch },
  ];

  return (
    <AreasSection>
      <Title>Nossos eixos de atuação</Title>
      <AreasGrid>
        {areasData.map((area) => (
          <AreaCard key={area.id} bgColor={area.bgColor} color={area.color} border={area.border}>
            <FontAwesomeIcon icon={area.icon} size='3x' />
            <AreaText>{area.text}</AreaText>
          </AreaCard>
        ))}
      </AreasGrid>
    </AreasSection>
  );
}
