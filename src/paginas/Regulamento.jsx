import React from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
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

const Regulamento = () => {
  const markdownContent1 = `

  ### Sumário
1. [Sobre o regulamento](#sobre-o-regulamento)
2. [Sobre os comitês permanentes de intercâmbio](#sobre-os-comites-permanentes-de-intercambio)
    1. [Comitê Permanente em Intercâmbio Internacional Clínico Cirúrgico (SCOPE)](#comite-permanente-em-intercambio-internacional-clinico-cirurgico-scope)
    2. [Comitê Permanente em Intercâmbio Internacional de Pesquisa (SCORE)](#comite-permanente-em-intercambio-internacional-de-pesquisa-score)
    3. [Comitê Permanente em Intercâmbio Nacional (SCONE)](#comite-permanente-em-intercambio-nacional-scone)


Nessa página, vamos explicar sobre como funciona o regulamento e cada um dos comitês permanentes de intercâmbio que a IFMSA Brazil oferece.

  ## Sobre o regulamento

  O Regulamento Oficial de Intercâmbios é um documento que determina as regras e critérios dos Período de Intercâmbio Nacional (PIN) e Período de Intercâmbio Internacional (PI) vigentes os quais são os processos de intercâmbio em si. A leitura do regulamento deve ser feita por todos os interessados em se tornar intercambistas pela IFMSA Brazil, pois é nele que estarão as informações necessárias sobre inscrição, hospedagem, taxas, prazos e certificação.
  
**Links para o regulamento podem ser encontrados em Mídias e Documentos, [clicando aqui](/arquivos/regulamento).**

  ## Sobre os comitês permanentes de intercâmbio

  ### Comitê Permanente em Intercâmbio Internacional Clínico Cirúrgico (SCOPE)
  
  ** A sigla em inglês para SCOPE é _Standing Committee on Professional Exchange_. **

  O Programa de Intercâmbio Profissional é uma experiência educacional e cultural organizada por estudantes de medicina com a ajuda de instituições médicas ao redor
  do mundo. Estudantes de medicina têm a oportunidade de participar de um estágio não
  assalariado no exterior durante 4 (quatro) semanas, esse estágio pode ser pré-clínico, definido pela rotação de um estudante em um departamento pré-clínico em uma faculdade, escola de Medicina ou hospital ou  clínico, definido pela rotação de um estudante em um departamento clínico de um hospital ou clínica, ou no consultório de um médico.
  
  ### Comitê Permanente em Intercâmbio Internacional de Pesquisa (SCORE)

  ** A sigla em inglês para SCOPE é _Standing Committee on Research Exchange_.**

  O Programa de Intercâmbios de Pesquisa é uma experiência educacional e cultural organizada por estudantes de medicina com a ajuda de instituições médicas ao
  redor do mundo. Estudantes de medicina têm a oportunidade de participar de um estágio não assalariado no exterior durante o período de no mínimo 4 semanas e máximo de 8 semanas, esse  estágio de pesquisa será definido pela rotação de um estudante em um ou mais projetos de pesquisa, podendo esse estágio ser realizado em uma faculdade, escola de medicina ou hospital. Existem 4 modalidades de pesquisa: Pesquisa Básica, Pesquisa clínica com laboratório, Pesquisa clínica sem laboratório e GAP Project, desenvolvido em parceria com o qual envolve doenças endêmicas e pesquisa de campo.
  
  ### Comitê Permanente em Intercâmbio Nacional (SCONE)

  ** A sigla em inglês para SCOPE é _Standing Committee on National Exchange_.**

  O Programa de Intercâmbio Nacional é uma experiência educacional e cultural organizada por estudantes de medicina com a ajuda de instituições médicas
  localizadas no Brasil. Os estudantes de medicina têm a oportunidade de participar de
  um intercâmbio não remunerado no Brasil durante 2, 3 ou 4 semanas. O intercâmbio nacional prevê a mobilidade estudantil nessas categorias: clínico-
  cirúrgico, pesquisa, programas de vivências, programa de imersão em atividades e
  programas socioculturais. 

  - **Clínico-cirúrgico:** rotação de um intercambista em um departamento clínico e/ou cirúrgico de um hospital, clínica e/ou consultório de um médico.
  - **Pesquisa:** acompanhamento acadêmico voltado para auxílio e conhecimento de projetos e pesquisas.
  - **Programas de vivências:** participação do estudante de medicina em um estágio programado que visa experiências em realidades atípicas presentes no Sistema Único de Saúde de cada regional
  e/ou parcerias com organizações de cunho social.
  - **Programa de imersão em atividades:** é definido pela
  participação de um intercambista em cronogramas de atividades temáticas voltadas para os eixos principais do SCORP e do SCORA. Nessa modalidade poderá ou não ter a presença
  de estágios em hospitais, clínicas e/ou demais locais.
  - **Programas socioculturais:** imersão de intercambistas nas realidades ecológicas, culturais, históricas e turísticas. 
  
  

  

`;

  return (
    <Root>
      <Title variant="h4">{"Regulamento de Intercâmbio"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Regulamento;
