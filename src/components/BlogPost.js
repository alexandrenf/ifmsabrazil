import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  border-radius: 10px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: auto;

  @media (min-width: 600px) {
    width: 160px !important;
    height: auto;
    object-fit: cover;
    margin-left: auto;
  }
`;

const BlogPost = ({ post }) => {
  return (
    <StyledCard>
      <CardContent style={{ flex: 1 }}>
        <Typography component="h2" variant="h5" gutterBottom>
          {post.titulo}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {post.autor}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {post['dia-mes-ano'] ? new Date(post['dia-mes-ano']).toLocaleDateString() : ''}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.resumo}
        </Typography>
      </CardContent>
      <StyledCardMedia
        component="img"
        image={post['imagem-link']}
        alt="Blog image"
      />
    </StyledCard>
  );
};

export default BlogPost;
