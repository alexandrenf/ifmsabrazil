import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import Gallery from '../components/Gallery.jsx'
import BrazilMap from '../components/BrazilMap.jsx'
import 'prismjs/components/prism-jsx.js';
import '../components/codeStyles.css'; // Your custom styles

const Root = styled(Container)({
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#333',
});

const MarkdownContainer = styled('div')({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '16px',
  '& table': {
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    marginBottom: '16px',
    overflowX: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  '& th, & td': {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  '& th': {
    backgroundColor: '#f2f2f2',
  },
  '& blockquote': {
    borderLeft: '4px solid #ddd',
    paddingLeft: '16px',
    color: '#666',
    margin: '16px 0',
    fontStyle: 'italic',
    '& blockquote': {
      borderLeft: '4px solid #bbb',
      margin: '16px 0 0',
      paddingLeft: '16px',
    },
  },
  '& a': {
    color: '#00508C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
});

const Title = styled(Typography)({
  color: '#00508C',
  marginBottom: '16px',
  fontWeight: 'bold',
  textAlign: 'center', // Center the title
});

const MetaData = styled('div')({
  marginBottom: '16px',
  color: '#666',
  textAlign: 'center', // Center the metadata
});

const MarkdownOptions = {
  overrides: {
    table: {
      component: ({ children, ...props }) => (
        <div style={{ overflowX: 'auto' }}>
          <table {...props}>{children}</table>
        </div>
      ),
    },
    th: {
      component: ({ children, ...props }) => (
        <th {...props}>{children}</th>
      ),
    },
    td: {
      component: ({ children, ...props }) => (
        <td {...props} data-label={props['data-label']}>{children}</td>
      ),
    },
    blockquote: {
      component: ({ children, ...props }) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    a: {
      component: ({ children, ...props }) => (
        <a {...props}>{children}</a>
      ),
    },
    img: {
      component: ({ children, ...props }) => (
        <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
      ),
    },
  },
};

const MarkdownPage = () => {

  const csvUrl = 'https://docs.google.com/spreadsheets/d/170s7A5MI7ui-y9-eZhbw0f5pFUITySzzLcyDZsT0UC0/export?gid=0&format=csv';

  const markdownContent1 = `
A estrutura da IFMSA Brazil é composta por Diretoria Executiva, Coordenadores Regionais, Times Nacionais, Coordenadores Nacionais de Programas, Comitês Locais (escolas médicas filiadas), Coordenadores Locais (estudantes de medicina filiados), Alumni, Conselho Supervisor e Comissão de Reforma e Elaboração de Documentos.

## Diretoria Executiva Nacional

A Diretoria Executiva é composta por 21 cargos a nível nacional, responsável por:

- Captar recursos e finanças;
- Gerir o marketing e relações externas;
- Administrar, desenvolver e apoiar os Comitês Locais;
- Desenvolvimento de atividades centrais em seis principais campos da saúde:
  - Saúde pública;
  - Educação médica;
  - Saúde e direitos sexuais e reprodutivos incluindo HIV e AIDS;
  - Direitos Humanos e Paz;
  - Intercâmbios nacional e internacional clínico-cirúrgicos ou de pesquisa.

`;

const markdownContent2 = `
## Coordenação Regional

### O que fazem os Coordenadores Regionais?

Os Coordenadores Regionais prestam assistência à Diretoria Executiva em tarefas a nível regional; desenvolve competência de nossos eixos de atuação em Escolas Médicas de cada região; promove oportunidades, como Assembleias Regionais, espaços de representatividade de nossos coordenadores locais.

As Regionais da IFMSA Brazil são: Norte 1 (AC, RO, AM, RR), Norte 2 (PA, AP), Nordeste 1 (MA, PI, CE), Nordeste 2 (RN, PB, PE), Nordeste 3 (AL, SE, BA), Leste (MG, ES, RJ), Oeste (TO, GO, MT, MS), Paulista (SP), Sul (PR, SC, RS).
`;

const markdownContent3 = `
## Times Nacionais

Os Times Nacionais da IFMSA Brazil são divisões de suporte ao trabalho dos Diretores Nacionais e dos Coordenadores Regionais, tendo sua organização interna e funções específicas definidas caso a caso pelo Diretor Nacional responsável e também regionalizadas de acordo com as demandas dos comitês locais.

## Conselho Supervisor

O Conselho Supervisor supervisiona ações e decisões tomadas pela Diretoria Executiva e cria estratégias para garantir imparcialidade e objetividade em investigações internas.

## Conselho de Reforma e Elaboração de Documentos (CRED)

O Conselho de Reforma e Elaboração de Documentos é responsável por revisar documentos internos e promover reuniões com participação de todos os membros para definir alterações nesses documentos.

## Alumni

Os alumni são médicos filiados à IFMSA Brazil que foram Coordenadores Locais (membros de comitês locais) em suas instituições de ensino superior de origem.

### Como me tornar alumni?

É um processo interno que ocorre quando um Coordenador Local pede desfiliação ao Vice-Presidente para Assuntos Internos, declarando interesse em se tornar alumnus ou alumna da IFMSA Brazil. A partir disso, nosso Diretor Nacional de Alumni entrará em contato com o interessado, para que entenda seu novo papel.
`;

  return (
    <Root>
      <Title variant="h4">{'Estrutura da IFMSA Brazil'}</Title>
      <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent1}</Markdown>
        </MarkdownContainer>
        <Gallery csvUrl={csvUrl} />
        <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent2}</Markdown>
        </MarkdownContainer>
        <BrazilMap />
        <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent3}</Markdown>
        </MarkdownContainer>
     
    </Root>
  );
};

export default MarkdownPage;
