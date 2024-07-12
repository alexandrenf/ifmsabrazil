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

const Revista = () => {
  const markdownContent1 = `

A Brazilian Medical Students (BMS) é o periódico científico (ISSN: 2675-1542) da IFMSA Brazil. A Revista é composta por Editor in chief, Editores Associados, Corpo Editorial, Editor de Conteúdo e de Design, sendo esse grupo composto por acadêmicos de medicina e professores de diversas áreas. Seu objetivo principal é disseminar as produções acadêmicas dos estudantes de medicina e profissionais filiados ou não à IFMSA Brazil. O periódico aceita artigos na modalidade editorial, artigos originais, revisões, relatos de experiência tendo seu escopo constituído pelas seguintes temáticas: Saúde Coletiva, Educação, conhecimentos e mobilidade acadêmica, cuidados gerais com pacientes. Dessa forma, a revista preza pelos princípios da ciência aberta, da evidência científica e visando a responsabilidade social em pesquisa. 

**Email:** [bms@ifmsabrazil.org](mailto:bms@ifmsabrazil.org)

**Instagram:** [@bmsjournal](https://www.instagram.com/bmsjournal/)

**Site:** [bms.ifmsabrazil.org](https://bms.ifmsabrazil.org)


`;

  return (
    <Root>
      <Title variant="h4">{"Brazilian Medical Students"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Revista;
