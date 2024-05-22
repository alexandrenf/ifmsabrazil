import React, { useEffect, useState } from 'react';
import fetchSpreadsheet from './fetchSpreadsheet.js'; // Adjust the path as needed
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

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/14lmnc_GTJzWvLatvU9QQIBO9_Xg1fKjBEMYU12FsZuk/export?gid=0&format=csv';

  useEffect(() => {
    const loadData = async () => {
      const spreadsheetData = await fetchSpreadsheet(googleSheetsUrl);
      setPosts(spreadsheetData.slice(0, 4)); // Get the first 4 posts
    };

    loadData();
  }, [googleSheetsUrl]);

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
