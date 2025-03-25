import React from "react";
import styled from "styled-components";
import { Box, Typography, Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ListItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 80, 140, 0.1);

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
  min-width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: #f0f4f8;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ListItemContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 24px;
  position: relative;
`;

const Title = styled(Typography)`
  font-weight: 600;
  color: #00508c;
  margin-bottom: 8px;
  font-size: 1.25rem;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${ListItem}:hover & {
    color: #fac800;
  }
`;

const Author = styled(Typography)`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const Date = styled(Typography)`
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 12px;
`;

const Summary = styled(Typography)`
  color: #444;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 90%;
`;

const PinIcon = styled(FontAwesomeIcon)`
  color: #fac800;
  font-size: 1.2rem;
  position: absolute;
  top: 24px;
  right: 24px;
  filter: drop-shadow(0 2px 4px rgba(250, 200, 0, 0.2));
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  color: #00508c;
  font-size: 1.2rem;
  position: absolute;
  bottom: 24px;
  right: 24px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
`;

const BlogPostListItem = ({ post }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      // If dateString is already a Date object
      if (dateString instanceof Date) {
        return dateString.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        });
      }

      // If dateString is a timestamp
      if (typeof dateString === 'number') {
        return new Date(dateString).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        });
      }

      // Handle string format
      const date = new Date(Date.parse(dateString));
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if parsing fails
      }
      
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
      });
    } catch (error) {
      console.warn("Date parsing failed:", error);
      return dateString; // Return original string if any error occurs
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
        <Title variant="h6">
          {post.title}
        </Title>
        
        <Author>
          {post.author}
        </Author>
        
        <Date>
          {formatDate(post["dia-mes-ano"] || post.date)}
        </Date>
        
        <Summary>
          {post.summary}
        </Summary>

        <ArrowIcon 
          icon={faArrowRight} 
          className="arrow-icon"
        />
      </ListItemContent>

      {post.forceHomePage && (
        <PinIcon
          icon={faThumbtack}
          title="Post fixado"
        />
      )}
    </ListItem>
  );
};

export default BlogPostListItem;
