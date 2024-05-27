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
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/1PF7Lqb0jq1ULQBmHzFxOif5UvGwsVLqM2LESq7JVh6c/export?gid=1583477648&format=csv";
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(csvUrl);
        const parsedData = Papa.parse(response.data, { header: true });
        const realData = parsedData.data;
        setMembers(realData);
      } catch (error) {
        console.error("Error fetching spreadsheet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  const markdownContent1 = `
A estrutura da IFMSA Brazil é composta por Diretoria Executiva, Coordenadores Regionais, Times Nacionais, Coordenadores Nacionais de Programas, Comitês Locais (escolas médicas filiadas), Coordenadores Locais (estudantes de medicina filiados), Alumni, Conselho Supervisor e Comissão de Reforma e Elaboração de Documentos.

## Diretoria Executiva Nacional

A Diretoria Executiva é composta por 21 cargos a nível nacional, responsável por:

- Captar recursos e finanças;
- Gerir o marketing e relações externas;
- Administrar, desenvolver e apoiar os Comitês Locais;
- Desenvolvimento de atividades centrais em seis principais campos da saúde:
  - Saúde pública;
  - Educação médica;
  - Saúde e direitos sexuais e reprodutivos incluindo HIV e AIDS;
  - Direitos Humanos e Paz;
  - Intercâmbios nacional e internacional clínico-cirúrgicos ou de pesquisa.

`;

  if (loading) {
    return <Loading />;
  }

  return (
    <Root>
      <Title variant="h4">{"Comitês Filiados"}</Title>
      <MarkdownContent content={markdownContent1} />
      <ComiteLists members={members} />
    </Root>
  );
};

export default Filiacao;
