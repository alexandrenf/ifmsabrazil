import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Papa from 'papaparse';
import axios from 'axios';
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from './Loading.js'; // Ensure the path is correct
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Root = styled(Container)({
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#333',
  position: 'relative',
});

const MemberCard = styled(Box)({
  minWidth: '200px',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const MemberAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  marginBottom: '8px',
  borderRadius: '50%',
  margin: '0 auto',
});

const MemberName = styled(Typography)({
  fontWeight: 'bold',
  color: '#00508C',
  marginBottom: '4px',
});

const MemberRole = styled(Typography)({
  color: '#1976d2',
  marginBottom: '4px',
});

const MemberEmail = styled(Typography)({
  color: '#333',
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <Root>
      <Typography variant="h4" align="center" gutterBottom>
        Diretoria Executiva
      </Typography>
      <Slider {...settings}>
        {members.map((member, index) => (
          <MemberCard key={index}>
            <MemberAvatar src={member['link-foto']} alt={member.nome} />
            <MemberName variant="h6">{member.nome}</MemberName>
            <MemberRole variant="body1">{member.cargo} ({member.sigla})</MemberRole>
            <MemberEmail variant="body2">{member.email}</MemberEmail>
          </MemberCard>
        ))}
      </Slider>
    </Root>
  );
};

export default Gallery;
