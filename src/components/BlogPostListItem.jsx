import React from "react";
import styled from "styled-components";
import { Box, Typography, Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ListItem = styled(Box)`
  display: flex;
  align-items: stretch;
  padding: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 80, 140, 0.1);
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: row;
    padding: 12px;
    gap: 16px;
  }

  &:hover {
    background-color: rgba(0, 80, 140, 0.02);
    transform: translateY(-2px);

    .arrow-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ImageContainer = styled(Box)`
  position: relative;
  flex: 0 0 120px;
  min-height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: #f0f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  @media (max-width: 768px) {
    flex: 0 0 100px;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    flex: 0 0 80px;
    min-height: 80px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StyledImage = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ListItemContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  position: relative;
`;

const Title = styled(Typography)`
  font-weight: 600;
  color: #00508c;
  margin-bottom: 8px;
  font-size: clamp(0.9rem, 2vw, 1.25rem);
  line-height: 1.3;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${ListItem}:hover & {
    color: #fac800;
  }

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

const Author = styled(Typography)`
  color: #666;
  font-size: clamp(0.75rem, 1.8vw, 0.9rem);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled(Typography)`
  color: #888;
  font-size: clamp(0.7rem, 1.6vw, 0.85rem);
  margin-bottom: 8px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

const Summary = styled(Typography)`
  color: #444;
  font-size: clamp(0.8rem, 1.8vw, 0.95rem);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    -webkit-line-clamp: 2;
    font-size: 0.8rem;
  }
`;

const PinIcon = styled(FontAwesomeIcon)`
  color: #fac800;
  font-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  filter: drop-shadow(0 2px 4px rgba(250, 200, 0, 0.2));
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  display: none;

  @media (min-width: 769px) {
    display: block;
    color: #00508c;
    font-size: 1.2rem;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
`;

const BlogPostListItem = ({ post }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      if (dateString instanceof Date) {
        return dateString.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        });
      }

      if (typeof dateString === 'number') {
        return new Date(dateString).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        });
      }

      const date = new Date(Date.parse(dateString));
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
      });
    } catch (error) {
      console.warn("Date parsing failed:", error);
      return dateString;
    }
  };

  return (
    <ListItem>
      <ImageContainer>
        <StyledImage
          src={post.imageLink || 'default-image-url.jpg'}
          alt={post.title}
          onError={(e) => {
            e.target.src = 'https://placehold.co/120x120?text=IFMSA';
          }}
        />
      </ImageContainer>
      
      <ListItemContent>
        <Title variant="h6">{post.title}</Title>
        <Author>{post.author}</Author>
        <Date>{formatDate(post["dia-mes-ano"] || post.date)}</Date>
        <Summary>{post.summary}</Summary>
        <ArrowIcon icon={faArrowRight} className="arrow-icon" />
      </ListItemContent>

      {post.forceHomePage && (
        <PinIcon icon={faThumbtack} title="Post fixado" />
      )}
    </ListItem>
  );
};

export default BlogPostListItem;
