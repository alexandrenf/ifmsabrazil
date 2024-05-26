import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { convertToAscii, removeDashes } from './characterConversion.jsx';
import Loading from './Loading.jsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import './codeStyles.css'; // Your custom styles

const Root = styled(Container)({
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#333',
});

const MarkdownContainer = styled('div')({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '16px',
  '& table': {
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    marginBottom: '16px',
    overflowX: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  '& th, & td': {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  '& th': {
    backgroundColor: '#f2f2f2',
  },
  '& blockquote': {
    borderLeft: '4px solid #ddd',
    paddingLeft: '16px',
    color: '#666',
    margin: '16px 0',
    fontStyle: 'italic',
    '& blockquote': {
      borderLeft: '4px solid #bbb',
      margin: '16px 0 0',
      paddingLeft: '16px',
    },
  },
  '& a': {
    color: '#00508C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
});

const Title = styled(Typography)({
  color: '#00508C',
  marginBottom: '16px',
  fontWeight: 'bold',
  textAlign: 'center', // Center the title
});

const MetaData = styled('div')({
  marginBottom: '16px',
  color: '#666',
  textAlign: 'center', // Center the metadata
});

const MarkdownOptions = {
  overrides: {
    table: {
      component: ({ children, ...props }) => (
        <div style={{ overflowX: 'auto' }}>
          <table {...props}>{children}</table>
        </div>
      ),
    },
    th: {
      component: ({ children, ...props }) => (
        <th {...props}>{children}</th>
      ),
    },
    td: {
      component: ({ children, ...props }) => (
        <td {...props} data-label={props['data-label']}>{children}</td>
      ),
    },
    code: {
      component: ({ className, children, ...props }) => {
        const language = className?.replace('lang-', '') || 'javascript';
        return (
          <pre className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(children, Prism.languages[language], language),
              }}
            />
          </pre>
        );
      },
    },
    blockquote: {
      component: ({ children, ...props }) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    a: {
      component: ({ children, ...props }) => (
        <a {...props}>{children}</a>
      ),
    },
    img: {
      component: ({ children, ...props }) => (
        <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
      ),
    },
  },
};

const MarkdownPage = ({ posts, loading, needsExternal, filepath }) => {
  const { title } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMarkdownExternal = async () => {
      try {
        const asciiTitle = removeDashes(convertToAscii(title));
        const foundPost = posts.find((p) => removeDashes(convertToAscii(p.titulo.toLowerCase())).replace(/[^a-z0-9]+/g, '') === asciiTitle);

        if (!foundPost) {
          throw new Error('Post not found');
        }

        const response = await axios.get(foundPost.link);
        const rawMarkdownContent = response.data;
        setPost(foundPost);
        setMarkdownContent(rawMarkdownContent);
      } catch (error) {
        console.error('Error loading markdown file:', error);
        setMarkdownContent('# 404 Not Found\n\nThe requested post could not be found.');
        setNotFound(true);
      } finally {
        setPostLoading(false);
      }
    };

    const fetchMarkdownInternal = async () => {
      try {
        const response = await fetch(filepath);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error fetching markdown file:', error);
        setMarkdownContent('# Erro ao carregar o arquivo Markdown');
      } finally {
        setPostLoading(false);
      }
    };

    if (!loading) {
      if (needsExternal && posts && posts.length > 0) {
        fetchMarkdownExternal();
      } else if (!needsExternal) {
        fetchMarkdownInternal();
      }
    }
  }, [title, posts, loading, needsExternal, filepath]);

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
      {needsExternal && post && (
        <>
          <Title variant="h4">{post.titulo}</Title>
          <MetaData>
            <Typography variant="subtitle1">Escrito por: {post.autor}</Typography>
            <Typography variant="subtitle2">{new Date(post['dia-mes-ano']).toLocaleDateString()}</Typography>
          </MetaData>
        </>
      )}
      <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
