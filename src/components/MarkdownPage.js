// src/components/MarkdownPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  markdownContainer: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  title: {
    color: '#00508C',
    marginBottom: theme.spacing(2),
  },
}));

const MarkdownPage = () => {
  const classes = useStyles();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    axios.get('/markdown/pagina.md')
      .then(response => {
        setMarkdownContent(response.data);
      })
      .catch(error => {
        console.error('Error loading markdown file:', error);
      });
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Página IFMSA Brazil
      </Typography>
      <div className={classes.markdownContainer}>
        <Markdown>{markdownContent}</Markdown>
      </div>
    </Container>
  );
};

export default MarkdownPage;
