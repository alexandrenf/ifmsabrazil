import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

const SearchButtonContainer = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-left: 1rem;
  backdrop-filter: blur(10px);
  min-width: 90px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  /* Hide keyboard hint */
  @media screen and (max-width: 1300px) {
    min-width: 90px;
    padding: 8px 12px;
    margin-left: 0.6rem;
  }

  /* More compact - shorter text */
  @media screen and (max-width: 1200px) {
    min-width: 40px;
    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 50%;
    gap: 0;
    margin-left: 0.4rem;
  }

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const SearchIcon = styled(Search)`
  opacity: 0.8;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  ${SearchButtonContainer}:hover & {
    opacity: 1;
  }
`;

const SearchText = styled.span`
  flex: 1;
  text-align: left;
  opacity: 0.9;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;

  ${SearchButtonContainer}:hover & {
    opacity: 1;
  }

  /* Hide keyboard hint on smaller screens */
  @media screen and (max-width: 1300px) {
    font-size: 0.8rem;
  }

  /* Hide text on smaller screens */
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const KeyboardHint = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: monospace;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  ${SearchButtonContainer}:hover & {
    opacity: 0.9;
  }

  /* Hide keyboard hint on smaller screens */
  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

// Mobile search button (for mobile menu)
const MobileSearchButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  width: 80%;
  margin: 1rem 0;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SearchButton = ({ onClick, isMobile = false }) => {
  // Detect if user is on Mac or Windows/Linux
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const keyboardHint = isMac ? '⌘K' : 'Ctrl+K';

  if (isMobile) {
    return (
      <MobileSearchButton onClick={onClick}>
        <SearchIcon size={18} />
        <span>Buscar no site</span>
      </MobileSearchButton>
    );
  }

  return (
    <SearchButtonContainer onClick={onClick} title="Buscar no site">
      <SearchIcon size={16} />
      <SearchText>Buscar</SearchText>
      <KeyboardHint>{keyboardHint}</KeyboardHint>
    </SearchButtonContainer>
  );
};

export default SearchButton; 