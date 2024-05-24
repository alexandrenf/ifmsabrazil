import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import Papa from 'papaparse';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Loading from './Loading.js'; // Ensure the path is correct

const RMCarousel = Carousel.default ? Carousel.default : Carousel;

const Root = styled(Container)({
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#333',
  position: 'relative',
});

const MemberCard = styled(Box)({
  padding: '16px',
  margin: '8px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '350px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const MemberAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  marginBottom: '16px',
  borderRadius: '50%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
});

const MemberName = styled(Typography)({
  fontWeight: 'bold',
  color: '#00508C',
  marginBottom: '8px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const MemberRole = styled(Typography)({
  color: '#1976d2',
  marginBottom: '8px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const MemberEmail = styled(Typography)({
  color: '#333',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const Gallery = ({ csvUrl }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(csvUrl);
        const parsedData = Papa.parse(response.data, { header: true });
        const realData = parsedData.data;
        setMembers(realData);
      } catch (error) {
        console.error('Error fetching spreadsheet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  if (loading) {
    return <Loading />;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Root>
      <Typography variant="h4" align="center" gutterBottom>
        Diretoria Executiva
      </Typography>
      <RMCarousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
      >
        {members.map((member, index) => (
          <MemberCard key={index}>
            <MemberAvatar src={member['link-foto']} alt={member.nome} />
            <MemberName variant="h6">{member.nome}</MemberName>
            <MemberRole variant="body1">{member.cargo} ({member.sigla})</MemberRole>
            <MemberEmail variant="body2">{member.email}</MemberEmail>
          </MemberCard>
        ))}
      </RMCarousel>
    </Root>
  );
};

export default Gallery;
