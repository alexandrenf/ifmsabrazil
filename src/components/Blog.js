import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import BlogPost from './BlogPost.js';
import { Link } from 'react-router-dom';
import { generateUrlFriendlyTitle } from './characterConversion.js';
import Loading from './Loading.js';

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

const Blog = ({ posts, loading }) => {
  if (loading) {
    return <Loading />;
  }

  const sortPostsByDate = (posts) => {
    return posts.sort((a, b) => b['dia-mes-ano'] - a['dia-mes-ano']);
  };

  const prioritizePosts = (posts, maxPosts = 4) => {
    const sortedPosts = sortPostsByDate(posts);
    const forcedPosts = sortedPosts.filter(post => post['forcar-pagina-inicial']);

    if (forcedPosts.length >= maxPosts) {
      return forcedPosts;
    }

    const additionalPosts = sortedPosts.filter(post => !post['forcar-pagina-inicial']);
    const finalPosts = forcedPosts.concat(additionalPosts.slice(0, maxPosts - forcedPosts.length));

    return finalPosts;
  };

  const shownPosts = prioritizePosts(posts);

  return (
    <BlogSection>
      <Title>Últimas Notícias</Title>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {shownPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <Link to={`/post/${generateUrlFriendlyTitle(post.titulo)}`}>
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
