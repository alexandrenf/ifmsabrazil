import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { convertToAscii } from './characterConversion.js';
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
});

const MarkdownPage = ({ posts }) => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const asciiTitle = convertToAscii(title);
        const post = posts.find((p) => convertToAscii(p.titulo.toLowerCase()).replace(/[^a-z0-9]+/g, '-') === asciiTitle);

        if (!post) {
          throw new Error('Post not found');
        }

        const response = await axios.get(post.link);
        setMarkdownContent(response.data);
      } catch (error) {
        console.error('Error loading markdown file:', error);
        setMarkdownContent('# 404 Not Found\n\nThe requested post could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [title, posts, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Root>
      <Title variant="h4">
        Página IFMSA Brazil
      </Title>
      <MarkdownContainer>
        <Markdown>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
