import React, { useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Typography } from "@mui/material";
import {
  display,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  styled,
  width,
} from "@mui/system";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "../components/codeStyles.css"; // Your custom styles

const MarkdownContainer = styled("div")({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "16px",
  "& table": {
    width: "100%",
    maxWidth: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
    overflowX: "auto",
    display: "block",
    margin: "0 auto",
  },
  "& th, & td": {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  "& th": {
    backgroundColor: "#f2f2f2",
  },
  "& blockquote": {
    borderLeft: "4px solid #ddd",
    paddingLeft: "16px",
    color: "#666",
    margin: "16px 0",
    fontStyle: "italic",
    "& blockquote": {
      borderLeft: "4px solid #bbb",
      margin: "16px 0 0",
      paddingLeft: "16px",
    },
  },
  "& a": {
    color: "#00508C",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "& img": {
    minWidth: "50%",
    maxWidth: "75%",
    minHeight: "auto",
    maxHeight: "50%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  "& ul, & ol": {
    paddingLeft: "40px", // Indentation for list items
  },
  "& ul + *, & ol + *": {
    marginTop: "16px", // Margin to reset indentation for elements following lists
    paddingLeft: "0", // Reset padding for elements following lists
  },
});

const MarkdownOptions = {
  overrides: {
    table: {
      component: ({ children, ...props }) => (
        <div style={{ overflowX: "auto" }}>
          <table {...props}>{children}</table>
        </div>
      ),
    },
    th: {
      component: ({ children, ...props }) => <th {...props}>{children}</th>,
    },
    td: {
      component: ({ children, ...props }) => (
        <td {...props} data-label={props["data-label"]}>
          {children}
        </td>
      ),
    },
    blockquote: {
      component: ({ children, ...props }) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    a: {
      component: ({ children, ...props }) => <a {...props}>{children}</a>,
    },
    img: {
      component: ({ children, ...props }) => (
        <img {...props} style={{ maxWidth: "100%", height: "auto" }} />
      ),
    },
    code: {
      component: ({ children, ...props }) => {
        const language =
          props.className?.replace("language-", "") || "javascript";
        useEffect(() => {
          Prism.highlightAll();
        }, [children]);

        return (
          <pre className={`language-${language}`}>
            <code className={`language-${language}`}>{children}</code>
          </pre>
        );
      },
    },
  },
};

const MarkdownContent = ({ content }) => {
  return (
    <MarkdownContainer>
      <Markdown options={MarkdownOptions}>{content}</Markdown>
    </MarkdownContainer>
  );
};

export default MarkdownContent;
