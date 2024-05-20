import React from 'react';
import { Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: '#00508C',
  color: 'white',
  padding: '20px 0',
  textAlign: 'center',
});

const ContactItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '5px 0',
  justifyContent: 'center',

  '& svg': {
    marginRight: '10px',
  },
});

const SocialLinks = styled('div')({
  marginTop: '10px',
});

const SocialLink = styled(IconButton)({
  color: 'white',
  margin: '0 10px',
  fontSize: '1.5rem',
  transition: 'color 0.3s',

  '&:hover': {
    color: '#FAC800',
  },
});

const Footer = () => (
  <FooterContainer>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Endereço
          </Typography>
          <ContactItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
            <Typography variant="body1">
              Avenida Paulista nº 1765 - 7º Andar
            </Typography>
          </ContactItem>
          <Typography variant="body1">
            Boa Vista, São Paulo/SP - Brasil
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contato
          </Typography>
          <ContactItem>
            <FontAwesomeIcon icon={faEnvelope} />
            <Typography variant="body1">atendimento@ifmsabrazil.org</Typography>
          </ContactItem>
          <ContactItem>
            <FontAwesomeIcon icon={faPhone} />
            <Typography variant="body1">Tel: + 55 11 3170-3251</Typography>
          </ContactItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Siga-nos
          </Typography>
          <SocialLinks>
            <SocialLink href="https://twitter.com/ifmsabrazil" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialLink>
            <SocialLink href="https://instagram.com/ifmsabrazil" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialLink>
          </SocialLinks>
        </Grid>
      </Grid>
    </Container>
  </FooterContainer>
);

export default Footer;
