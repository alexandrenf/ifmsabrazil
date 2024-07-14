import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "./Loading.jsx"; // Ensure the path is correct

const RMCarousel = Carousel.default ? Carousel.default : Carousel;

const Root = styled(Container)({
  paddingLeft: "24px",
  paddingRight: "24px",
  paddingTop: "24px",
  paddingBottom: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
  position: "relative",
});

const MemberCard = styled(Box)({
  padding: "16px",
  margin: "8px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "auto", // Allow height to adjust based on content
  minHeight: "300px", // Ensure minimum height for visual consistency
  overflow: "hidden",
});

const MemberAvatar = styled(Avatar)({
  width: "120px", // Adjusted size for better appearance
  height: "120px", // Adjusted size for better appearance
  marginBottom: "16px",
  borderRadius: "12px", // Rounded corners for square images
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
});

const DynamicTypography = styled(Typography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "normal", // Allows text to wrap
  wordWrap: "break-word", // Ensures long words break to the next line
  width: "100%", // Ensures it uses full available width
  display: "block", // Makes sure the element behaves like a block element
});

const MemberRole = styled(Typography)({
  color: "#1976d2",
  marginBottom: "8px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "normal", // Allows text to wrap
  wordWrap: "break-word", // Ensures long words break to the next line
  width: "100%", // Ensures it uses full available width
  display: "block", // Makes sure the element behaves like a block element
});

const MemberEmail = styled(Typography)({
  color: "#333",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "normal", // Allows text to wrap
  wordWrap: "break-word", // Ensures long words break to the next line
  width: "100%", // Ensures it uses full available width
  display: "block", // Makes sure the element behaves like a block element
});

const Gallery = ({ url, nameOnPage }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching EB members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        {nameOnPage}
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
            <MemberAvatar src={member.imageLink} alt={member.name} />
            <DynamicTypography variant="h6">{member.name}</DynamicTypography>
            <MemberRole variant="body1">
              {member.role} {member.acronym ? "(" + member.acronym + ")" : null}
            </MemberRole>
            <MemberEmail variant="body2">{member.email}</MemberEmail>
          </MemberCard>
        ))}
      </RMCarousel>
    </Root>
  );
};

export default Gallery;
