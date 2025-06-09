import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

const Title = styled.h1`
  color: #00508c;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  border-left: 4px solid #00508c;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin: 16px 0;
  padding-left: 24px;
  position: relative;
  
  &:before {
    content: '✅';
    position: absolute;
    left: 0;
  }
`;

const KeyboardTip = styled.div`
  background: #e0f2fe;
  border: 1px solid #0284c7;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 30px;
  color: #0369a1;
  font-weight: 500;
`;

const SearchTestPage = () => {
  return (
    <Container>
      <Title>🔍 Busca Integrada - IFMSA Brasil</Title>
      
      <Description>
        <h3>Sistema de Busca Ativo!</h3>
        <p>O sistema de busca foi integrado com sucesso na navegação do site. Agora você pode:</p>
        
        <FeatureList>
          <FeatureItem>
            <strong>Buscar pelo ícone:</strong> Clique no botão "Buscar..." na barra de navegação superior
          </FeatureItem>
          <FeatureItem>
            <strong>Usar atalho de teclado:</strong> Pressione <kbd>Cmd+K</kbd> (Mac) ou <kbd>Ctrl+K</kbd> (Windows/Linux)
          </FeatureItem>
          <FeatureItem>
            <strong>Buscar no mobile:</strong> Abra o menu móvel e clique em "Buscar no site"
          </FeatureItem>
          <FeatureItem>
            <strong>Resultados em tempo real:</strong> Digite e veja os resultados aparecerem instantaneamente
          </FeatureItem>
          <FeatureItem>
            <strong>Navegação inteligente:</strong> Clique em qualquer resultado para ir diretamente à página
          </FeatureItem>
        </FeatureList>
      </Description>

      <KeyboardTip>
        💡 <strong>Dica:</strong> Pressione <kbd>Cmd+K</kbd> ou <kbd>Ctrl+K</kbd> em qualquer página para abrir a busca rapidamente!
      </KeyboardTip>

      <Description>
        <h4>📊 Estatísticas do Índice:</h4>
        <p>✅ <strong>15 páginas indexadas</strong> com sucesso</p>
        <p>📝 <strong>143 palavras</strong> de conteúdo pesquisável</p>
        <p>🏷️ <strong>Categorização automática</strong> por tags e tipos</p>
        <p>⚡ <strong>Busca em tempo real</strong> com destaque de termos</p>
      </Description>

      <Description>
        <h4>🎯 Tente buscar por:</h4>
        <ul>
          <li><strong>"intercâmbio"</strong> - Encontre informações sobre intercâmbios</li>
          <li><strong>"filiação"</strong> - Como se tornar membro</li>
          <li><strong>"eventos"</strong> - Workshops e congressos</li>
          <li><strong>"regulamento"</strong> - Normas e diretrizes</li>
          <li><strong>"estrutura"</strong> - Organização da IFMSA</li>
        </ul>
      </Description>
    </Container>
  );
};

export default SearchTestPage; 