import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const SponsorCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  margin: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid #f0f0f0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: ${props => props.index * 0.1}s;
  
  width: 280px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 80, 140, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00508c, #fac800);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    width: 250px;
    min-height: 280px;
    padding: 1.25rem;
    margin: 10px 0;
  }

  @media (max-width: 480px) {
    width: 220px;
    min-height: 250px;
    padding: 1rem;
    margin: 8px 0;
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f8f9fa;
  flex-shrink: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

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
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    padding: 1rem;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  color: rgba(0, 80, 140, 0.3);
  animation: ${pulse} 2s infinite;
`;

const FallbackIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: rgba(0, 80, 140, 0.3);
`;

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

const RetryButton = styled.button`
  background: rgba(0, 80, 140, 0.1);
  border: 1px solid rgba(0, 80, 140, 0.3);
  color: #00508c;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    background: rgba(0, 80, 140, 0.2);
    border-color: rgba(0, 80, 140, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SponsorInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-start;
  margin-top: auto;
  margin-bottom: auto;
`;

const SponsorName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00508c;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SponsorRole = styled.p`
  font-size: 0.9rem;
  margin: 0;
  background: linear-gradient(to right, #00508c, #fac800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SponsorContact = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  transition: color 0.3s ease;
  word-break: break-word;
  opacity: 0.8;

  &:hover {
    color: #00963c;
    opacity: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #00508c;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const StyledCarousel = styled(RMCarousel)`
  .react-multi-carousel-dot-list {
    bottom: -50px;
    padding-top: 20px;
  }

  .react-multi-carousel-dot button {
    border: none;
    width: 12px;
    height: 12px;
    background: rgba(0, 80, 140, 0.2);
    transition: all 0.3s ease;
    border-radius: 6px;
  }

  .react-multi-carousel-dot--active button {
    background: #00508c;
    width: 32px;
    border-radius: 6px;
  }

  .react-multi-carousel-track {
    display: flex;
    align-items: center;
    padding: 20px 0;
  }

  .carousel-item {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .react-multiple-carousel__arrow {
    background: rgba(0, 80, 140, 0.9);
    backdrop-filter: blur(4px);
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 80, 140, 1);
      transform: scale(1.1);
    }

    &::before {
      font-size: 20px;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      min-width: 40px;
      min-height: 40px;
      
      &::before {
        font-size: 16px;
      }
    }
  }

  .react-multiple-carousel__arrow--left {
    left: 10px;
  }

  .react-multiple-carousel__arrow--right {
    right: 10px;
  }

  @media (max-width: 768px) {
    .react-multi-carousel-item {
      display: flex;
      justify-content: center;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-style: italic;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .message {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

// Individual sponsor card component with enhanced image loading
const SponsorCardItem = ({ sponsor, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  const imageUrl = sponsor.logo || sponsor.imageLink;
  const maxRetries = 3;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setIsRetrying(false);
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  };

  const handleImageError = () => {
    console.error('Failed to load sponsor logo:', imageUrl, 'Retry count:', retryCount);
    
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }

    if (retryCount < maxRetries) {
      setIsRetrying(true);
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageError(false);
        setIsRetrying(false);
        // Force reload by adding timestamp to URL
        const img = new Image();
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
        img.src = `${imageUrl}?t=${Date.now()}`;
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      setImageError(true);
      setImageLoaded(false);
      setIsRetrying(false);
    }
  };

  const handleRetryClick = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      setImageLoaded(false);
      setIsRetrying(true);
      
      // Create new image element for retry
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = `${imageUrl}?retry=${retryCount + 1}&t=${Date.now()}`;
    }
  };

  // Set loading timeout (10 seconds)
  useEffect(() => {
    if (imageUrl && !imageLoaded && !imageError) {
      const timeout = setTimeout(() => {
        console.warn('Image loading timeout for:', imageUrl);
        handleImageError();
      }, 10000);
      setLoadingTimeout(timeout);
      
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [imageUrl, imageLoaded, imageError, retryCount]);

  // Preload image when component mounts
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <SponsorCard index={index}>
      <ImageContainer>
        {!imageError && imageUrl && (
          <img 
            src={`${imageUrl}${retryCount > 0 ? `?retry=${retryCount}&t=${Date.now()}` : ''}`}
            alt={sponsor.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            crossOrigin="anonymous"
          />
        )}
        {!imageLoaded && !imageError && !isRetrying && imageUrl && (
          <LoadingIndicator>
            ⏳
          </LoadingIndicator>
        )}
        {isRetrying && (
          <LoadingIndicator>
            🔄
          </LoadingIndicator>
        )}
        {imageError && (
          <FallbackContainer>
            <FallbackIndicator>
              🏢
            </FallbackIndicator>
            {retryCount < maxRetries && (
              <RetryButton onClick={handleRetryClick}>
                Tentar novamente
              </RetryButton>
            )}
          </FallbackContainer>
        )}
        {!imageUrl && (
          <FallbackIndicator>
            🏢
          </FallbackIndicator>
        )}
      </ImageContainer>
      <SponsorInfo>
        <SponsorName>{sponsor.name}</SponsorName>
        <SponsorRole>
          {sponsor.tier || sponsor.role} {sponsor.acronym ? `(${sponsor.acronym})` : ''}
        </SponsorRole>
        {(sponsor.website || sponsor.email) && (
          <SponsorContact>
            {sponsor.website ? (
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                {sponsor.website}
              </a>
            ) : (
              sponsor.email
            )}
          </SponsorContact>
        )}
      </SponsorInfo>
    </SponsorCard>
  );
};

const SponsorsGallery = ({ sponsors = [] }) => {
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

  if (!sponsors || sponsors.length === 0) {
    return (
      <EmptyState>
        <div className="icon">🤝</div>
        <div className="message">
          Nossos patrocinadores e parceiros serão anunciados em breve.<br />
          Fique atento às nossas redes sociais para mais informações!
        </div>
      </EmptyState>
    );
  }

  return (
    <StyledCarousel
      responsive={responsive}
      ssr={true}
      infinite={sponsors.length > 3}
      autoPlay={sponsors.length > 3}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      showDots={sponsors.length > 3}
      itemClass="carousel-item"
      containerClass="sponsors-carousel"
    >
      {sponsors.map((sponsor, index) => (
        <SponsorCardItem key={index} sponsor={sponsor} index={index} />
      ))}
    </StyledCarousel>
  );
};

export default SponsorsGallery; 