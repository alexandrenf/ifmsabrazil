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

Declaração de Política, ou Policy Statement, é o instrumento pelo qual a IFMSA Brazil manifesta à sociedade seus posicionamentos e estratégias de intervenção relativas a pautas de abrangência nacional ou global, pertinentes aos seus Coordenadores Locais e consonantes aos seus eixos de atuação.

`;

  return (
    <Root>
      <Title variant="h4">{"Declarações de Política"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Revista;
