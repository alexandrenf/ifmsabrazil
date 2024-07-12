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

const AcoesETematicas = () => {
  const markdownContent1 = `

Os Social Programs são eventos de lazer promovidos em todos intercâmbios internacionais da IFMSA, incluindo os da IFMSA Brazil, com o propósito de integrar os intercambistas com alunos locais, além de apresentá-los às paisagens e à cultura local. Realizados durante o período do estágio, no Brasil eles são oferecidos por cada Comitê Local, podendo variar de acordo com o mês e a cidade em que o Incoming (Intercambista vindo de outro país ou comitê local) está inserido. Para que cada Incoming tenha a melhor experiência possível, não só durante o estágio mas durante toda sua estadia no país, a IFMSA Brazil atua a nível local, regional e nacional para a promoção dos Social Programs.

Na esfera local, cada comitê é incentivado a criar seu próprio Guia de Sobrevivência, contendo os melhores pontos turísticos de suas cidades, bem como dicas de restaurantes, festas e outras informações úteis, que ajudam o intercambista a ter mais autonomia. Além disso, nossos Coordenadores Locais de Intercâmbios são capacitados para tornar a experiência de seus Incomings a melhor possível, independente do comitê que foram aceitos, buscando realizar programas sociais quando possível.

Já na esfera regional,  nossos comitês são incentivados a se integrarem entre si, colocando os intercambistas de comitês diferentes em contato e organizando viagens para localidades próximas. Aproveitando, assim, o máximo que conseguirem das principais cidades e pontos que o Brasil tem a oferecer na região de seu intercâmbio. Dessa forma, mesmo que o estudante não tenha condições financeiras de viajar a localidades mais distantes no país, ele ainda pode aproveitar a viagem nas proximidades de seu estágio, além de conhecer locais e paisagens diferentes das armadilhas de turistas. 

Além dos Social Programs oferecidos pelos comitês locais da IFMSA Brazil, é oferecido um Social Program nacional a todos os incomings recebidos, o BEACH Project (Brazil's Exchange Assistance on Care and Hospitality Project), normalmente durante os meses de Julho e Agosto, nos quais recebemos mais intercambistas. O projeto possibilita que os estudantes conheçam um pouco mais da diversidade cultural brasileira de uma forma muito mais prática, divertida e muito mais barata. Desse modo, eles conseguem, no mesmo intercâmbio, conhecer diferentes regiões do Brasil, e experimentar um pouco dessas diferenças. Para tornar esse evento possível, são realizados acordos com hostels, clubes, e outros estabelecimentos para organizar a melhor viagem de 3 dias que o estudante poderia ter. A cada ano são selecionadas duas ou mais localidades para que os Incomings possam escolher o destino que mais lhe agrada e interagir com outros incomings da IFMSA Brazil. Por exemplo, em 2019, nossos Incomings podiam escolher entre São Paulo, Rio de Janeiro, Florianópolis, Curitiba, Fortaleza e Cuiabá! 

Para mais informações, contate o Coordenador Local de Intercâmbios da sua faculdade, ou mande um email para intercambios@ifmsabrazil.org .


`;

  return (
    <Root>
      <Title variant="h4">{"Social Programs"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default AcoesETematicas;
