import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled(Container)({
  padding: '24px',
  textAlign: 'center',
});

const LinkContainer = styled('div')({
  marginTop: '20px',
  wordWrap: 'break-word',
});

const GeradorLink = () => {
  const [sharedLink, setSharedLink] = useState('');
  const [directLink, setDirectLink] = useState('');

  const generateDirectLink = (link) => {
    const regex = /(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/uc\?id=|drive\.google\.com\/a\/.*?\/uc\?id=)([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    console.log(sharedLink);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return '';
  };

  const handleGenerateLink = () => {
    const link = generateDirectLink(sharedLink);
    setDirectLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLink);
    alert('Link copiado!');
  };

  return (
    <Root maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Gerador de Link Direto do Google Drive
      </Typography>
      <TextField
        label="Link compartilhado do Google Drive"
        variant="outlined"
        fullWidth
        value={sharedLink}
        onChange={(e) => setSharedLink(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateLink}
      >
        Gerar Link Direto
      </Button>
      {directLink && (
        <LinkContainer>
          <Typography variant="body1" gutterBottom>
            Link Direto:
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {directLink}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleCopyLink}>
            Copiar
          </Button>
        </LinkContainer>
      )}
    </Root>
  );
};

export default GeradorLink;
