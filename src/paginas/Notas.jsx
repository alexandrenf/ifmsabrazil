import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import MarkdownContent from "../components/MarkdownContent.jsx";

const Root = styled(Container)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
});

const Title = styled("h1")({
  color: "#00508C",
  marginBottom: "16px",
  fontWeight: "bold",
  textAlign: "center", // Center the title
});

const Revista = () => {
  const markdownContent1 = `

Nota Oficial é a ferramenta pela qual a IFMSA Brazil pode se expressar à sociedade a respeito de acontecimentos específicos, não contemplados total ou parcialmente pelas Declarações de Políticas vigentes, e cuja urgência demandada não permite discussão ampla para deliberação de posicionamento em plenária de Assembléia Geral.


`;

  return (
    <Root>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Revista;
