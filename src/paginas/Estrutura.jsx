import React from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Loading from "../components/Loading.jsx";
import Gallery from "../components/Gallery.jsx";
import BrazilMap from "../components/BrazilMap.jsx";
import MarkdownContent from "../components/MarkdownContent.jsx";

const Root = styled(Container)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
});

const Title = styled(Typography)({
  color: "#00508C",
  marginBottom: "16px",
  fontWeight: "bold",
  textAlign: "center", // Center the title
});

const Estrutura = () => {
  const markdownContent1 = `

  ## Nossa Composição

A estrutura da IFMSA Brazil é composta por:

- Diretoria Executiva (EB);
- Coordenadores Regionais (CRs);
- Times Nacionais;
- Coordenadores Nacionais de Programas (CNPs);
- Comitês Locais (LCs) → escolas médicas filiadas;
- Coordenadores Locais (CLs) → estudantes de medicina filiados;
- Alumni;
- Conselho Supervisor (SupCo);
- Comissão de Reforma e Elaboração de Documentos (CRED).

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
      <Title variant="h4">{"Estrutura da IFMSA Brazil"}</Title>
      <MarkdownContent content={markdownContent1} />
      <Gallery />
      <MarkdownContent content={markdownContent2} />
      <BrazilMap />
      <MarkdownContent content={markdownContent3} />
    </Root>
  );
};

export default Estrutura;
