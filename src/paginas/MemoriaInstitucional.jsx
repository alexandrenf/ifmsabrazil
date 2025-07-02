import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import Loading from "../components/Loading.jsx";
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

const MemoriaInstitucional = () => {
  const markdownContent1 = `

A International Federation of Medical Students' Association (IFMSA) foi uma das diversas organizações estudantis internacionais que surgiram após o término da Segunda Guerra Mundial, em um contexto no qual as nações buscavam entendimento mútuo para evitar a eclosão de novos conflitos.

Criada em maio de 1951, em Copenhagen, contava inicialmente apenas com representações europeias. A primeira associação latino-americana a integrar a IFMSA foi a International Federation of Londrina Medical Students (IFLMS), fundada em 1991 por estudantes da Universidade Estadual de Londrina (UEL).

A IFLMS surge com o intuito de proporcionar aos estudantes de medicina oportunidades de mobilidade estudantil e integração com acadêmicos de outras realidades. Logo em seu primeiro ano, em 1992, sedia a 41ª Global Assembly da IFMSA, reunindo centenas de estudantes de todo o mundo na cidade do norte paranaense.

Com o sucesso da iniciativa, mais universidades ingressam à IFLMS, e o
projeto se expande, não mais se restringindo apenas aos intercâmbios. São
criados, então, os dois primeiros Comitês Permanentes de atividades: SCOPH
(Saúde Pública) SCORA (Saúde Reprodutiva e Direitos Sexuais) - destinados a
promover projetos, eventos e campanhas direcionadas a estes tópicos.

No final de 2006, junta-se a estes o SCORP (Direitos Humanos e Paz),
inspirado na experiência da IFMSA, que possuía dois Comitês Permanentes
exclusivamente dedicados a dar suporte a refugiados de guerra (SCOR –
Standing Committee on Refugees) e arbitrar conflitos e promover a paz global
(SCOMPE – Standing Committee on Medicine for Peace).

Por fim, em 2009, é criado o último Comitê Permanente de atividades, o
SCOME (Educação Médica), voltado à promoção de projetos e discussões que
melhorem o ensino e a prática da medicina no país. Deste modo, a IFLMS se
consolidava como uma instituição com amplo espectro de atuação, porém sem
abandonar a sua vocação inicial.

Por isso, os Comitês Permanentes de intercâmbios – SCOPE (intercâmbio
acadêmico-profissional) e SCORE (intercâmbio de pesquisa) -, existentes
desde a fundação, seguiam em franco crescimento. E, em 2008, a IFLMS 
inaugura o SCONE, um Comitê Permanente focado em mobilidade estudantil
dentro do país.

O SCONE foi uma iniciativa inovadora; um projeto original e ousado. Organizar
intercâmbios de forma independente em um país de dimensões continentais
era uma missão difícil, cuja organização surpreendeu as associações da
IFMSA.

A partir de então, não era mais possível circunscrever a IFLMS – que já
contava com Comitês Locais instalados em diversos estados, e promovia
intercâmbios por todo Brasil -, à cidade de Londrina. Assim foi proposta e
aprovada a mudança de nome da instituição em 2009, na August Meeting da
IFMSA na Macedônia, quando a IFLMS passou formalmente a se chamar
IFMSA Brazil.

Desde então, o escopo da IFMSA Brazil tem sido ampliado progressivamente,
a partir das iniciativas e das demandas de seus Coordenadores Locais. Em
2016, pela necessidade de levar a voz dos estudantes aos tomadores de
decisão, em um cenário de inúmeras mudanças na educação médica brasileira,
fundou-se o eixo de representatividade.
Neste ano, uma grande reforma documental, que revisou dezenas de
Regimentos Internos, agrupando-os em um único Regimento Geral, e removeu-
se oficialmente do estatuto o termo "instituição apolítica", substituindo-o por
"suprapartidária".

A mudança conceitual repercutiu na prática, e a IFMSA Brazil conquistou, neste
período, sua primeira titularidade em uma comissão do Conselho Federal de
Medicina – a Comissão de Elaboração do Código de Ética do Estudante de
Medicina. Após um ano, em 2017, já eram 5 as cadeiras ocupadas pela
instituição no CFM, e diversas outras interlocuções foram firmadas, com órgãos
governamentais e não governamentais.

Além da representatividade estudantil, outros eixos se consolidaram na última
década. Também em 2016, foi lançada a primeira edição da Brazilian Medical
Students Journal (BMS) – um periódico científico editado pelos Coordenadores
Locais da IFMSA Brazil, indexado desde 2021.

A BMS promove a ciência aberta e dá oportunidade aos estudantes de
medicina para que possam ingressar na produção científica e compreender
melhor o processo de revisão por pares. A revista compõe uma série de
iniciativas que têm atraído milhares de acadêmicos, interessados no eixo de
pesquisa.

No decorrer de décadas, a IFMSA Brazil se tornou paulatinamente uma
instituição mais plural e completa, abrangendo novos e mais ambiciosos
desafios, que fizeram a diferença na sociedade e na formação de milhares de
acadêmicos.

`;

  return (
    <Root>
      <Title>{"Memória Institucional"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default MemoriaInstitucional;
