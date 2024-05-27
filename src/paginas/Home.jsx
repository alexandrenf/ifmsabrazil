import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OndeEstamos from "../components/OndeEstamos.jsx";
import AreasOfIFMSABrazil from "../components/AreasOfIFMSABrazil.jsx";
import Blog from "../components/Blog.jsx"; // Adjust the path as needed

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://s6.imgcdn.dev/3hHLD.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const JoinButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: #00508c;
  background-color: #fac800;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    background-color: #e6b800;
    color: #004080;
  }
`;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: none;
  cursor: pointer;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #00508c;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  padding: 60px 20px;
  background-color: white;
  text-align: center;
  color: #333;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Home = ({ posts, loading }) => {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const showThreshold = windowHeight * 0.7;

    if (scrollPosition < showThreshold) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroText>Estudantes de medicina que fazem a diferença</HeroText>
        <JoinButton>Faça parte</JoinButton>
        <ScrollButton show={showScrollButton} onClick={scrollToContent}>
          <svg viewBox="0 0 24 24">
            <path d="M12 16.5l-7-7 1.41-1.41L12 13.67l5.59-5.58L19 9.5l-7 7z" />
          </svg>
        </ScrollButton>
      </HeroSection>
      <ContentSection>
        <h2>Breve Introdução</h2>
        <p>
          Fundada em 1991 como primeira Associação vinculada à International
          Federation of Medical Students’ Association da América Latina (IFMSA),
          a IFMSA Brazil interliga estudantes de medicina de todo o país para
          fazer a diferença na sociedade e na formação médica.
        </p>
      </ContentSection>
      <OndeEstamos />
      <AreasOfIFMSABrazil />
      <Blog posts={posts} loading={loading} />
    </HomeContainer>
  );
};

export default Home;
