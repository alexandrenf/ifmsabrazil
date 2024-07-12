import React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { styled } from "@mui/system";

// Import FontAwesome core
import { library } from "@fortawesome/fontawesome-svg-core";

// Add specific icons to the library
library.add(faTwitter, faInstagram, faMapMarkerAlt, faEnvelope, faPhone);

const FooterContainer = styled("footer")({
  backgroundColor: "#00508C",
  color: "white",
  padding: "20px 0",
  textAlign: "center",
});

const ContactItem = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "5px 0",
  justifyContent: "center",

  "& svg": {
    marginRight: "10px",
  },
});

const SocialLinks = styled("div")({
  marginTop: "10px",
});

const SocialLink = styled(IconButton)({
  color: "white",
  margin: "0 10px",
  fontSize: "1.5rem",
  transition: "color 0.3s",

  "&:hover": {
    color: "#FAC800",
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
            <FontAwesomeIcon icon="map-marker-alt" />
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
            <FontAwesomeIcon icon="envelope" />
            <Typography variant="body1">atendimento@ifmsabrazil.org</Typography>
          </ContactItem>
          <ContactItem>
            <FontAwesomeIcon icon="phone" />
            <Typography variant="body1">Tel: + 55 11 3170-3251</Typography>
          </ContactItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Siga-nos
          </Typography>
          <SocialLinks>
            <SocialLink
              href="https://twitter.com/ifmsabrazil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </SocialLink>
            <SocialLink
              href="https://instagram.com/ifmsabrazil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </SocialLink>
          </SocialLinks>
        </Grid>
      </Grid>
    </Container>
  </FooterContainer>
);

export default Footer;
