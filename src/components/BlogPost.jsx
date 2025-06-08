import styled from "styled-components"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  height: min(220px, 50vw);
  background: white;
  border-radius: 24px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  border-width: calc(1px + (2 - 1) * ((100vw - 300px) / (1600 - 300)));
  border-style: solid;
  border-color: rgba(0, 80, 140, 0.1);

  @media (min-width: 1600px) {
    border-width: 2px;
  }

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  width: 100%;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 28px rgba(0, 80, 140, 0.12);
    border-color: rgba(0, 80, 140, 0.2);
  }

  @media (max-width: 768px) {
    height: min(160px, 40vw); // Slightly smaller height on mobile
    max-width: 100%;
    margin: 0 auto;
    border-radius: 16px !important;
  }
`

const ContentWrapper = styled(CardContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: calc(12px + (24 - 12) * ((100vw - 300px) / (1600 - 300)));
  gap: calc(6px + (12 - 6) * ((100vw - 300px) / (1600 - 300)));
  max-width: 60%;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 80, 140, 0.1),
      transparent
    );
  }

  @media (max-width: 768px) {
    max-width: 60%; // Maintain same width ratio on mobile
    padding: 12px;
    gap: 6px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  flex: 0 0 40%; // Changed to flex-shrink: 0 to prevent shrinking
  background: linear-gradient(45deg, #f0f4f8, #e6eef7);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 80, 140, 0.05),
      transparent
    );
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex: 0 0 40%; // Maintain same width ratio on mobile
  }
`

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`

const PostTitle = styled(Typography)`
  font-weight: 700 !important;
  color: #00508c !important;
  display: -webkit-box;
  -webkit-line-clamp: unset; // Remove fixed line clamp
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3 !important;
  letter-spacing: -0.05em;
  word-wrap: break-word;
  font-size: min(
    calc(14px + (22 - 14) * ((100vw - 300px) / (1600 - 300))),
    calc(100vw / 35)
  ) !important;
  max-height: ${props => {
    const lineHeight = 1.3;
    const fontSize = Math.min(
      14 + (22 - 14) * ((window.innerWidth - 300) / (1600 - 300)),
      window.innerWidth / 35
    );
    return `${lineHeight * fontSize * 3}px`; // Allow up to 3 lines
  }};
  margin-bottom: 4px;

  @media (max-width: 768px) {
    max-height: ${props => {
      const lineHeight = 1.1;
      const fontSize = Math.min(16, window.innerWidth / 25);
      return `${lineHeight * fontSize * 2}px`; // 2 lines on mobile
    }};
    font-size: min(16px, calc(100vw / 25)) !important;
    line-height: 1.1 !important;
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(0, 80, 140, 0.1);
  font-size: min(
    calc(10px + (14 - 10) * ((100vw - 300px) / (1600 - 300))),
    calc(100vw / 80)
  );
  flex-wrap: nowrap;
  width: 100%;

  > span:first-child {
    flex: 0 1 70%;  // Changed from 60% to 70%
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    gap: 6px;
    font-size: min(10px, calc(100vw / 45));
  }
`

const PostDate = styled.span`
  flex: 0 1 30%;  // Changed from 40% to 30%
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  
  &:before {
    content: '•';
    margin-right: 8px;
    color: rgba(0, 80, 140, 0.3);
  }

  @media (max-width: 768px) {
    &:before {
      margin-right: 6px;
    }
  }
`

const PostSummary = styled(Typography)`
  color: #555 !important;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4 !important;
  margin-top: auto !important;
  font-weight: 400;
  word-wrap: break-word;
  font-size: min(
    calc(12px + (16 - 12) * ((100vw - 300px) / (1600 - 300))),
    calc(100vw / 60)
  ) !important;

  @media (max-width: 768px) {
    -webkit-line-clamp: 3;
    font-size: min(12px, calc(100vw / 35)) !important;
    line-height: 1.3 !important;
  }
`

const BlogPost = ({ post }) => {
  return (
    <StyledCard elevation={0}>
      <ContentWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <span>{post.author}</span>
          <PostDate>
            {post.date ? new Date(post.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}) : ""}
          </PostDate>
        </PostMeta>
        <PostSummary>{post.summary}</PostSummary>
      </ContentWrapper>
      <ImageWrapper>
        <StyledCardMedia
          component="img"
          image={post.imageLink}
          alt={post.title || "Blog post image"}
        />
      </ImageWrapper>
    </StyledCard>
  )
}

export default BlogPost

