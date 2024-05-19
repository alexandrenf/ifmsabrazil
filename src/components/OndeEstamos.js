import * as React from "react";
import styled from "styled-components";

const StatsSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 0px;
  width: 100%;
`;

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const StatColumn = styled.div`
  flex: 1 1 33.333%;
  max-width: 33.333%;
  @media (max-width: 991px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const StatCard = styled.div`
  position: relative;
  height: auto;
  font-family: "Poppins", sans-serif;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  background-color: ${(props) => props.bgColor};
  flex-grow: 1;
  width: 100%;
  align-self: stretch;
  padding: 20px;
`;

const StatText = styled.div`
  font-size: 30px;
`;

export default function MyComponent() {
  const statsData = [
    {
      id: 1,
      bgColor: "rgba(0, 80, 140, 1)",
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
      bgColor: "rgba(250, 200, 0, 1)",
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
      bgColor: "rgba(0, 150, 60, 1)",
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
