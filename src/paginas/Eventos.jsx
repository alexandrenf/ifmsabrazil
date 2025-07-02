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

const Eventos = () => {
  const markdownContent1 = `

### Sumário
1. [Assembleias Gerais](#assembleias-gerais)
2. [Assembleias Regionais](#assembleias-regionais)
3. [Workshops](#workshops)

São considerados eventos oficiais da IFMSA Brazil as Assembleias Gerais, Assembleias Regionais e Workshops.

## Assembleias Gerais

### Quais são seus propósitos?

- Inspirar futuras gerações de acadêmicos e médicos;
- Transformar seus participantes em líderes em saúde ao debater promoção de saúde, educação médica, humanização, mobilidade estudantil, criticidade e representatividade;

### O que são?

- Maior espaço deliberativo da IFMSA Brazil;

- Reuniões de delegados de Comitês Locais, Diretoria Executiva, Alumni e Observadores Externos de todo o país;

### Quais são as vantagens de participar?

Treinamentos, apresentação de trabalhos de pesquisa, sessões dinâmicas de aprendizado nos nossos eixos temáticos, representatividade, networking e participação ativamente das deliberações da IFMSA Brazil.

### Quando acontecem?

Semestralmente.

### Quem pode ir?

Estudantes e médicos que se sintam representados pela IFMSA Brazil.

### Como participar?

Os nossos filiados recebem o convite para as Assembleias Gerais através de e-mail. Para mais informações, entre em contato com a sua escola médica filiada ou então através de atendimento@ifmsabrazil.org para mais informações.

## Assembleias Regionais

### Quais são seus propósitos?

- Inspirar futuras gerações de acadêmicos e médicos a partir do conhecimento da realidade de suas respectivas regionais;

- Transformar seus participantes em líderes em saúde ao debater promoção de saúde, educação médica, humanização, mobilidade estudantil, criticidade e representatividade em suas respectivas realidades regionais.

### O que são?

A Assembleia Regional  é o evento que une nossos Comitês Locais de uma mesma Regional  – promovendo integração, inspiração, capacitação, e construção conjunta de conhecimento e habilidades. Além disso, busca oferecer treinamentos e capacity building aos nossos Coordenadores Locais, além de facilitar sessões voltadas às necessidades estruturais, às necessidades e à realidade em Saúde da Regional. Acreditando em capacitar estudantes de medicina e edificar, motivar e aperfeiçoar nossos Coordenadores Locais como verdadeiros Líderes em Saúde, esperamos que as Assembleias Regionais possam proporcionar momentos valiosos e inesquecíveis, e nos unir – cada vez mais próximos – em torno de um mesmo ideal.

### Quais são as vantagens de participar?

Treinamentos, apresentação de trabalhos de pesquisa, sessões dinâmicas de aprendizado nos nossos eixos temáticos, representatividade, networking.

### Quando acontecem?

Anualmente.

### Quem pode ir?

Estudantes e médicos que se sintam representados pela IFMSA Brazil pertencentes a cada regional.

### Como participar?

Os nossos filiados recebem o convite para as Assembleias Regionais através de e-mail. Para mais informações, entre em contato com a sua escola médica filiada ou então através de [atendimento@ifmsabrazil.org](mailto:atendimento@ifmsabrazil.org) para mais informações.

## Workshops:

Os workshops são uma imersão no universo do Capacity Building da IFMSA Brazil, onde os participantes entram em uma vivência intensa de capacitações. Os eventos podem ser para formação de treinadores em habilidades básicas, ou especializados em temáticas específicas que envolvem os comitês permanentes de atividades da Federação.

Alguns dos workshops da IFMSA que são realizados na IFMSA Brazil que formam treinadores:

- Training New Trainers (TNT)*
- Training Medical Education Trainers (TMET)*
- Training New Human Rights Trainers (TNHRT)*
- Training Public Health Trainers (TPHT)*
- Training National Exchange Trainers (TNET)*
- Training SRHR Trainers (TSRHRT)*


A IFMSA Brazil por sua vez desenvolveu um workshop na temática de publicação, pesquisa e extensão, na qual os Diretores Nacionais de Capacity Building e de Publicação, Pesquisa e Extensão trabalham juntos para estimular o crescimento do eixo entre os coordenadores locais e formar treinadores capazes de disseminar conhecimentos em pesquisa.

- Training New Research Trainers (TNRT)

Existem ainda workshops que servem apenas para capacitar os coordenadores locais, não sendo capazes de formar treinadores. Isso porque o conhecimento passado não é capaz de formar ou muitas vezes sendo um evento apenas de reciclagem de treinadores.

- Professional and Research Exchange Training (PRET)*
- International PEER Education Training (IPET)*
- Women's Reproductive Health and Access to Safe Abortion Training (Ipas)*
- Public Health Leadership Training (PHLT)*
- Human Rights for Medical Practitioners (HRMP)*
- Training Advanced Trainers (TAT)
- Training Old Trainers (TOT)
- Simulação da OMS

Os eventos acima contam pelo menos 24 horas de treinamentos, divididas em 3 ou 4 dias. Suas agendas variam de acordo com a temática do evento e organização dos treinadores selecionados para facilitarem o evento.


`;

  return (
    <Root>
      <Title>{"Eventos e Workshops"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Eventos;
