import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import Papa from 'papaparse';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Loading from './Loading.js'; // Ensure the path is correct

const RMCarousel = Carousel.default ? Carousel.default : Carousel;

const Root = styled(Container)({
  paddingLeft: '48px',
  paddingRight: '48px',
  paddingTop: '24px',
  paddingBottom:'24px',
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
  height: '300px', // Reduced height to minimize empty space
  overflow: 'hidden',
  whiteSpace: 'normal', // Allows text to wrap
});

const MemberAvatar = styled(Avatar)({
  width: '140px', // Increased size
  height: '140px', // Increased size
  marginBottom: '16px',
  borderRadius: '12px', // Rounded corners for square images
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
});

const useDynamicFontSize = (ref, defaultFontSize = '1rem') => {
  const [fontSize, setFontSize] = useState(defaultFontSize);

  useEffect(() => {
    const resizeFont = () => {
      if (ref.current) {
        const parentWidth = ref.current.parentNode.clientWidth;
        const childWidth = ref.current.scrollWidth;
        if (childWidth > parentWidth) {
          const newSize = (parentWidth / childWidth) * parseFloat(window.getComputedStyle(ref.current).fontSize);
          setFontSize(`${newSize}px`);
        } else {
          setFontSize(defaultFontSize);
        }
      }
    };

    resizeFont();
    window.addEventListener('resize', resizeFont);
    return () => window.removeEventListener('resize', resizeFont);
  }, [ref, defaultFontSize]);

  return fontSize;
};

const DynamicTypography = ({ children, variant, defaultFontSize }) => {
  const ref = useRef(null);
  const fontSize = useDynamicFontSize(ref, defaultFontSize);

  return (
    <Typography
      ref={ref}
      style={{ fontSize, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'normal' }}
      variant={variant}
    >
      {children}
    </Typography>
  );
};

const MemberRole = ({ children }) => {
  const ref = useRef(null);
  const fontSize = useDynamicFontSize(ref, '0.875rem'); // Default font size for roles

  return (
    <Typography
      ref={ref}
      style={{ fontSize, color: '#1976d2', marginBottom: '8px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'normal' }}
      variant="body1"
    >
      {children}
    </Typography>
  );
};

const MemberEmail = styled(Typography)({
  color: '#333',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'normal', // Allows text to wrap
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
            <DynamicTypography variant="h6" defaultFontSize="1rem">{member.nome}</DynamicTypography>
            <MemberRole>{member.cargo} ({member.sigla})</MemberRole>
            <MemberEmail variant="body2">{member.email}</MemberEmail>
          </MemberCard>
        ))}
      </RMCarousel>
    </Root>
  );
};

export default Gallery;
