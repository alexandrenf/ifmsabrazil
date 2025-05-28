import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Loading from "../components/Loading.jsx";
import ComiteLists from "../components/ComiteLists.jsx";
import axios from "axios";
import Papa from "papaparse";
import MarkdownContent from "../components/MarkdownContent.jsx";

const Root = styled(Container)(({ theme }) => ({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#00508C",
  marginBottom: "16px",
  fontWeight: "bold",
  textAlign: "center", // Center the title
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const Filiacao = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://api.ifmsabrazil.org/api/filiacao";
        const apiResponse = await axios.get(apiUrl); // First fetch the API to get the CSV URL
        const csvUrl = apiResponse.data.url; // Extract the CSV URL from the response

        const response = await axios.get(csvUrl); // Then fetch the CSV data from the extracted URL
        const parsedData = Papa.parse(response.data, { header: true });
        const realData = parsedData.data;
        setMembers(realData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markdownContent1 = `

## Como posso me filiar à IFMSA Brazil?

Para se filiar, é necessário que sua escola médica tenha um comitê local da IFMSA Brazil e manifestar seu interesse a ele.

## Como eu posso fundar um comitê local?

Basta mandar um e-mail para [vpi@ifmsabrazil.org](mailto:vpi@ifmsabrazil.org) contendo o nome da sua instituição de ensino, demonstrando interesse em fundar um comitê local.
Por lá, podemos começar um processo de filiação.
Confira essa página com atenção para ver as informações sobre a filiação!

## Como funciona o processo de filiação?

### Em cinco etapas!

- **Etapa I:** Você receberá alguns documentos sobre a IFMSA Brazil e será orientado a constituir um grupo de no mínimo 5 pessoas para dar seguimento.
- **Etapa II:** Um contrato de autorização deverá ser assinado pelo coordenador do curso e pelo grupo que foi formado por você juntamente com algumas informações essenciais sobre a faculdade.
- **Etapa III:** Consiste na deliberação da Diretoria Executiva Nacional sobre a viabilidade de, naquele momento, vocês serem filiados
- **Etapa IV:** Vocês serão orientados por Coordenadores Regionais e membros da Diretoria Executiva a realizarem uma atividade de cunho social obedecendo algumas regras e preenchendo as fichas de submissão de atividade.
- **Etapa V:** Ao ser executada cada etapa, um novo processo de avaliação será feito pelos Coordenadores Regionais e Diretoria Executiva e, caso vocês a executem bem, serão convidados a estar conosco em nossa próxima Assembleia Geral para defender a não plenitude da sua faculdade perante a plenária da IFMSA Brazil.

## Como funciona a Assembleia Geral?

É o espaço de deliberação máxima na IFMSA Brazil, onde ocorrem paralelamente sessões, workshops, treinamentos, palestras, entre outros eventos, dentre os quais está a apresentação de sua candidatura à não plenitude.
Caso vocês recebam a carta convite para apresentar a não-plenitude, será necessário no mínimo um representante presente.

## Quanto tempo esse processo demora?

Em média, 1 ano para ser finalizado.
O processo pode durar menos de acordo com cada comitê aspirante.

## Há algum custo para ser filiado?

### Não!

Não há nenhuma taxa de filiação ou taxa para se manter filiado.

O único custo é a ida até a Assembleia Geral, que deve ser custeada pelo grupo fundador. A inscrição no evento inclui alimentação, hospedagem e o evento em si, e outros custos envolvem o transporte até o evento.
Durante o ciclo de capacitações sobre a atividade, vocês irão aprender estratégias para fazer uma atividade financeiramente sustentável, e conseguir patrocínios e parcerias (inclusive com a coordenação do curso), que podem ajudar com esse custo!

## E quanto aos intercâmbios?

Após o processo de não-plenitude, vocês precisarão começar o processo de plenitude que no geral dura cerca de mais um ano após a primeira ida à Assembléia Geral.

## O que é a plenitude?

Um comitê pleno é um comitê considerado capacitado para estabelecimento de direitos plenos dentro da Federação, tendo como base a atuação perante nosso eixos. Tem direito de voz e voto, e pode realizar intercâmbios.
O processo de plenitude envolve comitês bem estruturados, com um contrato de intercâmbio assinado, e vagas declaradas.

## Minha faculdade não tem IFMSA Brazil, posso fazer intercâmbio por vocês?

Não! Apenas alunos de faculdades filiadas podem fazer intercâmbios.

## Quando iremos aprender mais informações sobre a IFMSA Brazil?

Todos os aprovados na etapa III passam por capacitações sobre planejamento de atividades, metodologia de impacto, e outros assuntos pertinentes à filiação.
Após a filiação em si, todos os novos comitês não-plenos passam por um ciclo de capacitações sobre todos os eixos da IFMSA Brazil.


`;

  const markdownContent2 = `
## Coordenação Regional

### O que fazem os Coordenadores Regionais?

Os Coordenadores Regionais prestam assistência à Diretoria Executiva em tarefas a nível regional; desenvolvem competências de nossos eixos de atuação em Escolas Médicas de cada região; promovem oportunidades, como Assembleias Regionais, espaços de representatividade de nossos coordenadores locais.

As Regionais da IFMSA Brazil são: Norte 1 (AC, RO, AM, RR), Norte 2 (PA, AP), Nordeste 1 (MA, PI, CE), Nordeste 2 (RN, PB, PE), Nordeste 3 (AL, SE, BA), Leste (MG, ES, RJ), Oeste (TO, GO, DF, MT, MS), Paulista (SP), Sul (PR, SC, RS).
`;

  if (loading) {
    return <Loading />;
  }

  return (
    <Root>
      <Title variant="h4">{"Processo de Filiação e Comitês Filiados"}</Title>
      <MarkdownContent content={markdownContent1} />
      <MarkdownContent content={markdownContent2} />
      <ComiteLists members={members} />
    </Root>
  );
};

export default Filiacao;
