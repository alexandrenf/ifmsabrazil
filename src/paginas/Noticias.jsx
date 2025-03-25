import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import BlogPostListItem from "../components/BlogPostListItem.jsx";
import Loading from "../components/Loading.jsx";
import { generateUrlFriendlyTitle } from "../components/characterConversion.jsx";
import axios from "axios";

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

const BlogSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #00508c;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.6s ease-out;
  
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

const ListContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .MuiButton-root {
    padding: 10px 20px;
    border: none;
    color: #00508c;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 80, 140, 0.1);
    }

    &.active {
      background-color: #00508c;
      color: white;
    }
  }
`;

const FilterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    &:hover fieldset {
      border-color: #00508c;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Noticias = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const apiEndpoint = "https://api.ifmsabrazil.org/api/blogs"; // Update this to your actual API endpoint

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Posts data is not an array");
        }

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(prioritizePosts(posts));
  }, [posts, sortOrder, searchTerm, selectedAuthors]);

  const sortPosts = (posts, order) => {
    const sortedPosts = [...posts];
    if (order === "dateAsc") {
      sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (order === "dateDesc") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "titleAsc") {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "titleDesc") {
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedPosts;
  };

  const filterPosts = (posts) => {
    return posts.filter((post) => {
      const matchesSearchTerm = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(post.author);
      return matchesSearchTerm && matchesAuthor;
    });
  };

  const prioritizePosts = (posts) => {
    const forcedPosts = posts.filter((post) => post.forceHomePage);
    const regularPosts = posts.filter((post) => !post.forceHomePage);
    const sortedPosts = sortPosts(regularPosts, sortOrder);
    const filteredPosts = filterPosts([...forcedPosts, ...sortedPosts]);
    return filteredPosts;
  };

  if (loading) {
    return <Loading />;
  }

  const uniqueAuthors = [...new Set(posts.map((post) => post.author))];

  return (
    <BlogSection>
      <Title>Últimas Publicações</Title>
      <FilterContainer>
        <StyledTextField
          label="Buscar por Título"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <StyledFormControl variant="outlined" style={{ minWidth: 200 }}>
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
        </StyledFormControl>
      </FilterContainer>
      <ButtonContainer>
        <StyledButtonGroup variant="outlined">
          <Button 
            className={sortOrder === "dateDesc" ? "active" : ""}
            onClick={() => setSortOrder("dateDesc")}
          >
            Data (mais recentes)
          </Button>
          <Button 
            className={sortOrder === "dateAsc" ? "active" : ""}
            onClick={() => setSortOrder("dateAsc")}
          >
            Data (mais antigas)
          </Button>
          <Button 
            className={sortOrder === "titleAsc" ? "active" : ""}
            onClick={() => setSortOrder("titleAsc")}
          >
            Título (A-Z)
          </Button>
          <Button 
            className={sortOrder === "titleDesc" ? "active" : ""}
            onClick={() => setSortOrder("titleDesc")}
          >
            Título (Z-A)
          </Button>
        </StyledButtonGroup>
      </ButtonContainer>
      <ListContainer>
        {filteredPosts.map((post, index) => (
          <Link
            to={`/arquivo/${post.id}/${generateUrlFriendlyTitle(post.title)}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <BlogPostListItem post={post} />
          </Link>
        ))}
      </ListContainer>
    </BlogSection>
  );
};

export default Noticias;
