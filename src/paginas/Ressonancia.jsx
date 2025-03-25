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

Ressonância Poética é um periódico cultural de acesso aberto, ou seja, tem submissão e acesso gratuitos, é organizado por discentes, e tem intuito de celebrar a expressão artística por intermédio de artes dos seus pares. Dentre os seus valores, tem-se que  a valorização da pessoa, contemplando seus conhecimentos técnicos adquiridos na faculdade com extensão humanística de interesses e de habilidades. Acontece de maneira anual, com temáticas atuais e relevantes, aceitando submissões nas seguintes modalidades: prosa, poesia, fotografia e desenho.



`;

  return (
    <Root>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Revista;
