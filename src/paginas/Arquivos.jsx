import React, { useState, useEffect, lazy } from "react";
import styled from "styled-components";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Box,
  Divider,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BlogPostListItem from "../components/BlogPostListItem";
import Loading from "../components/Loading";

const Revista = lazy(() => import("./Revista.jsx"));
const Ressonancia = lazy(() => import("./Ressonancia.jsx"));
const Declaracoes = lazy(() => import("./Declaracoes.jsx"));
const Notas = lazy(() => import("./Notas.jsx"));
const InformaSUSi = lazy(() => import("./InformaSUSi.jsx"));
const NotFound = lazy(() => import("../components/NotFound.jsx")); // Import the NotFound component

const allowedTypes = [
  {
    href: "notas",
    label: "Arquivos de Nota de Posicionamento",
    file: "1",
    ref: "notas-de-posicionamento",
  },
  { href: "susi", label: "Informa SUSi", file: "2", ref: "informa-susi" },
  {
    href: "rp",
    label: "Edições da Ressonância Poética",
    file: "3",
    ref: "ressonancia-poetica",
  },
  {
    href: "bms",
    label: "Edições de Brazilian Medical Students",
    file: "4",
    ref: "bms",
  },
  { href: "relatorios", label: "Relatórios", file: "", ref: "relatorios" },
  {
    href: "dps",
    label: "Arquivos de Declarações de Política",
    file: "6",
    ref: "declaracoes-de-politica",
  },
  {
    href: "intercambio_nac",
    label: "Intercâmbio Nacional",
    file: "",
    ref: "intercambio-nacional",
  },
  {
    href: "intercambio_inter",
    label: "Intercâmbio Internacional",
    file: "",
    ref: "intercambio-internacional",
  },
  {
    href: "regulamento",
    label: "Regulamento de Intercâmbios",
    file: "",
    ref: "regulamento-intercambios",
  },
];

const returnProperty = (fileNumber) => {
  switch (fileNumber) {
    case "1":
      return <Notas />;
    case "3":
      return <Ressonancia />;
    case "4":
      return <Revista />;
    case "6":
      return <Declaracoes />;
    case "2":
      return <InformaSUSi />;
    default:
      return null;
  }
};

const BlogSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  background-color: #f0f2f5;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const ListContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const DividerStyled = styled(Divider)`
  margin: 0 20px;
`;

const FilterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
`;

const Arquivos = () => {
  const { type } = useParams();
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [filteredArquivos, setFilteredArquivos] = useState([]);

  const typeObject = allowedTypes.find((t) => t.ref === type);
  console.log(typeObject);
  if (!typeObject) {
    return <NotFound />;
  }

  const apiEndpoint = `https://api.ifmsabrazil.org/api/arquivos/${typeObject.href}`;

  const label = typeObject ? typeObject.label : "Publicações";

  useEffect(() => {
    const fetchArquivos = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Arquivos data is not an array");
        }

        setArquivos(data);
      } catch (error) {
        console.error("Error fetching arquivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArquivos();
  }, [apiEndpoint]);

  useEffect(() => {
    setFilteredArquivos(prioritizeArquivos(arquivos));
  }, [arquivos, sortOrder, searchTerm, selectedAuthors]);

  const sortArquivos = (arquivos, order) => {
    const sortedArquivos = [...arquivos];
    if (order === "dateAsc") {
      sortedArquivos.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (order === "dateDesc") {
      sortedArquivos.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "titleAsc") {
      sortedArquivos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "titleDesc") {
      sortedArquivos.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedArquivos;
  };

  const filterArquivos = (arquivos) => {
    return arquivos.filter((arquivo) => {
      const matchesSearchTerm = arquivo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(arquivo.author);
      return matchesSearchTerm && matchesAuthor;
    });
  };

  const prioritizeArquivos = (arquivos) => {
    const sortedArquivos = sortArquivos(arquivos, sortOrder);
    const filteredArquivos = filterArquivos(sortedArquivos);
    return filteredArquivos;
  };

  if (loading) {
    return <Loading />;
  }

  const uniqueAuthors = [...new Set(arquivos.map((arquivo) => arquivo.author))];

  return (
    <>
      {returnProperty(typeObject?.file)}
      <BlogSection>
        <Title>{label}</Title>
        <FilterContainer>
          <TextField
            label="Buscar por Título"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "20px", flexGrow: 1 }}
          />
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Autor</InputLabel>
            <Select
              multiple
              value={selectedAuthors}
              onChange={(e) => setSelectedAuthors(e.target.value)}
              input={<OutlinedInput label="Filtrar por Autor" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {uniqueAuthors.map((author) => (
                <MenuItem key={author} value={author}>
                  <Checkbox checked={selectedAuthors.indexOf(author) > -1} />
                  <ListItemText primary={author} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterContainer>
        <ButtonContainer>
          <ButtonGroup variant="outlined" color="primary">
            <Button onClick={() => setSortOrder("dateDesc")}>
              Data (mais recentes)
            </Button>
            <Button onClick={() => setSortOrder("dateAsc")}>
              Data (mais antigas)
            </Button>
            <DividerStyled orientation="vertical" flexItem />
            <Button onClick={() => setSortOrder("titleAsc")}>
              Título (A-Z)
            </Button>
            <Button onClick={() => setSortOrder("titleDesc")}>
              Título (Z-A)
            </Button>
          </ButtonGroup>
        </ButtonContainer>
        <ListContainer>
          {filteredArquivos.map((arquivo, index) => (
            <a
              href={arquivo.fileLink}
              key={index}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BlogPostListItem post={arquivo} />
            </a>
          ))}
        </ListContainer>
      </BlogSection>
    </>
  );
};

export default Arquivos;
