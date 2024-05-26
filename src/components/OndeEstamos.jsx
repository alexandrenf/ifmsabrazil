import * as React from 'react';
import styled from 'styled-components';

const StatsSection = styled.section`
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

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const StatColumn = styled.div`
  flex: 1 1 30%;
  max-width: 30%;
  display: flex;
  justify-content: center;

  @media (max-width: 991px) {
    flex: 1 1 45%;
    max-width: 45%;
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const StatCard = styled.div`
  position: relative;
  height: auto;
  font-family: 'Poppins', sans-serif;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  background-color: ${(props) => props.bgColor};
  flex-grow: 1;
  width: 100%;
  align-self: stretch;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatText = styled.div`
  font-size: 24px;
`;

export default function OndeEstamos() {
  const statsData = [
    {
      id: 1,
      bgColor: 'rgba(0, 80, 140, 1)',
      text: (
        <>
          <strong>Em 26 Estados</strong>
          <br />
          <strong>+ Distrito Federal</strong>
        </>
      ),
    },
    {
      id: 2,
      bgColor: 'rgba(250, 200, 0, 1)',
      text: (
        <>
          <strong>Temos +11000</strong>
          <br />
          <strong>membros filiados</strong>
        </>
      ),
    },
    {
      id: 3,
      bgColor: 'rgba(0, 150, 60, 1)',
      text: (
        <>
          <strong>Presentes em +220</strong>
          <br />
          <strong>escolas médicas</strong>
        </>
      ),
    },
  ];

  return (
    <StatsSection>
      <Title>Nossa abrangência</Title>
      <StatsRow>
        {statsData.map((stat) => (
          <StatColumn key={stat.id}>
            <StatCard bgColor={stat.bgColor}>
              <StatText>{stat.text}</StatText>
            </StatCard>
          </StatColumn>
        ))}
      </StatsRow>
    </StatsSection>
  );
}
