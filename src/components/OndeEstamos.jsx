import styled, { keyframes } from "styled-components"
import { Activity, Users, GraduationCap } from 'lucide-react'

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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`

const StatsSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 60px 16px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 150, 60, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 80% 80%, rgba(250, 200, 0, 0.05) 0%, transparent 30%);
  }
`

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #00508C;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #fac800, #00963C);
    border-radius: 2px;
  }
`

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 10px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`

const StatColumn = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  display: flex;
  justify-content: center;
  animation: ${scaleIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || "0s"};
  opacity: 0;

  @media (max-width: 1024px) {
    min-width: 280px;
    max-width: 300px;
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 15px);
    min-width: auto;
    max-width: none;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`

const StatCard = styled.div`
  position: relative;
  height: auto;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  text-align: center;
  background: ${(props) => `linear-gradient(135deg, ${props.bgColor} 0%, ${props.gradientColor} 100%)`};
  width: 100%;
  padding: 25px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
    max-width: 320px;
  }
`

const IconWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  
  svg {
    width: 36px;
    height: 36px;
    stroke-width: 1.5;
    
    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }
`

const StatNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 8px;
  }
`

const StatText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default function OndeEstamos() {
  const statsData = [
    {
      id: 1,
      bgColor: "#00508C",
      gradientColor: "#003866",
      icon: <Activity />,
      text: (
        <>
          <StatNumber>26 Estados</StatNumber>
          <StatText>+ Distrito Federal</StatText>
        </>
      ),
      delay: "0.1s",
      floatDelay: "0s"
    },
    {
      id: 2,
      bgColor: "#fac800",
      gradientColor: "#e0b200",
      icon: <Users />,
      text: (
        <>
          <StatNumber>+11.000</StatNumber>
          <StatText>membros filiados</StatText>
        </>
      ),
      delay: "0.3s",
      floatDelay: "0.2s"
    },
    {
      id: 3,
      bgColor: "#00963C",
      gradientColor: "#007830",
      icon: <GraduationCap />,
      text: (
        <>
          <StatNumber>+220</StatNumber>
          <StatText>escolas médicas</StatText>
        </>
      ),
      delay: "0.5s",
      floatDelay: "0.4s"
    },
  ]

  return (
    <StatsSection>
      <Title>Nossa abrangência</Title>
      <StatsRow>
        {statsData.map((stat) => (
          <StatColumn key={stat.id} $delay={stat.delay}>
            <StatCard 
              bgColor={stat.bgColor}
              gradientColor={stat.gradientColor}
              $floatDelay={stat.floatDelay}
            >
              <IconWrapper>{stat.icon}</IconWrapper>
              {stat.text}
            </StatCard>
          </StatColumn>
        ))}
      </StatsRow>
    </StatsSection>
  )
}

