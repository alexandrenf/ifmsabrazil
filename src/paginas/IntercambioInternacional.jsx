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

const Revista = () => {
  const markdownContent1 = `

A IFMSA (International Federation of Medical Student’s Association) administra, juntamente com suas Organizações Nacionais Associadas, como a IFMSA Brazil, dois tipos de programas de Intercâmbio Internacional: Os clínicos-cirúrgicos (SCOPE) e os de pesquisa (SCORE), ambos apoiados por organizações como: Federação Mundial de Educação Médica (WFME); Organização Mundial dos Médicos de Família (WONCA);  Federação Mundial das Sociedades Neurocirúrgicas (WFNS); Sociedade Europeia de Medicina de Emergência (EuSEM); Federação Internacional de Ginecologia e Obstetrícia (FIGO);  Associação Internacional de Pediatria (IPA); Sociedade Internacional de Cirurgia Ortopédica e de Traumatologia (SICOT); Federação Mundial de Sociedades de Anestesiologistas (WFSA).

Todos os anos, mais de 400 estudantes de medicina do Brasil iniciam uma jornada para explorar serviços e sistemas de saúde em diferentes contextos culturais e sociais do mundo. Isto é possível através da criação de uma rede de estudantes a nível local e internacional que, globalmente, facilitam o acesso a projetos de intercâmbio clínico e de pesquisa. Através do nosso programa, buscamos desenvolver estudantes culturalmente sensíveis e pesquisadores especializados com intenção de moldar o mundo das ciências no futuro próximo. Acreditamos que os programas de intercâmbio são o principal promotor da compreensão e cooperação intercultural entre estudantes de medicina e profissionais de saúde, o que é muito necessário nesse mundo globalizado.

A maioria dos intercâmbios são de quatro semanas e são tratadas em bases bilaterais. Os alunos recebem um estágio em algum departamento ou projeto de pesquisa, bem como hospedagem, acomodação e, muitas vezes, um Social Program. Eles recebem tutores durante todo o período, os quais garantem que os alunos participem ativamente e melhorem suas habilidades. O certificado oficial é entregue aos alunos se todos os requisitos forem cumpridos. Este certificado é assinado pelo tutor e agente de intercâmbio de hospedagem, e permite que a maioria dos alunos obtenham créditos de sua universidade de origem e adicione essa vivência em seus currículos.

Com o objetivo de tornar os intercâmbios mais acessíveis, o total de taxas que você paga é somente de R$630,00, além de não precisar arcar com a hospedagem e nem com uma de suas refeições por dia de estágio devido ao caráter bilateral de nossos intercâmbios. Estes, além de motivo de economia, constituem um retorno da experiência que você teve fora do país quando você hospeda um intercambista em sua residência, nos mesmos moldes que você foi recebido no exterior. Receber um intercambista e sua casa é um meio bastante eficaz de praticar competências interculturais, quase como viajar sem sair de casa.

Nosso trabalho e foco constantes para garantir grandes experiências em intercâmbios nacionais e internacionais foram recompensados, em 2020, com o segundo lugar na Feira dos Intercâmbios da IFMSA, além do segundo lugar no prêmio NMO Exchange Glory, sendo premiadas as atividades educacionais Experiência Muiraquitã e SCORPIncomings. Embarque conosco nessa ideia e descubra novos horizontes em sua jornada.
Para mais informações, contate o Coordenador Local de Intercâmbios da sua faculdade, ou mande um email para intercambios@ifmsabrazil.org .

`;

  return (
    <Root>
      <Title variant="h4">{"Intercâmbios Internacionais"}</Title>
      <MarkdownContent content={markdownContent1} />
    </Root>
  );
};

export default Revista;
