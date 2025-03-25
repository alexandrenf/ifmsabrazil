"use client"

import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import axios from "axios"
import Cookies from "js-cookie"
import FloatingContactButton from "../components/FloatingContactButton"
import OndeEstamos from "../components/OndeEstamos"
import AreasOfIFMSABrazil from "../components/AreasOfIFMSABrazil"
import Blog from "../components/Blog"
import backgroundImage from "../assets/background-image.webp"
import { isWithinInterval, parseISO } from "date-fns"
import Alert from "../components/Alert"
import { ChevronDown } from "lucide-react"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const wave = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`

const floatText = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`

const glowPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(250, 200, 0, 0.2);
  }
  50% {
    text-shadow: 0 0 15px rgba(250, 200, 0, 0.3);
  }
`

const rotatePattern = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const floatPattern = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
`

const BackgroundPatterns = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: 10%;
    left: 5%;
    animation: ${rotatePattern} 20s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid rgba(250, 200, 0, 0.1);
    bottom: 15%;
    right: 10%;
    animation: ${floatPattern} 15s ease-in-out infinite;
    transform: rotate(45deg);
  }
`

const GridPattern = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
  z-index: 1;
`

const IconsBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const FloatingIcon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.2;
  animation: ${floatPattern} ${props => props.duration || '10s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  svg {
    width: 100%;
    height: 100%;
    fill: ${props => props.color || 'white'};
  }
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`

const HeroSection = styled.div`
  width: 100%;
  height: 93vh;
  background-color: #00508c;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${backgroundImage}) center/cover;
    opacity: 0.8;
    filter: brightness(0.7) contrast(1.2);
  }
`

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;
`

const HeroText = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  padding: 0 20px;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #ffffff;
  letter-spacing: 1px;

  span {
    color: #fac800;
    animation: ${glowPulse} 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtext = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  animation: ${fadeIn} 1s ease-out 0.6s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const BaseButton = styled.button`
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover:before {
    width: 200px;
    height: 200px;
  }
`

const JoinButton = styled(BaseButton)`
  background-color: #fac800;
  color: #00508c;
  border: none;
  box-shadow: 0 4px 15px rgba(250, 200, 0, 0.3);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(250, 200, 0, 0.4);
  }
`

const LearnMoreButton = styled(BaseButton)`
  background-color: transparent;
  color: white;
  border: 2px solid #ffffff;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const ScrollButton = styled.button`
  position: absolute;
  bottom: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  animation: ${float} 2s ease-in-out infinite;
  margin-bottom: ${props => props.$scrolled ? '0' : '14px'}; // Add margin when navbar is expanded

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    bottom: ${props => props.$scrolled ? '20px' : '34px'}; // Adjust bottom position based on navbar state
  }
`

const ContentSection = styled.div`
  width: 100%;
  padding: 100px 20px;
  background-color: white;
  text-align: center;
  color: #333;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 20px;
    color: #00508c;
    position: relative;
    display: inline-block;
    
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
  }

  p {
    max-width: 800px;
    margin: 2rem auto;
    line-height: 1.8;
    font-size: 1.1rem;
    color: #555;
  }
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3rem;
`

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #00508c, #00963c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StatLabel = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`

const Home = () => {
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState(null)
  const [originalAlert, setOriginalAlert] = useState(null)
  const [alertIsOpen, setAlertIsOpen] = useState(false)
  const [alertHash, setAlertHash] = useState(null)
  const storedHash = Cookies.get("alertHash")
  const [loading, setLoading] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [forceReopen, setForceReopen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const apiEndpoint = "https://api.ifmsabrazil.org/api/blogs/recent"

  useEffect(() => {
    const hashAlertData = (message, title, buttonUrl, buttonText, toggleButton, toggleMessage) => {
      const data = `${message}${title}${buttonUrl}${buttonText}${toggleButton}${toggleMessage}`
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash |= 0 // Convert to 32bit integer
      }
      return hash.toString()
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(apiEndpoint)
        const { recentBlogs, alert } = response.data

        setPosts(recentBlogs)

        // Check alert conditions
        if (alert && alert.toggleDate) {
          const today = new Date()
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
              alert.toggleMessage,
            )

            storedHash === hash ? setAlertIsOpen(false) : setAlertIsOpen(true)
            storedHash === hash ? setShowNotification(true) : setShowNotification(false)

            setAlert(alert)
            setAlertHash(hash)
            setOriginalAlert(alert)

            if (!storedHash || storedHash !== hash) {
              setAlertIsOpen(true)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (!alertIsOpen && alertHash && !forceReopen) {
      Cookies.set("alertHash", alertHash, { expires: 7 })
    }
  }, [alertIsOpen, alertHash, forceReopen])

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const showThreshold = windowHeight * 0.7

    if (scrollPosition < showThreshold) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleAlertClose = () => {
    setShowNotification(true)
    setAlertIsOpen(false)
    setForceReopen(false)
  }

  const handleAlertReopen = () => {
    setShowNotification(false)
    setAlertIsOpen(true)
    setAlert(originalAlert)
    setForceReopen(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
        <HeroContent>
          <HeroText>
            Estudantes de medicina que fazem a <span>diferença</span>
          </HeroText>
          <HeroSubtext>
            Conectando futuros médicos em todo o Brasil para promover saúde, educação médica, humanização e intercâmbios
            que transformam vidas e comunidades.
          </HeroSubtext>
          <ButtonContainer>
            <JoinButton onClick={() => (window.location.href = "/filie-se")}>
              Faça parte
            </JoinButton>
            <LearnMoreButton onClick={scrollToContent}>
              Saiba mais
            </LearnMoreButton>
          </ButtonContainer>
        </HeroContent>
        <ScrollButton onClick={scrollToContent} $scrolled={scrolled}>
          <ChevronDown size={24} color="white" />
        </ScrollButton>
      </HeroSection>

      <ContentSection>
        <h2>Quem Somos</h2>
        <p>
          Fundada em 1991 como primeira associação da América Latina vinculada à International Federation of Medical
          Students' Association (IFMSA), a IFMSA Brazil interliga estudantes de medicina de todo o país para fazer a
          diferença na sociedade e na formação médica. Através de nossos programas e iniciativas, capacitamos futuros
          médicos a serem agentes de transformação em suas comunidades e no sistema de saúde brasileiro.
        </p>
      </ContentSection>

      <OndeEstamos />
      <AreasOfIFMSABrazil />
      <Blog posts={posts} loading={loading} />
      <FloatingContactButton showNotification={showNotification} onAlertReopen={handleAlertReopen} />
    </HomeContainer>
  )
}

export default Home

