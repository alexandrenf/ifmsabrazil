import React from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Loading from "../components/Loading.jsx";
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

## O que é a IFMSA?

A IFMSA é a maior organização estudantil do planeta. Com mais de 1 milhão de estudantes de medicina em 129 países, tem sua visão e valores propagados por diversas Organizações Nacionais de Membros, incluindo a IFMSA Brazil, que foi a primeira associação filiada à IFMSA na América Latina.

## O que é a IFMSA Brazil?

A IFMSA Brazil (International Federation of Medical Students’ Associations of Brazil, traduzida para Federação Internacional das Associações de Estudantes de Medicina do Brasil) foi fundada em 1991 na Universidade Estadual de Londrina. Atualmente, estamos presentes em mais de 200 escolas médicas em todas as regiões brasileiras e atuamos em diversos eixos incluindo humanização, ciência e produção científica, promoção de saúde, educação médica, intercâmbios, representatividade estudantil, treinamentos e vários outros.


## Missão, Visão e Valores

### Missão

Nossa missão é reunir e capacitar estudantes de medicina para debater, atuar e liderar em iniciativas acerca de prevenção e promoção à saúde, qualificada e equânime, de acordo com os direitos humanos, promovendo um impacto positivo na sociedade. Permitir aos alunos a troca de experiências nacionais e internacionais, que agreguem novos conhecimentos, promovam respeito à diversidade e compreensão da realidade médica local e global.

### Visão

Ser referência na formação de estudantes de medicina mais humanizados, com o objetivo de promover saúde e melhoria social.

### Valores

Humanização; União; Ética; Equidade; Cidadania.

## Quem representamos?

A IFMSA Brazil representa seus Coordenadores Locais e Alumni filiados e se posiciona a partir de deliberações em suas Assembleias Gerais. Contudo, para se organizar internamente e viabilizar uma adequada gestão de seus membros, também elege representantes voluntários da Federação.

Somos uma instituição supra-partidária, ou seja,  não endossa propostas partidárias ou ideológicas sistemáticas, e não é definível por “direita” ou “esquerda”. Nossa comunidade de filiados congrega as mais diversas escolas de pensamento, assegurando o contraditório como ferramenta  para a construção de consensos adequados, caso a caso.

`;

  return (
    <Root>
      <Title variant="h4">{"Estrutura da IFMSA Brazil"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Estrutura;
