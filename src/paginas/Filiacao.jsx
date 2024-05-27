import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Markdown from "markdown-to-jsx";
import Loading from "../components/Loading.jsx";
import ComiteLists from "../components/ComiteLists.jsx";
import axios from "axios";
import Papa from "papaparse";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "../components/codeStyles.css"; // Your custom styles

const Root = styled(Container)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
});

const MarkdownContainer = styled("div")({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "16px",
  "& table": {
    width: "100%",
    maxWidth: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
    overflowX: "auto",
    display: "block",
    margin: "0 auto",
  },
  "& th, & td": {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  "& th": {
    backgroundColor: "#f2f2f2",
  },
  "& blockquote": {
    borderLeft: "4px solid #ddd",
    paddingLeft: "16px",
    color: "#666",
    margin: "16px 0",
    fontStyle: "italic",
    "& blockquote": {
      borderLeft: "4px solid #bbb",
      margin: "16px 0 0",
      paddingLeft: "16px",
    },
  },
  "& a": {
    color: "#00508C",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "& img": {
    maxWidth: "100%",
    height: "auto",
  },
});

const Title = styled(Typography)({
  color: "#00508C",
  marginBottom: "16px",
  fontWeight: "bold",
  textAlign: "center", // Center the title
});

const MetaData = styled("div")({
  marginBottom: "16px",
  color: "#666",
  textAlign: "center", // Center the metadata
});

const MarkdownOptions = {
  overrides: {
    table: {
      component: ({ children, ...props }) => (
        <div style={{ overflowX: "auto" }}>
          <table {...props}>{children}</table>
        </div>
      ),
    },
    th: {
      component: ({ children, ...props }) => <th {...props}>{children}</th>,
    },
    td: {
      component: ({ children, ...props }) => (
        <td {...props} data-label={props["data-label"]}>
          {children}
        </td>
      ),
    },
    blockquote: {
      component: ({ children, ...props }) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    a: {
      component: ({ children, ...props }) => <a {...props}>{children}</a>,
    },
    img: {
      component: ({ children, ...props }) => (
        <img {...props} style={{ maxWidth: "100%", height: "auto" }} />
      ),
    },
    code: {
      component: ({ children, ...props }) => {
        const language =
          props.className?.replace("language-", "") || "javascript";
        useEffect(() => {
          Prism.highlightAll();
        }, [children]);

        return (
          <pre className={`language-${language}`}>
            <code className={`language-${language}`}>{children}</code>
          </pre>
        );
      },
    },
  },
};

const MarkdownPage = () => {
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
        console.log(realData);
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
      <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent1}</Markdown>
      </MarkdownContainer>
      <ComiteLists members={members} />
    </Root>
  );
};

export default MarkdownPage;
