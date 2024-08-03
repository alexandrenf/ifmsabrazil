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

const OutrosIntercambios = () => {
  const markdownContent1 = `

### BEACH PROJECT: 

O Brazil’s Exchange Assistance on Care and Hospitality (BEACH Project) objetiva ser o projeto que todos lembrarão quando o assunto for Social Programs. O BEACH tem em seu cerne um princípio que se destaca mais que todos os outros: a integração. Buscamos, para tanto, juntar pessoas das mais diversas culturas, desde a Welcome Party até o último dia. Isso potencializa a própria experiência de se fazer intercâmbio.

O incoming passa a não apenas entrar em contato com a cultura do nosso país e seus regionalismos, como também tem a oportunidade de submergir na cultura de uma miríade de outros países, que ele sequer poderia pensar em conhecer. Todo o modelo e todos os programas do BEACH Project são estruturados de forma a aproximar o maior número de pessoas, dando a elas uma experiência única, inerente a se fazer um intercâmbio pela IFMSA Brazil. 
Durante um final de semana, o seu comitê poderá receber intercambistas de vários países que vieram ao Brasil estagiar nas mais diversas regiões! Vocês montam a programação: parques, museus, praia, cachoeira, rodízio, pontos turísticos, caiaque, asa delta, o que sua cidade tiver a oferecer!

### GAP (Global Action Project):

Os Global Action Projects (GAP) da IFMSA são iniciativas voltadas para abordar questões de saúde pública por meio de pesquisa, envolvimento comunitário e educação, com foco em doenças endêmicas. Por meio do GAP Exchange, uma colaboração entre o comitê permanente de intercâmbio internacional de pesquisa(SCORE) e o comitê permanente em saúde pública(SCOPH), estudantes de medicina podem participar de 4 a 8 semanas em pesquisas e iniciativas de saúde comunitária. O programa inclui treinamento, trabalho de campo e pesquisa sobre doenças não transmissíveis (DCNTs) e doenças tropicais negligenciadas (DNTs), promovendo habilidades médicas, pensamento crítico e desenvolvimento de redes sociais e profissionais, promovendo reflexão acerca da comunidade em que o aluno é inserido bem como um entendimento completo sobre os princípios mais fundamentais da Saúde Pública. 

### Public Health Exchange (PHEX):

O PHEx é uma modalidade de intercâmbio que une o Comitê Permanente de Saúde Pública (SCOPH) e o Comitê Permanente de Intercâmbio Internacional Clínico-cirúrgico (SCOPE). O PHEx visa empoderar estudantes nos campos de saúde pública ao ganharem experiência prática neles, além de educar os estudantes sobre as diferentes abordagens na saúde global, internacional e pública.

Essa modalidade de intercâmbio pode ser feita em diversos lugares, como Departamentos/Secretarias de Saúde do Governo, Organizações Não Governamentais (ONGs), Hospitais e ambientes clínicos e outros. 

O PHEx tem duração de 4 ou 8 semanas e é um programa bilateral, devendo o estudante receber e fornecer hospedagem e alimentação. Além disso, é uma modalidade aberta a estudantes da saúde no geral.

### GoSCORP:
 GoSCORP é uma iniciativa que foi criada para impulsionar o SCORP (Comitê permanente de Direitos Humanos e Paz) para cumprir a sua missão de capacitar e motivar estudantes de medicina para promover ativamente os direitos humanos, para desenvolver ainda mais as suas capacidades, e para dar a oportunidade aos admiradores do SCORP, como comunidade, de se conhecerem e crescerem juntos.

 Os regulamentos do GoSCORP definem como um intercâmbio unilateral para membros da IFMSA focado na capacitação, trabalho voluntário e discussões sobre determinados temas ligados aos direitos humanos e à paz, a chamada para a sua realização é aberta duas vezes por ano.

 Essa modalidade de intercâmbio está intimamente ligada ao Capacity Building e o SCOPE (Comitê Permanente de Intercâmbio Internacional Clínico-cirúrgico) possui uma duração de 4 semanas e vários GoSCORPs podem ser realizados no mesmo ano, em 2 períodos e qualquer National Member Organization (NMO) ligada a IFMSA pode aplicar para sediar o GoSCORP.


### SCORA X-Change:

O SCORA X-Change é uma iniciativa de mobilidade estudantil independente e focada em Saúde e Direitos Sexuais e Reprodutivos promovida pela IFMSA e que conta com certificação internacional. Todo ano ocorrem duas temporadas: a primeira costuma ter inscrições em Março e ocorre entre os meses de Junho a Novembro e a segunda costuma ter inscrições em Setembro e ocorre entre os meses de Dezembro e Maio. Para se inscrever, basta ser um coordenador local da IFMSA Brazil, escrever seu currículo (relacionado à Saúde e aos Direitos Sexuais e Reprodutivos), sua carta de motivação e assinar o Candidature Form! 

De forma geral, o programa de imersão pode durar de 3 a 4 semanas e sempre incluirá, no mínimo, um welcome kit, a hospedagem no período oficial de intercâmbios, uma refeição por dia, o transporte entre o local de hospedagem e o local das sessões, estágios e de outras atividades oficiais. Além disso, são organizados social programs em 4 dias de cada semana e eles podem ou não estar inclusos na taxa de inscrição. 

Vale lembrar que qualquer país membro da IFMSA pode submeter uma proposta dentro das regulamentações internacionais e ser aprovado pelo time internacional. Assim, os destinos variam em cada temporada e cada país tem a liberdade de definir sua programação, qual será a taxa e o que será incluso nela (apenas os itens obrigatórios citados no parágrafo anterior ou algo extra), como será a hospedagem (amiga, hotel, airbnb, alojamento e etc), se valorizará mais a análise de currículo ou da carta de motivação para selecionar os participantes e também quais são os seus pré-requisitos. Portanto, sempre leia com atenção o survival kit de cada país na temporada que te interessa! 

A IFMSA Brazil já organizou 4 SCORA X-Changes (São Paulo - 2018 e 2019; Aracaju - 2023; Curitiba - 2024) e diversos coordenadores locais são aprovados para participar dos programas de imersão promovidos por outros países, conte com o nosso apoio para organizar essa experiência ou para realizar o sonho de ser aprovado para o intercâmbio no país-sede que deseja.

Para mais informações ou interesse em organizar um SCORA X-Change, envie um email para [nora@ifmsabrazil.org](mailto:nora@ifmsabrazil.org).

`;

  return (
    <Root>
      <Title variant="h4">{"Outras Modalidades de Intercâmbios"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default OutrosIntercambios;
