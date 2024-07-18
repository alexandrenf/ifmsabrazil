import React from "react";
import styled from "styled-components";
import { Box, Typography, Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

const ListItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ListItemContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
`;

const BlogPostListItem = ({ post }) => {
  return (
    <ListItem>
      <Avatar
        src={post.imageLink}
        variant="square"
        style={{ width: 80, height: 80, borderRadius: "8px" }}
      />
      <ListItemContent>
        <Typography
          component="h2"
          variant="h6"
          gutterBottom
          style={{ fontWeight: "500", marginBottom: "0em" }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          style={{ fontSize: "0.875rem" }}
        >
          {post.author}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          style={{ fontSize: "0.875rem" }}
        >
          {post.date
            ? new Date(post.date).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })
            : ""}
        </Typography>
        <Typography variant="body2" paragraph style={{ fontSize: "0.875rem" }}>
          {post.summary}
        </Typography>
      </ListItemContent>
      {post.forceHomePage && (
        <FontAwesomeIcon
          icon={faThumbtack}
          style={{ color: "#FAC800", marginLeft: "auto", fontSize: "1.5em" }}
        />
      )}
    </ListItem>
  );
};

export default BlogPostListItem;
