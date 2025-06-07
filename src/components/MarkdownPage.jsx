import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Markdown from "markdown-to-jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import "./codeStyles.css";

const Root = styled(Container)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
});

const AuthorsSection = styled("div")({
  margin: "2rem 0",
  padding: "2rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
});

const AuthorsTitle = styled(Typography)({
  color: "#00508C",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  textAlign: "center",
});

const AuthorsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1.5rem",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "1rem",
  },
});

const AuthorCard = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1.5rem",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
  },
  "@media (max-width: 768px)": {
    flexDirection: "column",
    textAlign: "center",
    padding: "1rem",
  },
});

const AuthorPhoto = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #00508C",
  flexShrink: 0,
  "@media (max-width: 768px)": {
    width: "100px",
    height: "100px",
  },
});

const AuthorInfo = styled("div")({
  flex: 1,
});

const AuthorName = styled(Typography)({
  color: "#00508C",
  fontWeight: "600",
  fontSize: "1.1rem",
  marginBottom: "0.5rem",
});

const AuthorBio = styled(Typography)({
  color: "#666",
  fontSize: "0.9rem",
  lineHeight: "1.4",
});

const FallbackAuthor = styled("div")({
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "rgba(0, 80, 140, 0.05)",
  borderRadius: "8px",
});

const FallbackAuthorText = styled(Typography)({
  color: "#00508C",
  fontWeight: "500",
});

