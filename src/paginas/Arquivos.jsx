import React, { useState, useEffect, lazy, Suspense } from "react";
import styled, { keyframes } from "styled-components";
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
const NotFound = lazy(() => import("../components/NotFound.jsx"));

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
`;

const HeaderSection = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #00508c;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }
`;

const ContentSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: ${slideIn} 1s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchField = styled(TextField)`
  flex: 1;
  min-width: 250px;
  
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #00508c;
    }
    &.Mui-focused fieldset {
      border-color: #00508c;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  flex: 1;
`;

const ListContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-top: 2rem;
`;

const SortButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${props => props.active ? '#00508c' : 'white'};
    color: ${props => props.active ? 'white' : '#00508c'};
    border: 1px solid #00508c;
    
    &:hover {
      background-color: ${props => props.active ? '#003c69' : '#f5f5f5'};
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  
  &:hover {
    text-decoration: none;
  }
`;

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

  // Add this helper function to generate URL-friendly titles
  const generateUrlFriendlyTitle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <PageContainer>
      <HeaderSection>
        <Title>{label}</Title>
      </HeaderSection>

      <ContentSection>
        {/* Show the description component first */}
        <Suspense fallback={<Loading />}>
          {typeObject?.file && returnProperty(typeObject.file)}
        </Suspense>

        {/* Then show the filters and list */}
        <FilterContainer>
          <SearchField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <StyledFormControl>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Ordenar por"
            >
              <MenuItem value="dateDesc">Mais recentes</MenuItem>
              <MenuItem value="dateAsc">Mais antigos</MenuItem>
              <MenuItem value="titleAsc">A-Z</MenuItem>
              <MenuItem value="titleDesc">Z-A</MenuItem>
            </Select>
          </StyledFormControl>
        </FilterContainer>

        <ListContainer>
          {loading ? (
            <Loading />
          ) : (
            filteredArquivos.map((arquivo) => (
              <StyledLink
                key={arquivo.id}
                to={`/arquivo/${arquivo.id}/${generateUrlFriendlyTitle(arquivo.title)}`}
              >
                <BlogPostListItem post={arquivo} />
              </StyledLink>
            ))
          )}
        </ListContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default Arquivos;
