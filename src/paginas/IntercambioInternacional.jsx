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

const IntercambioInternacional = () => {
  const markdownContent1 = `

## O que é o Período de Intercâmbio Internacional (PI)?

O Período de Intercâmbio Internacional (PI) é o período para realização do intercâmbio em si. Ele possui duas fases de inscrição: primeira etapa e vagas remanescentes. O PI ocorre de abril de um ano a março do outro ano e você pode escolher tanto vagas em pesquisa (SCORE) quanto clínico-cirúrgicas (SCOPE).

## Pré-Requisitos para se inscrever:

- Ser estudante de medicina, devidamente matriculado em uma faculdade cujo campus de origem seja comitê pleno da IFMSA Brazil.

- Ler o Regulamento Oficial dos Programas de Intercâmbios (disponível [aqui no site da IFMSA Brazil](/arquivos/regulamento-intercambios)).

- Ler integralmente e estar de acordo com as Exchange Conditions dos países para onde tem interesse de realizar o intercâmbio, acessando:
  - No caso do Intercâmbio Clínico Cirúrgico (SCOPE): https://exchange.ifmsa.org/exchange-conditions/scope
  - No caso do Intercâmbio de Pesquisa (SCORE): https://exchange.ifmsa.org/exchange-conditions/score


## Diferença Entre Primeira Vaga e Vagas Remanescentes

### Primeira Etapa

É a primeira oferta de vagas de cada PI, a concorrência é maior, e a classificação do estudante é feita por meio de critérios de pontuação especificados em nosso Regulamento de Intercâmbios, dentro dos quais temos: participação em monitoria, liga acadêmica, projeto de extensão, iniciação científica, atividades vinculadas à IFMSA Brazil, dentre outros.

### Vagas Remanescentes

Após a primeira etapa, as vagas que não foram preenchidas são oferecidas novamente mensalmente até a abertura de uma nova primeira etapa. A concorrência tende a ser menor e não há critério de pontuação para inscrição! A classificação ocorre por ordem de prioridade e de inscrição.

## Como se Inscrever nas Vagas Remanescentes

Para se inscrever no PI, o estudante deve estar matriculado em uma faculdade que tenha um comitê pleno vinculado à IFMSA Brazil, ter vagas declaradas e seguir alguns passos básicos:

1. **Liberação da Lista de Vagas e do Edital de Vagas Remanescentes:** nos meses em que houverem vagas disponíveis, você deve consultar a lista e ler a Exchange Condition do país para ver se está dentro dos pré-requisitos.
2. **Período de Inscrição por formulário:** o mesmo será divulgado no Edital das Vagas Remanescentes todo mês em que forem realizadas.
3. **Divulgação da Lista de Classificados em Lista Geral de E-mails da IFMSA Brazil**;
4. **Pagamento das Taxas I e II, preenchimento do Instrumento Bilateral de Interesse e Confirmação da Vaga:** isso deve ser realizado conforme prazo estabelecido no Edital de Vagas Remanescentes.
5. **Divulgação da Lista de Classificados na Lista de Espera em Lista Geral de E- mails da IFMSA Brazil**;
6. **Pagamento das Taxas I e II, preenchimento do Instrumento Bilateral de Interesse e Confirmação da Vaga em Lista de Espera:** isso deve ser realizado conforme prazo estabelecido no Edital de Vagas Remanescentes.

## Direitos e Deveres do Intercambista

Os intercâmbios são obrigatoriamente de quatro semanas e são realizados em bases bilaterais. Isso significa que os alunos recebem um estágio em algum departamento ou projeto de pesquisa, bem como hospedagem, uma refeição por dia e, muitas vezes, um Social Program. Vocês recebem tutores durante todo o período, os quais garantem que os alunos participem ativamente e melhorem suas habilidades. O certificado oficial é entregue aos alunos se todos os requisitos forem cumpridos. Este certificado é assinado pelo tutor e agente de intercâmbio internacional, e permite que a maioria dos alunos obtenham créditos de sua universidade de origem e adicione essa vivência em seus currículos.

## Taxas para Inscrição:

1. Taxa I: R$ 160,00
2. Taxa II: R$ 620,00

O pagamento das Taxas I e II dos intercâmbios internacionais deverá ser realizado através da Loja Virtual da IFMSA Brazil ou por transação bancária conforme as orientações fornecidas pelos Diretores Nacionais através de meios oficiais.

## Edital de Vulnerabilidade:

O edital de vulnerabilidade faz parte da Política de Inclusão do Coordenador Local em Vulnerabilidade Socioeconômica que a IFMSA Brazil possui no seu Regimento Geral. A finalidade é realizar a concessão gratuita de pelo menos 2 inscrições, financiamento de passagens aéreas e/ou terrestres, isenção das taxas e bolsa auxílio, conforme Regimento, à Estudantes de Graduação em vulnerabilidade socioeconômica filiados a um comitê local pleno da IFMSA Brazil, interessados em participar do Período de Intercâmbio Internacional que será aberto, sendo apenas válido para a primeira etapa do PI.

## Como Obter Mais Informações:

Para obter mais informações sobre os intercâmbios internacionais, os estudantes podem:

- Acessar o regulamento de intercâmbios no site. Lá constam todas as informações necessárias sobre o PI e outros programas.
- Enviar um e-mail para: [neo.out@ifmsabrazil.org](mailto:neo.out@ifmsabrazil.org) ou [nore.out@ifmsabrazil.org](mailto:nore.out@ifmsabrazil.org)
- Entrar em contato com o seu comitê local
- Acompanhar o instagram do intercâmbio internacional [@ifmsabrazilexchanges](http://instagram.com/ifmsabrazilexchanges).


`;

  return (
    <Root>
      <Title>{"Intercâmbios Internacionais"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default IntercambioInternacional;