const MarkdownContainer = styled("div")({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "12px 120px",
  fontFamily: "'Poppins', sans-serif",

  "@media (max-width: 768px)": {
    padding: "16px",
    "& h1": { fontSize: "2rem" },
    "& h2": { fontSize: "1.5rem" },
    "& h3": { fontSize: "1.25rem" },
    "& h4": { fontSize: "1.1rem" },
    "& h5": { fontSize: "1rem" },
    "& h6": { fontSize: "0.9rem" },
    "& blockquote": {
      padding: "1rem",
      margin: "1.5rem 0"
    },
    "& pre": {
      padding: "1rem"
    },
    "& img": {
      maxWidth: "100%",
      margin: "1rem auto"
    }
  },
  "& table": {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    margin: "1.5rem auto",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    transform: "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    }
  },
  "& th": {
    background: "linear-gradient(135deg, #00508c, #003366)",
    color: "white",
    padding: "1rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  "& td": {
    padding: "1rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease"
  },
  "& tr:hover td": {
    backgroundColor: "rgba(0, 80, 140, 0.05)"
  },
  "& blockquote": {
    border: "none",
    padding: "1.5rem",
    margin: "2rem 0",
    background: "linear-gradient(135deg, rgba(250, 200, 0, 0.1), rgba(0, 80, 140, 0.1))",
    borderRadius: "16px",
    position: "relative",
    fontStyle: "italic",
    color: "#444",
    "&::before": {
      content: '"',
      position: "absolute",
      top: "-20px",
      left: "20px",
      fontSize: "60px",
      color: "rgba(0, 80, 140, 0.2)",
      fontFamily: "Georgia, serif"
    }
  },
  "& a, & a:link, & a:visited": {
    color: "#0077cc !important", // Brighter, more distinct blue
    textDecoration: "none !important",
    position: "relative",
    fontWeight: "600 !important", // Made bolder
    padding: "0 2px",
    transition: "all 0.2s ease",
    borderRadius: "3px",
    backgroundColor: "rgba(0, 119, 204, 0.05) !important", // Subtle background
    "&::after": {
      content: "''",
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "2px",
      backgroundColor: "#fac800",
      transform: "scaleX(0)",
      transition: "transform 0.2s ease"
    },
    "&:hover": {
      color: "#005999 !important", // Darker blue on hover
      backgroundColor: "rgba(0, 119, 204, 0.1) !important", // Slightly stronger background on hover
      textDecoration: "none !important",
      "&::after": {
        transform: "scaleX(1)"
      }
    }
  },

  // Ensure links within other elements maintain styling
  "& p a, & li a, & td a, & th a, & blockquote a": {
    color: "#0077cc !important",
    fontWeight: "600 !important",
    backgroundColor: "rgba(0, 119, 204, 0.05) !important",
    "&:hover": {
      color: "#005999 !important",
      backgroundColor: "rgba(0, 119, 204, 0.1) !important"
    }
  },
  "& img": {
    width: "100%",
    maxWidth: "800px",
    height: "auto",
    objectFit: "contain",
    display: "block",
    margin: "2rem auto",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
    }
  },
  "& pre": {
    background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    padding: "1.5rem",
    borderRadius: "16px",
    overflow: "hidden",
    margin: "1.5rem 0",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      height: "30px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "16px 16px 0 0"
    },
    "& code": {
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.9rem",
      lineHeight: "1.6"
    }
  },
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    margin: "0.75rem 0 0.25rem",
    color: "#00508c",
    fontWeight: "600",
    lineHeight: "1.3",
    display: "block",
    width: "100%",
    clear: "both",
    position: "relative"
  },
  "& h1": { fontSize: "2.25rem" },
  "& h2": { 
    fontSize: "1.75rem",
    marginTop: "2rem",
    marginBottom: "1rem"
  },
  "& h3": { 
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  "& h4": { fontSize: "1.25rem" },
  "& h5": { fontSize: "1.1rem" },
  "& h6": { fontSize: "1rem" },
  "& p": {
    lineHeight: "1.5",
    margin: "0.5rem 0",
    color: "#444",
    fontSize: "1rem"
  },
  "& ul, & ol": {
    paddingLeft: "0.75rem",
    margin: "0.5rem 0",
    listStyle: "none",
    "& li": {
      margin: "0.25rem 0",
      lineHeight: "1.5",
      position: "relative",
      paddingLeft: "1rem",
      fontSize: "1rem",
      color: "#444",
      "&::before": {
        content: "'•'",
        position: "absolute",
        left: "0",
        color: "#00508c",
        transition: "all 0.2s ease"
      },
      "&:hover::before": {
        color: "#fac800",
        transform: "scale(1.2)"
      }
    }
  },
  "@media (max-width: 768px)": {
    padding: "16px",
    "& h1": { fontSize: "2rem" },
    "& h2": { fontSize: "1.5rem" },
    "& h3": { fontSize: "1.25rem" },
    "& h4": { fontSize: "1.1rem" },
    "& h5": { fontSize: "1rem" },
    "& h6": { fontSize: "0.9rem" },
    "& blockquote": {
      padding: "1rem",
      margin: "1.5rem 0"
    },
    "& pre": {
      padding: "1rem"
    }
  }
});

const Title = styled(Typography)({
  color: "#00508C",
  marginBottom: "16px",
  fontWeight: "bold",
  textAlign: "center",
});

const MetaData = styled("div")({
  marginBottom: "16px",
  color: "#666",
  textAlign: "center",
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
    code: {
      component: ({ className, children, ...props }) => {
        const language = className?.replace("lang-", "") || "javascript";
        return (
          <pre className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  children,
                  Prism.languages[language],
                  language
                ),
              }}
            />
          </pre>
        );
      },
    },
    blockquote: {
      component: ({ children, ...props }) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    a: {
      component: ({ children, ...props }) => (
        <a 
          {...props}
          style={{
            color: '#0077cc',
            fontWeight: 600,
            textDecoration: 'none',
            backgroundColor: 'rgba(0, 119, 204, 0.05)',
            borderRadius: '3px',
            padding: '0 2px'
          }}
        >
          {children}
        </a>
      ),
    },
    img: {
      component: ({ children, ...props }) => (
        <img 
          {...props} 
          style={{ 
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }} 
        />
      ),
    },
  },
};

