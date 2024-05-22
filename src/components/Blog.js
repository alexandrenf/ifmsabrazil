import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import BlogPost from './BlogPost.js';
import { Link } from 'react-router-dom';
import { convertToAscii } from './characterConversion.js'; // Import the conversion function

const BlogSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  background-color: #FFFFFF;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Blog = ({ posts }) => {
  const generateLink = (title) => {
    const asciiTitle = convertToAscii(title);
    return asciiTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  return (
    <BlogSection>
      <Title>Blog Posts</Title>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <Link to={`/post/${generateLink(post.titulo)}`}>
                <BlogPost post={post} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </BlogSection>
  );
};

export default Blog;
