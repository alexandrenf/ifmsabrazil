import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost.js';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';

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

  return (
    <BlogSection>
      <Title>Notícias Recentes</Title>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <BlogPost post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </BlogSection>
  );
};

export default Blog;
