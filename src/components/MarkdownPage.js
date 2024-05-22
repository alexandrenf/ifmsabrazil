import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { convertToAscii, removeDashes } from './characterConversion.js';
import Loading from './Loading.js';
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
    borderCollapse: 'collapse',
    marginBottom: '16px',
  },
  '& th, & td': {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  '& th': {
    backgroundColor: '#f2f2f2',
  },
  '@media (max-width: 600px)': {
    '& table, & th, & td': {
      display: 'block',
      width: '100%',
    },
    '& th': {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
    },
    '& td': {
      position: 'relative',
      paddingLeft: '50%',
      textAlign: 'right',
    },
    '& td::before': {
      content: 'attr(data-label)',
      position: 'absolute',
      left: '0',
      width: '50%',
      paddingLeft: '15px',
      fontWeight: 'bold',
      textAlign: 'left',
    },
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

const MarkdownOptions = {
  overrides: {
    table: {
      component: ({ children, ...props }) => (
        <table {...props}>{children}</table>
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
        const code = children.trim();
        return (
          <pre className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(code, Prism.languages[language], language),
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
  },
};

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
        <Markdown options={MarkdownOptions}>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
