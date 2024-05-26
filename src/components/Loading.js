// src/components/Loading.js
import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const Text = styled(Typography)({
  marginTop: '16px',
  color: '#00508C',
});

const Loading = () => (
  <Root>
    <CircularProgress />
    <Text variant="h6">
      Carregando...
    </Text>
  </Root>
);

export default Loading;
