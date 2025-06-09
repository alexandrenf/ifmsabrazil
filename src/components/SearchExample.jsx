import React from 'react';
import styled from 'styled-components';
import AlgoliaSearch from './AlgoliaSearch';
import { useNavigate } from 'react-router-dom';

const SearchPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #00508c;
  margin-bottom: 8px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #6b7280;
  margin-bottom: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SearchWrapper = styled.div`
  margin-bottom: 40px;
`;

const StatsContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-top: 40px;
`;

const StatsTitle = styled.h3`
  color: #1f2937;
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StatsItem = styled.li`
  color: #6b7280;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }
`;

const QuickLinks = styled.div`
  margin-top: 32px;
`;

const QuickLinksTitle = styled.h4`
  color: #374151;
  margin-bottom: 16px;
  font-size: 1rem;
  font-weight: 600;
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`;

const QuickLink = styled.button`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  
  &:hover {
    border-color: #00508c;
    background: #f8fafc;
  }
  
  &:focus {
    outline: none;
    border-color: #00508c;
    box-shadow: 0 0 0 3px rgba(0, 80, 140, 0.1);
  }
`;

const SearchExample = () => {
  const navigate = useNavigate();

  const handleResultClick = (result) => {
    // Custom navigation with React Router
    navigate(result.path);
  };

  const handleQuickSearch = (query) => {
    // You could trigger a search programmatically
    // This is just for demonstration
    alert(`Buscar por: "${query}"`);
  };

  const popularSearches = [
    'Intercâmbio Internacional',
    'Filiação',
    'Eventos',
    'Regulamento',
    'Estrutura',
    'Eixos'
  ];

  return (
    <SearchPageContainer>
      <Title>Buscar no IFMS Brasil</Title>
      <Subtitle>
        Encontre rapidamente informações sobre intercâmbios, eventos, 
        regulamentos e muito mais através de nosso sistema de busca inteligente.
      </Subtitle>

      <SearchWrapper>
        <AlgoliaSearch 
          placeholder="Digite sua busca aqui... (ex: intercâmbio, filiação, eventos)"
          onResultClick={handleResultClick}
        />
      </SearchWrapper>

      <StatsContainer>
        <StatsTitle>Sistema de Busca</StatsTitle>
        <StatsList>
          <StatsItem>17 páginas indexadas automaticamente</StatsItem>
          <StatsItem>Busca em tempo real com destaque de termos</StatsItem>
          <StatsItem>Conteúdo organizado por categorias e tags</StatsItem>
          <StatsItem>Busca inteligente em títulos e conteúdo</StatsItem>
          <StatsItem>Interface responsiva e acessível</StatsItem>
        </StatsList>

        <QuickLinks>
          <QuickLinksTitle>Buscas Populares:</QuickLinksTitle>
          <LinkGrid>
            {popularSearches.map((search, index) => (
              <QuickLink 
                key={index}
                onClick={() => handleQuickSearch(search)}
              >
                {search}
              </QuickLink>
            ))}
          </LinkGrid>
        </QuickLinks>
      </StatsContainer>
    </SearchPageContainer>
  );
};

export default SearchExample; 