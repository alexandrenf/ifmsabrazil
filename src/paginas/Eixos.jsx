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

const Eixos = () => {
  const markdownContent1 = `

  ### Sumário
1. [Mobilidade Acadêmica](#mobilidade-academica)
2. [Educação Médica](#educacao-medica)
3. [Pesquisa](#pesquisa)
4. [Promoção de Saúde](#promocao-de-saude)
5. [Humanização](#humanizacao)
6. [Construção de Habilidades](#construcao-de-habilidades)
7. [Representatividade Estudantil](#representatividade-estudantil)

### Mobilidade Acadêmica:

Com a visão de formar estudantes de medicina mais humanizados e culturalmente competentes, a  IFMSA Brazil tem como uma de suas missões a organização de intercâmbios estudantis acessíveis, pelos quais enviamos e recebemos acadêmicos de medicina para estágios tutorados o ano todo. Ofertamos vagas Nacionais e Internacionais, para diversas modalidades de intercâmbios, como clínico-cirúrgico, pesquisa, entre outras vivências no eixo de saúde pública. A federação reúne neles a integração entre os estudantes e escolas médicas do próprio país, bem como a troca de experiências e de conhecimento com culturas estrangeiras. Por isso, a IFMSA Brazil trabalha há mais de 30 anos com empenho para oferecer aos estudantes de medicina da nação mais uma de suas ações que fazem a diferença: a possibilidade de realizar estágios em seus 26 estados mais o distrito federal, e em mais de 50 países.

Por meio dos intercâmbios, além de transformar sonhos em realidade, os estudantes conhecem realidades distintas das quais vivem e, portanto, conseguem uma visão mais ampla e inclusiva sobre globalização e saúde global. Seja no Brasil, seja no exterior, o fluxo de experiências e culturas expande não só a dimensão intelectual, mas também a moral, contribuindo na formação de indivíduos mais compassivos e tolerantes. Além disso, a atuação profissional, as oportunidades curriculares e a independência desses alunos são grandemente beneficiadas pelas experiências vivenciadas no estágio durante 2 a 4 semanas em outra cidade ou país. Estas, quando compartilhadas com amigos e docentes, fazem com que missão e compromisso da IFMSA Brazil com a educação médica sejam espalhadas Brasil e mundo.

Para mais informações, contate o Coordenador Local de Intercâmbios da sua faculdade, ou mande um email para [intercambios@ifmsabrazil.org](mailto:intercambios@ifmsabrazil.org).


### Educação Médica:

Educação Médica é um eixo interdisciplinar, caracterizado por seu caráter explorador, questionador e inovador. Atua abrangendo desde as lacunas curriculares até a iluminação de tópicos essenciais para a formação dos acadêmicos. Seu objetivo é construir currículos plenos que englobem as dimensões formal, informal e oculta.

No entanto, este eixo não se limita apenas à formação técnica e não técnica do profissional de saúde. Ele busca também a compreensão das relações e metodologias de ensino e aprendizado, a reflexão sobre as circuntâncias do ambiente universitário - como saúde mental e humanização, e promoção de um engajamento estudantil significativo no ambiente de ensino e na comunidade que está inserido. As evidências e inovações em educação na saúde permitem uma atualização contínua e embasada cientificamente, e estão intrínsecas a todos esses processos educativos.

A Educação Médica deve, ainda, buscar a integração entre ensino-serviço-gestão e comunidade, de forma a atender as demandas dos usuários do serviço de saúde daquela região, considerando seu contexto sócio-político-econômico e seus determinantes sociais de saúde. Assim, ela procura formar profissionais capazes de atuar de maneira crítica, reflexiva e embasada cientificamente, comprometidos com a transformação social e a promoção da saúde em suas diversas dimensões. Os estudantes devem ser preparados não apenas com as habilidades, conhecimentos e atitudes necessárias para o desenvolvimento de determinadas competências, mas também devem ser socialmente conscientes e engajados, tornando-os capazes de responder e intervir nas necessidades complexas, diversas e dinâmicas da sociedade contemporânea.


###Pesquisa:

O eixo de Publicação, Pesquisa e Extensão visa proporcionar bases de evidência científica às atividades desenvolvidas pela federação. O eixo é alicerçado em três principais bases, sendo a primeira delas a promoção de acesso à pesquisa e educação em pesquisa através de capacitações, cursos e espaços abertos para discussões prezando sempre pela medicina baseada em evidência e pela reprodução de uma ciência de qualidade, também é fundamentado pela produção de evidência científica através das pesquisas e projetos promovidos pelo Scientific Team e pelos Coordenadores Locais, sempre prezando pela responsabilidade social e pelo envolvimento significativo da comunidade acadêmica ou civil, de acordo com a abordagem. Além disso, a representatividade é indissociável do eixo visto que proporciona voz a federação no que tange a construção de conhecimento dentro desta, ademais por meio da nossa Revista Científica Brazilian Medical Students podemos disseminar as atividades e construções sociais realizadas pela IFMSA Brazil em abrangência nacional e internacional.

### Promoção de Saúde: 

Para além de preparar os estudantes para enxergar a importância da saúde pública, é fundamental prepará-los para enxergar as reais necessidades das pessoas que assistem para que a promoção de saúde seja efetiva. Pensando nisso, promovemos e incentivamos ações que capacitam os estudantes de medicina para escutar e acolher as pessoas que os cercam de forma integral, ultrapassando os limites impostos pelos tabus sociais quanto à saúde sexual e reprodutiva - tópico comumente pouco abordado em consultas médicas.

Ademais, temos capacitações e materiais de apoio nacionais que preparam nossos coordenadores locais para compreender mais profundamente e advogar pela importância da educação sexual compreensiva, do acesso ao aborto seguro, do combate à violência de gênero e de outras causas sociais que contribuem para o avanço na conquista de direitos sexuais e reprodutivos que assegurem cidadania e acesso à saúde de forma equitativa para pessoas de qualquer sexo, identidade de gênero e orientação sexual.

### Humanização:

A Humanização está intrinsecamente ligada à existência dos Direitos Humanos e como os estudantes de medicina podem utilizar esse conhecimento teórico para melhorar a prática médica. Nós enxergamos um mundo onde todos os indivíduos devem possuir completo e equalitário acesso aos seus direitos humanos, incluindo estudantes de medicina e trabalhadores da saúde, que são fundamentais na luta para ajudar as pessoas em situação de vulnerabilidade. Dessa forma, incentivamos o empoderamento e motivamos os estudantes de medicina para promoverem e protegerem ativamente os Direitos Humanos e a Paz, apresentando aos membros diferentes formas de ação humanitária, por meio de capacity building, ações locais, advocacy e cooperação com entidades externas.


### Construção de Habilidades:

O Capacity Building é a coluna vertebral da IFMSA Brazil, uma vez que se mostra presente nas diferentes áreas de atuação. A capacitação em habilidades como liderança, produtividade, comunicação, trabalho em equipe, dentre diversas outras, é a sua principal função, a fim de formar Coordenadores Locais aptos a fazerem a diferença.

É parte da missão da IFMSA Brazil contribuir para a formação médica plena e, em especial para o contexto brasileiro, aplicar metodologias de aprendizagem para otimizar a gestão de recursos e cuidados em saúde.

Esta proficiência repercute também institucionalmente, ao contribuir para a boa administração dos Comitês Locais, e individualmente, aperfeiçoando práticas cotidianas que potencializam a qualidade de vida pessoal e acadêmica dos membros filiados.

Para tanto, é utilizada a estrutura internacional de multiplicação de conhecimentos da IFMSA e também da IFMSA Brazil. Novos treinadores são produzidos em eventos supervisionados denominados Workshop de Formação e tutorados por treinadores experientes, para prepará-los a atuarem localmente na facilitação do desenvolvimento de habilidades de demais acadêmicos.

O sistema de formação é continuado, preservando o sistema de membros, novos treinadores e treinadores experientes, partindo de encontros regionais e nacionais para globais, ampliando progressiva e sustentavelmente as possibilidades de atuação do treinador, bem como oportunidades em educação com seus pares.

### Representatividade Estudantil:

`;

  return (
    <Root>
      <Title variant="h4">{"Eixos de Atuação"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Eixos;
