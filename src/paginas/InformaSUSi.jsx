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

const InformaSUSi = () => {
  const markdownContent1 = `

A Informa SUSi é uma iniciativa do Comitê Permanente em Saúde Pública da IFMSA Brazil, encabeçada pelo Diretor Nacional de Saúde Pública e o Time Nacional de Saúde Pública. Ela não é uma revista indexada ou que garante certificado, apenas uma iniciativa de divulgação em tópicos interessantes para a saúde coletiva brasileira, ela é composta por três seções fundamentais: notícias em saúde pública, artigos de opinião em saúde pública e atividades em saúde pública. 

Começando durante a pandemia com edições mensais, a Informa SUSi hoje se transformou numa revista de lançamento trimestral, acompanhando o calendário de relatórios dos comitês locais.

Apesar de não fornecer certificado, a publicação na Informa SUSi aumenta a visibilidade do comitê local e do coordenador local escritor, permitindo um compilado do que há de melhor em saúde pública na nossa federação! =)


`;

  return (
    <Root>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default InformaSUSi;
