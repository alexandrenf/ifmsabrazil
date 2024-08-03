import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import FloatingContactButton from "../components/FloatingContactButton"; // Adjust the path as needed
import OndeEstamos from "../components/OndeEstamos";
import AreasOfIFMSABrazil from "../components/AreasOfIFMSABrazil";
import Blog from "../components/Blog";
import backgroundImage from "../assets/background-image.webp";
import { isWithinInterval, parseISO } from "date-fns";
import Alert from "../components/Alert";

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
  background-image: url(${backgroundImage});
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

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [originalAlert, setOriginalAlert] = useState(null); // Store the original alert data
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertHash, setAlertHash] = useState(null);
  const storedHash = Cookies.get("alertHash");
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [forceReopen, setForceReopen] = useState(false);

  const apiEndpoint = "https://api.ifmsabrazil.org/api/blogs/recent"; // Update this to your actual API endpoint

  useEffect(() => {
    const hashAlertData = (
      message,
      title,
      buttonUrl,
      buttonText,
      toggleButton,
      toggleMessage
    ) => {
      const data = `${message}${title}${buttonUrl}${buttonText}${toggleButton}${toggleMessage}`;
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      return hash.toString();
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const { recentBlogs, alert } = response.data;

        setPosts(recentBlogs);

        // Check alert conditions
        if (alert && alert.toggleDate) {
          const today = new Date();
          if (
            isWithinInterval(today, {
              start: parseISO(alert.dateStart),
              end: parseISO(alert.dateEnd),
            })
          ) {
            const hash = hashAlertData(
              alert.message,
              alert.title,
              alert.buttonUrl,
              alert.buttonText,
              alert.toggleButton,
              alert.toggleMessage
            );

            storedHash === hash ? setAlertIsOpen(false) : setAlertIsOpen(true);
            storedHash === hash
              ? setShowNotification(true)
              : setShowNotification(false);

            setAlert(alert);
            setAlertHash(hash);
            setOriginalAlert(alert); // Store the original alert data

            if (!storedHash || storedHash !== hash) {
              setAlertIsOpen(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!alertIsOpen && alertHash && !forceReopen) {
      Cookies.set("alertHash", alertHash, { expires: 7 }); // Set cookie to expire in 7 days
    }
  }, [alertIsOpen, alertHash, forceReopen]);

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

  const handleAlertClose = () => {
    setShowNotification(true);
    setAlertIsOpen(false);
    setForceReopen(false);
  };

  const handleAlertReopen = () => {
    setShowNotification(false);
    setAlertIsOpen(true);
    setAlert(originalAlert); // Use the original alert data
    setForceReopen(true);
  };

  return (
    <HomeContainer>
      {alert && (
        <Alert
          toggleMessage={alert.toggleMessage}
          message={alert.message}
          toggleButton={alert.toggleButton}
          buttonText={alert.buttonText}
          buttonUrl={alert.buttonUrl}
          title={alert.title}
          forceOpen={forceReopen}
          onClose={handleAlertClose}
          isOpen={alertIsOpen}
          setIsOpen={setAlertIsOpen}
        />
      )}
      <HeroSection>
        <HeroText>Estudantes de medicina que fazem a diferença</HeroText>
        <JoinButton onClick={() => (window.location.href = "/filie-se")}>
          Faça parte
        </JoinButton>
        <ScrollButton show={showScrollButton} onClick={scrollToContent}>
          <svg viewBox="0 0 24 24">
            <path d="M12 16.5l-7-7 1.41-1.41L12 13.67l5.59-5.58L19 9.5l-7 7z" />
          </svg>
        </ScrollButton>
      </HeroSection>
      <ContentSection>
        <h2>Breve Introdução</h2>
        <p>
          Fundada em 1991 como primeira associação da América Latina vinculada à
          International Federation of Medical Students’ Association (IFMSA), a
          IFMSA Brazil interliga estudantes de medicina de todo o país para
          fazer a diferença na sociedade e na formação médica.
        </p>
      </ContentSection>
      <OndeEstamos />
      <AreasOfIFMSABrazil />
      <Blog posts={posts} loading={loading} />
      <FloatingContactButton
        showNotification={showNotification}
        onAlertReopen={handleAlertReopen}
      />
    </HomeContainer>
  );
};

export default Home;
