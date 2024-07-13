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

const IntercambioNacional = () => {
  const markdownContent1 = `

### Sumário
1. [O que é o PIN](#o-que-e-o-pin)
2. [Diferença entre a Primeira Etapa e as Vagas Remanescentes](#difereca-entre-a-primeira-etapa-e-as-vagas-remanescentes)
3. [Como se Inscrever nas Vagas Remanescentes](#como-se-inscrever-nas-vagas-remanescentes)
4. [Tipos de Hospedagem](#tipos-de-hospedagem)
5. [Taxas](#taxas)
6. [Edital de Vulnerabilidade](#edital-de-vulnerabilidade)
7. [Como Obter Mais Informações](#como-obter-mais-informacoes)

Os intercâmbios nacionais da IFMSA Brazil, conhecidos como *SCONE* (Standing Committee on National Exchanges), são programas que proporcionam aos estudantes de medicina a oportunidade de vivenciar diferentes realidades e práticas médicas dentro do próprio país. Esses intercâmbios são uma forma valiosa de enriquecer a formação acadêmica, permitindo que os estudantes conheçam novos ambientes hospitalares, aprendam com diferentes profissionais e culturas regionais e aprimorem suas habilidades clínicas e pessoais no Brasil.

## O que é o PIN?

O Período de Intercâmbio Nacional (PIN) é o período para realização do intercâmbio em si.  Ele possui duas fases de inscrição: período regular e vagas remanescentes. O PIN ocorre de novembro de um ano a outubro do outro ano.

## Diferença entre a Primeira Etapa e as Vagas Remanescentes

### Primeira Etapa
É a primeira oferta de vagas de cada PIN, a concorrência é maior, e a classificação do estudante é feita por meio de critérios de pontuação, dentro desses critérios temos: participação em monitoria, liga acadêmica, projeto de extensão, iniciação científica, em atividade vinculação a IFMSA Brazil, dentre outros.

### Vagas Remanescentes

Após a primeira etapa, as vagas que não foram preenchidas são oferecidas novamente mensalmente até a abertura de uma nova primeira etapa. A concorrência tende a ser menor e não há critério de pontuação para inscrição! A classificação ocorre por ordem de inscrição.

## Como se Inscrever nas Vagas Remanescentes:

Para se inscrever no PIN, o estudante deve estar matriculado em uma faculdade que tenha um comitê pleno vinculado a IFMSA Brazil. E seguir alguns passos básicos:

1. Acesso a plataforma exchange: Primeiro, é necessário se cadastrar no sistema da IFMSA Brazil, caso ainda não tenha um perfil (se você já participou de alguma atividade vinculado a IFMSA Brazil ou ao comitê local da sua faculdade você provavelmente tem um cadastro, e para ter acesso a ele entre em contato com os diretores locais do comitê local da sua cidade).

2. Escolha das Vagas: Após o cadastro, o estudante pode acessar a lista de vagas disponíveis, escolher aquelas que mais lhe interessam e se candidatar a uma única vaga através da plataforma.

3. Após isso é só esperar a divulgação da lista de classificados.

4. Caso você seja classificado basta assinar o Instrumento Particular de Vaga Bilateral e pagar as taxas referentes a sua vaga e anexar esses documentos na plataforma e no forms que disponibilizamos mensalmente junto a lista de classificados.

## Tipos de Hospedagem:

Os tipos de hospedagem disponíveis para os intercambistas variam entre:

- **Bilateral:** o intercambista é recebido na casa de alguém e deve receber um intercambista na sua casa da mesma forma, além disso eles recebe duas refeições por dia e deve oferta-las ao intercambista que irá receber também.
- **Bilateral e própria:** o intercambista não é recebido, mas deve receber um intercambista na sua casa e ofertar as duas refeições diárias.
- **Unilateral:** o intercambista é recebido na casa de alguém e não precisa receber um intercambista na sua casa, além disso eles recebe duas refeições por dia.
- **Unilateral e própria:** o intercambista não é recebido na casa de alguém e também não precisa receber um intercambista na sua casa.

Na primeira etapa nós só disponibilizamos hospedagens bilaterais, no entanto nas Vagas Remanescentes os 4 tipos de hospedagem estão disponíveis.

Vagas unilaterais precisam passar por uma deliberação portanto o intercambista no momento da inscrição deve escrever no campo destinado para tal porque precisa dessa vaga unilateral ou unilateral e própria, já que um princípio muito importante da IFMSA Brazil é a bilateralidade.

Independentemente do tipo de hospedagem, a IFMSA Brazil busca sempre garantir que os intercambistas tenham uma experiência positiva e enriquecedora, promovendo a integração e o aprendizado contínuo.

## Taxas:
- **Taxa I:** 130,00
- **Taxa II:** 300,00
- **Taxa III:** 450,00 (somente para vagas unilaterais)

Os inscritos em vagas bilaterais ou bilaterais e próprias devem pagar a taxa I e II, enquanto os inscritos em vagas unilaterais ou unilaterais e próprias devem pagar as taxas I, II e III.

## Edital de Vulnerabilidade:

O edital de vulnerabilidade faz parte da Política de Inclusão do Coordenador Local em Vulnerabilidade Socioeconômica que a IFMSA Brazil possui no seu Regimento Geral. A finalidade é realizar a concessão gratuita de pelo menos 2 inscrições, financiamento de passagens aéreas e/ou terrestres, isenção das taxas e bolsa auxílio, conforme Regimento, à Estudantes de Graduação em vulnerabilidade socioeconômica filiados a um comitê local pleno da IFMSA Brazil, interessados em participar do Período de Intercâmbio Nacional que será aberto. Sendo que apenas é válido para a primeira etapa do PIN, onde todas as vagas são bilaterais.

## Como Obter Mais Informações:

Para obter mais informações sobre os intercâmbios nacionais, os estudantes podem:

- Acessar o regulamento de intercâmbios no site. Lá constam todas as informações necessárias sobre o PIN e outros programas.
- Enviar um e-mail para: [none@ifmsabrazil.org](mailto:none@ifmsabrazil.org) ou [tin.scone@ifmsabrazil.org](mailto:tin.scone@ifmsabrazil.org)
- Entrar em contato com o seu comitê local
- Acompanhar o insta do intercâmbio nacional ([@ifmsabrazilintercambios](https://www.instagram.com/ifmsabrazilintercambios/))

`;

  return (
    <Root>
      <Title variant="h4">{"Intercâmbios Nacionais"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default IntercambioNacional;
