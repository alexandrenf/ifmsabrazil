import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import BlogPostListItem from "../components/BlogPostListItem.jsx";
import Loading from "../components/Loading.jsx";
import { generateUrlFriendlyTitle } from "../components/characterConversion.jsx";
import axios from "axios";

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
  font-size: 2.5rem;
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
          <Button onClick={() => setSortOrder("titleAsc")}>Título (A-Z)</Button>
          <Button onClick={() => setSortOrder("titleDesc")}>
            Título (Z-A)
          </Button>
        </ButtonGroup>
      </ButtonContainer>
      <ListContainer>
        {filteredPosts.map((post, index) => (
          <Link
            to={`/post/${post.id}/${generateUrlFriendlyTitle(post.title)}`}
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
