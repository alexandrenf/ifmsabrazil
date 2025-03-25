import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "./Loading.jsx";

const RMCarousel = Carousel.default ? Carousel.default : Carousel;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GallerySection = styled.section`
  width: 100%;
  padding: 100px 20px;
  background-color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 50px;
  color: #00508c;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }
`;

const MemberCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #f0f0f0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: ${props => props.index * 0.1}s;
  
  width: 260px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 300px;
    padding: 1rem;
    padding-top: 25px;
    margin: 15px 0;
  }
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f8f9fa;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(0, 80, 140, 0.1);
    border-radius: 12px;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover img {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const MemberInfo = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
  flex: 1;
  justify-content: center;
  margin-top: 16px;
`;

const MemberName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #00508c;
  line-height: 1.2;
  margin: 0;
  min-height: 0;
`;

const MemberRole = styled.p`
  font-size: 0.9rem;
  margin: 0;
  background: linear-gradient(to right, #00508c, #00963c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  line-height: 1.3;
  min-height: 0;
`;

const MemberEmail = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin: 0;
  transition: color 0.3s ease;
  word-break: break-word;
  min-height: 0;

  &:hover {
    color: #00963c;
  }
`;

const StyledCarousel = styled(RMCarousel)`
  .react-multi-carousel-dot-list {
    bottom: -40px;
  }

  .react-multi-carousel-dot button {
    border: none;
    width: 8px;
    height: 8px;
    background: rgba(0, 80, 140, 0.2);
    transition: all 0.3s ease;
  }

  .react-multi-carousel-dot--active button {
    background: #00508c;
    width: 24px;
    border-radius: 4px;
  }

  .react-multi-carousel-track {
    display: flex;
    align-items: center;
  }

  .carousel-item {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .react-multiple-carousel__arrow {
    background: rgba(0, 80, 140, 0.8);
    backdrop-filter: blur(4px);
    min-width: 40px;
    min-height: 40px;
    
    &:hover {
      background: rgba(0, 80, 140, 0.95);
    }

    @media (max-width: 768px) {
      min-width: 32px;
      min-height: 32px;
    }
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
  }

  .react-multiple-carousel__arrow--right {
    right: 0;
  }

  @media (max-width: 768px) {
    .react-multi-carousel-item {
      display: flex;
      justify-content: center;
    }
  }
`;

const Gallery = ({ url, nameOnPage }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <Loading />;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 960 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 960, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <GallerySection>
      <SectionTitle>{nameOnPage}</SectionTitle>
      <StyledCarousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        showDots={true}
        itemClass="carousel-item"
      >
        {members.map((member, index) => (
          <MemberCard key={index} index={index}>
            <ImageContainer>
              <img 
                src={member.imageLink} 
                alt={member.name}
                loading="lazy"
              />
            </ImageContainer>
            <MemberInfo>
              <MemberName textLength={member.name.length}>{member.name}</MemberName>
              <MemberRole textLength={member.role.length}>
                {member.role} {member.acronym ? `(${member.acronym})` : null}
              </MemberRole>
              <MemberEmail textLength={member.email.length}>{member.email}</MemberEmail>
            </MemberInfo>
          </MemberCard>
        ))}
      </StyledCarousel>
    </GallerySection>
  );
};

export default Gallery;
