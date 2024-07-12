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

Mobilidade Acadêmica:
Português:
Com a visão de formar estudantes de medicina mais humanizados e culturalmente competentes, a  IFMSA Brazil tem como uma de suas missões a organização de intercâmbios estudantis acessíveis, pelos quais enviamos e recebemos acadêmicos de medicina para estágios tutorados o ano todo. Ofertamos vagas Nacionais e Internacionais, para diversas modalidades de intercâmbios, como clínico-cirúrgico, pesquisa, entre outras vivências no eixo de saúde pública. A federação reúne neles a integração entre os estudantes e escolas médicas do próprio país, bem como a troca de experiências e de conhecimento com culturas estrangeiras. Por isso, a IFMSA Brazil trabalha há mais de 30 anos com empenho para oferecer aos estudantes de medicina da nação mais uma de suas ações que fazem a diferença: a possibilidade de realizar estágios em seus 26 estados mais o distrito federal, e em mais de 50 países.
Por meio dos intercâmbios, além de transformar sonhos em realidade, os estudantes conhecem realidades distintas das quais vivem e, portanto, conseguem uma visão mais ampla e inclusiva sobre globalização e saúde global. Seja no Brasil, seja no exterior, o fluxo de experiências e culturas expande não só a dimensão intelectual, mas também a moral, contribuindo na formação de indivíduos mais compassivos e tolerantes. Além disso, a atuação profissional, as oportunidades curriculares e a independência desses alunos são grandemente beneficiadas pelas experiências vivenciadas no estágio durante 2 a 4 semanas em outra cidade ou país. Estas, quando compartilhadas com amigos e docentes, fazem com que missão e compromisso da IFMSA Brazil com a educação médica sejam espalhadas Brasil e mundo.
Para mais informações, contate o Coordenador Local de Intercâmbios da sua faculdade, ou mande um email para intercambios@ifmsabrazil.org .


Educação Médica:
texto, imagens e perguntas frequentes desta categoria

Educação Médica é um eixo interdisciplinar e com caráter explorador, questionador e também inovador. Trabalhando desde as lacunas curriculares até iluminando tópicos importantes para a formação dos acadêmicos, visa construir plenos currículos formais, informais e ocultos. Esse eixo objetiva melhorar para além da construção médica, enfatizando as relações de aprendizado e ensino, compreendendo a comunidade, seu contexto sócio-político-econômico e seus determinantes sociais em saúde.

Pesquisa:
texto, imagens e perguntas frequentes desta categoria

Português: 

O eixo de Publicação, Pesquisa e Extensão visa proporcionar bases de evidência científica às atividades desenvolvidas pela federação. O eixo é alicerçado em três principais bases, sendo a primeira delas a promoção de acesso à pesquisa e educação em pesquisa através de capacitações, cursos e espaços abertos para discussões prezando sempre pela medicina baseada em evidência e pela reprodução de uma ciência de qualidade, também é fundamentado pela produção de evidência científica através das pesquisas e projetos promovidos pelo Scientific Team e pelos Coordenadores Locais, sempre prezando pela responsabilidade social e pelo envolvimento significativo da comunidade acadêmica ou civil, de acordo com a abordagem. Além disso, a representatividade é indissociável do eixo visto que proporciona voz a federação no que tange a construção de conhecimento dentro desta, ademais por meio da nossa Revista Científica Brazilian Medical Students podemos disseminar as atividades e construções sociais realizadas pela IFMSA Brazil em abrangência nacional e internacional. 

Promoção de Saúde:
texto, imagens e perguntas frequentes desta categoria

Humanização:


Construção de Habilidades:
texto, imagens e perguntas frequentes desta categoria

O Capacity Building é a coluna vertebral da IFMSA Brazil, uma vez que se mostra presente nas diferentes áreas de atuação. A capacitação em habilidades como liderança, produtividade, comunicação, trabalho em equipe, dentre diversas outras, é a sua principal função, a fim de formar Coordenadores Locais aptos a fazerem a diferença.
É parte da missão da IFMSA Brazil contribuir para a formação médica plena e, em especial para o contexto brasileiro, aplicar metodologias de aprendizagem para otimizar a gestão de recursos e cuidado em saúde.
Esta proficiência repercute também institucionalmente, ao contribuir para a boa administração dos Comitês Locais, e individualmente, aperfeiçoando práticas cotidianas que potencializam a qualidade de vida pessoal e acadêmica dos membros filiados.
Para tanto, é utilizada a estrutura internacional de multiplicação de conhecimentos da IFMSA e também da IFMSA Brazil. Novos treinadores são produzidos em eventos supervisionados denominados Workshop de Formação e tutorados por treinadores experientes, para prepará-los a atuarem localmente na facilitação do desenvolvimento de habilidades de demais acadêmicos.
O sistema de formação é continuado, preservando o sistema de membros, novos treinadores e treinadores experientes, partindo de encontros regionais e nacionais para globais, ampliando progressiva e sustentavelmente as possibilidades de atuação do treinador, bem como oportunidades em educação com seus pares. 

Representatividade Estudantil:
`;

  return (
    <Root>
      <Title variant="h4">{"Ações e Temáticas"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Eixos;
