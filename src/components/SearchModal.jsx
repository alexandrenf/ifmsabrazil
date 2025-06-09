import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlgoliaSearch from './AlgoliaSearch';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  animation: ${slideInDown} 0.3s ease-out;
  position: relative;
  
  @media (max-width: 640px) {
    width: 95%;
    max-height: 85vh;
    border-radius: 12px;
    margin: 0 10px;
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #00508c;
  font-weight: 600;
  font-size: 1.1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const SearchContainer = styled.div`
  padding: 20px 24px;
  
  @media (max-width: 640px) {
    padding: 16px 20px;
  }
`;

const QuickActionsContainer = styled.div`
  padding: 0 24px 24px;
  
  @media (max-width: 640px) {
    padding: 0 20px 20px;
  }
`;

const QuickActionsTitle = styled.h4`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 640px) {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 8px;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 6px;
  }
`;

const QuickActionButton = styled.button`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 0.875rem;
  
  &:hover {
    background: #f1f5f9;
    border-color: #00508c;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const KeyboardHint = styled.div`
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #9ca3af;
  background: #fafbfc;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const KeyboardShortcut = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const KeyBadge = styled.span`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.75rem;
  
  @media (max-width: 480px) {
    padding: 1px 4px;
    font-size: 0.7rem;
  }
`;

const AlgoliaCredit = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  color: #9ca3af;
  
  @media (max-width: 480px) {
    order: -1;
  }
`;

const AlgoliaLogo = styled.img`
  height: 14px;
  opacity: 0.7;
  
  @media (max-width: 480px) {
    height: 12px;
  }
`;

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  
  // Detect platform for keyboard hints
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Handle keyboard shortcuts only when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle shortcuts when modal is open
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      // Add event listener with capture to ensure it runs first
      document.addEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleResultClick = (result) => {
    navigate(result.path);
    onClose();
  };

  const handleQuickAction = (path) => {
    navigate(path);
    onClose();
  };

  const quickActions = [
    { label: 'Filiação', path: '/filiacao', description: 'Como se tornar membro' },
    { label: 'Intercâmbios', path: '/intercambio_internacional', description: 'Oportunidades internacionais' },
    { label: 'Eventos', path: '/eventos', description: 'Workshops e congressos' },
    { label: 'Regulamento', path: '/regulamento', description: 'Normas e diretrizes' },
    { label: 'Estrutura', path: '/estrutura', description: 'Organização da IFMSA' },
    { label: 'Notícias', path: '/noticias', description: 'Últimas atualizações' }
  ];

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <ModalTitle>
            <Search size={20} />
            Buscar no site da IFMSA Brasil
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <SearchContainer>
          <AlgoliaSearch 
            placeholder="Digite para buscar páginas, eventos, intercâmbios..."
            onResultClick={handleResultClick}
          />
        </SearchContainer>

        <QuickActionsContainer>
          <QuickActionsTitle>Acesso Rápido</QuickActionsTitle>
          <QuickActionGrid>
            {quickActions.map((action, index) => (
              <QuickActionButton 
                key={index}
                onClick={() => handleQuickAction(action.path)}
                title={action.description}
              >
                {action.label}
              </QuickActionButton>
            ))}
          </QuickActionGrid>
        </QuickActionsContainer>

        <KeyboardHint>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <KeyboardShortcut>
              <KeyBadge>{isMac ? '⌘' : 'Ctrl'}</KeyBadge>
              <KeyBadge>K</KeyBadge>
              <span>para abrir</span>
            </KeyboardShortcut>
            <KeyboardShortcut>
              <KeyBadge>Esc</KeyBadge>
              <span>para fechar</span>
            </KeyboardShortcut>
          </div>
          <AlgoliaCredit>
            <span>Powered by</span>
            <AlgoliaLogo 
              src="/assets/Algolia-mark-rounded-blue.svg"  
              alt="Algolia"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 30'%3E%3Ctext x='10' y='20' font-family='Arial' font-size='14' fill='%23666'%3EAlgolia%3C/text%3E%3C/svg%3E";
              }}
            />
            <span>Algolia</span>
          </AlgoliaCredit>
        </KeyboardHint>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchModal; 