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

const AcoesETematicas = () => {
  const markdownContent1 = `

Anualmente, temos centenas de atividades promovidas pelos comitês locais da IFMSA Brazil, seja almejando a promoção e educação em saúde às comunidades, seja com o objetivo de reiterar a importância de uma educação médica de qualidade.

É, também, por meio dessas atividades que os coordenadores locais filiados à Federação fazem a diferença!

Nesse sentido, as temáticas de atuação são pautadas em nossos Programas, que são fluxos centralizados das atividades, os quais conectam nossas ações aos valores de humanização, equidade e cidadania. Dessa forma, a seguir, estão brevemente descritos cada um dos 17 Programas da IFMSA Brazil:

1.	**Acesso Não Discriminatório à Saúde:** O proposito desse programa é  reduzir o estigma e a discriminação dirigida às populações vulneráveis ou marginalizadas, tanto na saúde e na sociedade, com o objetivo de reduzir as inequidades na saúde e aumentar o acesso a saúde para todos.
2.	**Construção do Currículo e Carreira Médica:** O Programa de Construção do Currículo e Carreira Médica busca, por diversos meios, difundir e aprimorar o ensino médico por meio de conteúdos incluídos ou não na grade curricular padrão. Busca-se também abordar temas a respeito do futuro profissional e distintas abordagens da carreira médica em si.
3.	**Doenças Crônicas Não Transmissíveis e Estilos de Vida Saudáveis:** Os estilos de vida saudáveis são um conceito amplo que envolvem vários aspectos, combinando-se para influenciar a saúde individual tanto física, social quando mental. Tendo em vista que esses estilos de vida pouco saudáveis são os principais fatores de risco para as DCNTs e que estas são responsáveis por um percentual relevante da taxa de mortalidade da população, este programa foi desenvolvido com o intuito de incentivar os coordenadores locais a trabalharem ativamente na redução desse fato através da promoção e educação na saúde.
4.	**Educação Sexual Compreensiva:** Tendo em vista a necessidade de se trabalhar a Educação Sexual, de modo a contrapor o estigma, o tabu que este tema carrega, o programa de Educação Sexual Compreensiva tem como parte de seus objetivos, debater, ensinar e conscientizar a população acerca desses aspectos a fim de prover saúde em todas as suas instâncias ao evitar o abuso sexual, a propagação de IST's e a gravidez indesejada.
5.	**Ética e Direitos Humanos em Saúde:** Ética e direitos humanos são de fundamental importância para uma convivência pacífica e harmoniosa entre as pessoas de todo o mundo. Além disso, são guias para a prática médica digna e justa, assim o programa de Ética e Direitos Humanos em Saúde trabalha com situações de vulnerabilidade de direitos humanos além de capacitar estudantes para tomar decisões que concernem ao tratamento, abordagem e intervenções ao paciente pautadas em princípios éticos, bem como advogar pelo seu paciente com base nesses aspectos.
6.	**Habilidades e Práticas Clínico Cirúrgicas:** Embora a educação médica deva fornecer a cada futuro médico conhecimentos adequados, habilidades e atitudes para o trabalho para logo após a formatura, na realidade, muitas vezes isso não ocorre, e grandes lacunas se instalam. Diante disso, o programa visa dar subsídios para melhorar o ensino de habilidades práticas nas universidades de medicina abrangendo atividades como workshops, cursos, congressos e outros que contenham momento prático ou atividades teóricas voltadas para o ensino de habilidades práticas.
7.	**HIV, AIDS e outras ISTs:** O programa tem como principais focos a conscientização da população acerca de ISTs, a consolidação do conhecimento médico sobre infectologia e a quebra dos estigmas da sociedade em relação a essas doenças. As ações dentro desse programa trazem a discussão sobre o tema para dentro da sociedade buscando combater tabus ou preconceitos.
8.	**Recursos Humanos e Humanização em Saúde:** O Programa apresenta duas frentes, sendo baseado, principalmente, na Política Nacional de Humanização (HumanizaSUS) criada em 2003 e tem o objetivo de receber atividades com foco na Humanização do Cuidado, ou seja, ações que fomentem o entendimento do ser humano de forma holística, como ser biopsicossocioespiritual e também Gestão de Pessoas da Saúde, isto é, o manejo dos trabalhadores da saúde.
9.	**Meio Ambiente, Saúde e Desenvolvimento Sustentável:** O programa visa trazer à luz discussões acerca de como as alterações no meio ambiente impactam na epidemiologia local e como o desenvolvimento sustentável vem como uma forma de atenuar esses efeitos deletérios, suprindo as necessidades atuais, sem comprometer as necessidades das gerações futuras. Além disso o programa também engloba temáticas importantes como saúde planetária, One health, mudanças climáticas, dentre outros temas.
10.	**Saúde e Direito da Criança e do Adolescente:** O programa de Saúde e Direitos da Criança e do Adolescente é muito amplo que é composto por atividades relacionadas a demandas que envolvam o publico  infantil ou juvenil. Considerando que crianças e adolescentes são grupos vulneráveis que necessitam de cuidados e assistência diferenciados, este programa é proposto para incentivar os coordenadores locais na proteção da saúde e dos direitos das mesmas.
11.	**Saúde Materna e Acesso ao Aborto Seguro:** O programa aborda 2 temáticas muito importantes dos direitos reprodutivos, pois assim como a ocorrência da maternidade é um componente do direito reprodutivo, a sua interrupção também é uma discussão existente devido a autonomia individual. Assim o programa abrange diversos aspectos da saúde da mulher, desde sua autonomia como indivíduo até seus direitos como mãe, com a devida manutenção de sua saúde antes, durante e após esse período.
12.	**Saúde Mental:** A saúde mental é um tema que deve ser sempre debatido dentre seus vários aspectos, tanto como estudantes, médicos, e também enquanto pacientes! É justamente essa a ideia do programa, trabalhar desde práticas integrativas, técnicas de relaxamento, debates acerca da saúde mental do estudante de medicina, depressão, desordens psiquiátricas, transtornos alimentares, dentre outras temáticas.
13.	**Sensibilização à Doação de Órgãos, Tecidos e Medula:** A sensibilização envolvida para encontrar novos doadores necessita de um amplo suporte que envolva ações, estratégias e projetos que se insiram no contexto em que são realizados, com o devido planejamento e monitoramento dessas iniciativas. Nesse contexto, o programa tem como objetivo geral melhorar os indicadores nacionais voltados para essa temática.
14.	**Sexualidade e Identidade de Gênero:** O programa busca trabalhar em suas atividades as variantes na identidade de gênero a partir de várias instâncias: a aquisição da identidade de gênero primária, o aprendizado dos papéis sexuais, o vasto campo da sexualidade e as novas questões referentes à reprodução humana.
15.	**Sistemas de Saúde:** O programa propõe a intervenção frente aos diferentes atores atuantes no cenário do sistema de saúde brasileiro – profissionais de saúde, equipes administrativas e usuários. Ademais, o programa engloba inúmeras abordagens possíveis de assuntos, como aqueles que envolvem a saúde pública e a vivência em diferentes sistemas de saúde.
16.	**Valorização da Diversidade e Luta Contra o Preconceito:** O programa buscar empoderar os estudantes para que eles possam advogar acerca das temáticas, e que façam isso nos mais diversos ambientes, como atuando na luta antirracista, no combate a LGBTQI+fobia, na valorização de povos indígenas, na inserção no sistema de refugiados e imigrantes, no acolhimento de pessoas especiais, nos cuidados com os idosos, e nos vários outros conteúdos, os quais contribuem para sua formação de forma positiva e o faça ter a humanização como algo fundamental para sua atuação e preparo como futuro profissional da saúde.
17.	**Violência de Gênero e Empoderamento Feminino:** Violência de gênero é a violência dirigida à uma pessoa baseada apenas em seu gênero. Assim o programa tem como objetivo lutar contra a violência de gênero e empoderar mulheres, abordando assuntos como: conscientização da população acerca dos tipos de violência,  estimular a denúncia dos casos e o acolhimento das vítimas.


`;

  return (
    <Root>
      <Title>{"Ações e Temáticas"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default AcoesETematicas;
