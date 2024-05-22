import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { convertToAscii, removeDashes } from './characterConversion.js';
import Loading from './Loading.js';

const Root = styled(Container)({
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#333',
});

const MarkdownContainer = styled('div')({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '16px',
});

const Title = styled(Typography)({
  color: '#00508C',
  marginBottom: '16px',
  fontWeight: 'bold',
});

const MetaData = styled('div')({
  marginBottom: '16px',
  color: '#666',
});

const MarkdownPage = ({ posts, loading }) => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const asciiTitle = removeDashes(convertToAscii(title));
        const foundPost = posts.find((p) => removeDashes(convertToAscii(p.titulo.toLowerCase())).replace(/[^a-z0-9]+/g, '') === asciiTitle);

        if (!foundPost) {
          throw new Error('Post not found');
        }

        const response = await axios.get(foundPost.link);
        setMarkdownContent(response.data);
        setPost(foundPost);
      } catch (error) {
        console.error('Error loading markdown file:', error);
        setMarkdownContent('# 404 Not Found\n\nThe requested post could not be found.');
        setNotFound(true);
      } finally {
        setPostLoading(false);
      }
    };

    if (!loading && posts && posts.length > 0) {
      fetchMarkdown();
    }
  }, [title, posts, navigate, loading]);

  if (loading || postLoading) {
    return <Loading />;
  }

  if (notFound) {
    return (
      <Root>
        <Typography variant="h6">Post not found</Typography>
      </Root>
    );
  }

  return (
    <Root>
      <Title variant="h4">
        {post.titulo}
      </Title>
      <MetaData>
        <Typography variant="subtitle1">By {post.autor}</Typography>
        <Typography variant="subtitle2">{new Date(post['dia-mes-ano']).toLocaleDateString()}</Typography>
      </MetaData>
      <MarkdownContainer>
        <Markdown>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
