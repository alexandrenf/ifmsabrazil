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

A Brazilian Medical Students Journal (BMS), é um periódico científico eletrônico com e-ISSN 2675-1542, de acesso aberto tipo diamante, fundado pela IFMSA Brazil. Gratuito e de fluxo contínuo, o periódico possui uma edição por ano, e é editado por um conselho editorial composto por estudantes e professores da área da saúde, refletindo a visão e os objetivos da comunidade estudantil. A BMS reafirma o seu compromisso com a promoção da Ciência Aberta, e está empenhada em fomentar ativamente a disseminação de resultados de pesquisa, incentivando a prática da transparência científica.

A BMS se concentra em publicações na área da medicina, com ênfase em pesquisas originais e revisões de literatura em Saúde Pública e Global. Os manuscritos submetidos são avaliados quanto à sua relevância, rigor científico e contribuição para o campo da medicina. O público-alvo da BMS inclui estudantes da saúde, profissionais de saúde, pesquisadores e qualquer pessoa interessada em atualizações e discussões no campo da saúde.

A BMS é indexada em várias bases de dados e diretórios acadêmicos, garantindo ampla visibilidade e acessibilidade de seus artigos publicados. Como: Google Scholar, Diadorin, Latindex, LivRe, PKP, ResearchBib, Scite, Colorado Aliance, CiteFactor, Dimensions, BASE e Scientific Indexing Services.

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