const MarkdownPage = ({ needsExternal, filepath }) => {
  const { id } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(false);
  const [hasExtendedAuthorInfo, setHasExtendedAuthorInfo] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchAuthors = async (postId) => {
    setAuthorsLoading(true);
    try {
      // Placeholder endpoint - replace with actual API endpoint when available
      const response = await axios.get(
        `https://api.ifmsabrazil.org/api/blogs/${postId}/authors`
      );
      
      // Check if the API response indicates extended author info is available
      if (response.data.hasExtendedInfo === false) {
        setHasExtendedAuthorInfo(false);
        setAuthors([]);
        return;
      }
      
      setHasExtendedAuthorInfo(true);
      setAuthors(response.data.authors || response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
      // Fallback to mock data for now (for development/testing)
      setHasExtendedAuthorInfo(true);
      setAuthors([
        {
          id: 1,
          name: "Dr. Maria Silva",
          bio: "Médica especialista em cardiologia com mais de 10 anos de experiência na área acadêmica e de pesquisa.",
          photo: "https://placehold.co/150"
        },
        {
          id: 2,
          name: "João Santos",
          bio: "Estudante de medicina e pesquisador em saúde pública, com foco em políticas de saúde.",
          photo: "https://placehold.co/150"
        }
      ]);
    } finally {
      setAuthorsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMarkdownExternal = async () => {
      try {
        const response = await axios.get(
          `https://api.ifmsabrazil.org/api/blogs/${id}`
        );
        const foundPost = response.data;

        if (!foundPost) {
          throw new Error("Post not found");
        }

        const markdownResponse = await axios.get(foundPost.link);
        const rawMarkdownContent = markdownResponse.data;
        setPost(foundPost);
        setMarkdownContent(rawMarkdownContent);
        
        // Fetch authors for this post
        await fetchAuthors(id);
      } catch (error) {
        console.error("Error loading markdown file:", error);
        setMarkdownContent(
          "# 404 Not Found\n\nThe requested post could not be found."
        );
        setNotFound(true);
      } finally {
        setPostLoading(false);
      }
    };

    const fetchMarkdownInternal = async () => {
      try {
        const response = await fetch(filepath);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error("Error fetching markdown file:", error);
        setMarkdownContent("# Erro ao carregar o arquivo Markdown");
      } finally {
        setPostLoading(false);
      }
    };

    if (needsExternal) {
      fetchMarkdownExternal();
    } else {
      fetchMarkdownInternal();
    }
  }, [id, needsExternal, filepath]);

  if (postLoading) {
    return <Loading />;
  }

  if (notFound) {
    return (
      <Root>
        <Typography variant="h6">Post not found</Typography>
      </Root>
    );
  }

  return (
    <Root>
      {needsExternal && post && (
        <>
          <Title variant="h4">{post.title}</Title>
          <MetaData>
            <Typography variant="subtitle2">
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </Typography>
          </MetaData>
        </>
      )}
      
      {needsExternal && post && (
        <AuthorsSection>
          {hasExtendedAuthorInfo && authors.length > 0 ? (
            <>
              <AuthorsTitle variant="h5">
                {authors.length > 1 ? "Autores" : "Autor"}
              </AuthorsTitle>
              <AuthorsGrid>
                {authors.map((author) => (
                  <AuthorCard key={author.id}>
                    <AuthorPhoto 
                      src={author.photo} 
                      alt={author.name}
                      onError={(e) => {
                        e.target.src = `https://placehold.co/150`;
                      }}
                    />
                    <AuthorInfo>
                      <AuthorName variant="h6">{author.name}</AuthorName>
                      <AuthorBio variant="body2">{author.bio}</AuthorBio>
                    </AuthorInfo>
                  </AuthorCard>
                ))}
              </AuthorsGrid>
            </>
          ) : (
            <FallbackAuthor>
              <FallbackAuthorText variant="body1">
                Escrito por: {post.author}
              </FallbackAuthorText>
            </FallbackAuthor>
          )}
        </AuthorsSection>
      )}
      
      <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
