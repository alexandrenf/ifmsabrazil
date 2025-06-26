import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet-async";
import Markdown from "markdown-to-jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import "./codeStyles.css";

const Root = styled(Container)({
  padding: "24px",
  backgroundColor: "#FFFFFF",
  color: "#333",
});

const PostHeader = styled("div")({
  background: "linear-gradient(135deg, rgba(0, 80, 140, 0.02), rgba(250, 200, 0, 0.02))",
  borderRadius: "16px",
  padding: "2.5rem 2rem 2rem 2rem",
  marginBottom: "2.5rem",
  border: "1px solid rgba(0, 80, 140, 0.06)",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    height: "3px",
    background: "linear-gradient(90deg, #00508C, #FAC800)",
    borderRadius: "16px 16px 0 0"
  },
  "@media (max-width: 768px)": {
    padding: "2rem 1.5rem 1.5rem 1.5rem",
    marginBottom: "2rem"
  }
});

const Title = styled(Typography)({
  color: "#00508C",
  fontWeight: "700",
  textAlign: "center",
  fontSize: "2.2rem",
  lineHeight: "1.3",
  marginBottom: "1.5rem",
  letterSpacing: "-0.02em",
  "@media (max-width: 768px)": {
    fontSize: "1.8rem",
    marginBottom: "1.2rem"
  }
});

const PostMeta = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "1rem"
  }
});

const DateInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  color: "#666",
  fontSize: "0.95rem",
  fontWeight: "500",
  padding: "0.7rem 1.2rem",
  backgroundColor: "white",
  borderRadius: "30px",
  border: "1px solid rgba(0, 80, 140, 0.12)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  "& svg": {
    opacity: 0.7
  }
});

const AuthorsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.8rem"
});

const AuthorChip = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  padding: "0.7rem 1.2rem",
  backgroundColor: "white",
  borderRadius: "30px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  border: "1px solid rgba(0, 80, 140, 0.12)",
  transition: "all 0.2s ease",
  position: "relative",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  zIndex: 100,
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    borderColor: "rgba(0, 80, 140, 0.2)"
  },
  "@media (min-width: 769px)": {
    "&:hover .author-tooltip-container": {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto"
    }
  }
});

const AuthorPhoto = styled("img")({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid rgba(0, 80, 140, 0.1)",
  flexShrink: 0
});

const AuthorInfo = styled("div")({
  textAlign: "left",
  minWidth: 0
});

const AuthorName = styled(Typography)({
  color: "#00508C",
  fontWeight: "600",
  fontSize: "0.9rem",
  lineHeight: "1.3",
  margin: "0"
});

const AuthorTitle = styled(Typography)({
  color: "#666",
  fontSize: "0.8rem",
  lineHeight: "1.2",
  margin: "0",
  marginTop: "0.1rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px"
});

const FallbackAuthor = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  color: "#666",
  fontSize: "0.95rem",
  fontWeight: "500",
  padding: "0.7rem 1.2rem",
  backgroundColor: "white",
  borderRadius: "30px",
  border: "1px solid rgba(0, 80, 140, 0.12)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
});

const Divider = styled("div")({
  width: "1px",
  height: "30px",
  backgroundColor: "rgba(0, 80, 140, 0.15)",
  "@media (max-width: 768px)": {
    display: "none"
  }
});

const MarkdownContainer = styled("div")({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "12px 120px",
  "@media (max-width: 768px)": {
    padding: "12px 48px"
  },
  fontFamily: "'Poppins', sans-serif",
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
    },
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
    borderLeft: "4px solid #00508c",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "20px",
      fontSize: "40px",
      color: "rgba(0, 80, 140, 0.3)",
      fontFamily: "Georgia, serif",
      fontWeight: "bold"
    }
  },
  "& a, & a:link, & a:visited": {
    color: "#0077cc !important",
    textDecoration: "none !important",
    position: "relative",
    fontWeight: "600 !important",
    padding: "0 2px",
    transition: "all 0.2s ease",
    borderRadius: "3px",
    backgroundColor: "rgba(0, 119, 204, 0.05) !important",
    wordBreak: "break-all !important",
    overflowWrap: "anywhere !important",
    wordWrap: "break-word !important",
    maxWidth: "100% !important",
    whiteSpace: "normal !important",
    lineBreak: "anywhere !important",
    hyphens: "none !important",
    WebkitHyphens: "none !important",
    MozHyphens: "none !important",
    msHyphens: "none !important",
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
      color: "#005999 !important",
      backgroundColor: "rgba(0, 119, 204, 0.1) !important",
      textDecoration: "none !important",
      "&::after": {
        transform: "scaleX(1)"
      }
    }
  },
  "& p a, & li a, & td a, & th a, & blockquote a": {
    color: "#0077cc !important",
    fontWeight: "600 !important",
    backgroundColor: "rgba(0, 119, 204, 0.05) !important",
    wordBreak: "break-all !important",
    overflowWrap: "anywhere !important",
    wordWrap: "break-word !important",
    maxWidth: "100% !important",
    whiteSpace: "normal !important",
    lineBreak: "anywhere !important",
    hyphens: "none !important",
    WebkitHyphens: "none !important",
    MozHyphens: "none !important",
    msHyphens: "none !important",
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
    backgroundColor: "#1a1a1a !important",
    color: "#f8f8f2 !important",
    padding: "1.5rem !important",
    borderRadius: "12px !important",
    overflow: "auto !important",
    margin: "1.5rem 0 !important",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15) !important",
    position: "relative",
    fontFamily: "'Fira Code', monospace !important",
    fontSize: "0.9rem !important",
    lineHeight: "1.6 !important",
    border: "none !important",
    whiteSpace: "pre !important",
    wordWrap: "normal !important",
    containment: "layout style",
    "& *": {
      fontFamily: "'Fira Code', monospace !important"
    },
    "& code": {
      backgroundColor: "transparent !important",
      color: "inherit !important",
      padding: "0 !important",
      border: "none !important",
      borderRadius: "0 !important",
      fontFamily: "inherit !important",
      fontSize: "inherit !important",
      lineHeight: "inherit !important",
      whiteSpace: "pre !important",
      wordWrap: "normal !important",
      wordBreak: "normal !important",
      wordSpacing: "normal !important",
      tabSize: "2"
    }
  },
  "& code:not(pre code)": {
    backgroundColor: "rgba(0, 80, 140, 0.08) !important",
    color: "#00508C !important",
    padding: "0.2em 0.4em !important",
    borderRadius: "4px !important",
    fontSize: "0.9em !important",
    fontFamily: "'Fira Code', monospace !important",
    border: "1px solid rgba(0, 80, 140, 0.12) !important",
    whiteSpace: "nowrap !important"
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
    },
    "& img": {
      maxWidth: "100%",
      margin: "1rem auto"
    }
  }
});

const MetaData = styled("div")({
  marginBottom: "16px",
  color: "#666",
  textAlign: "center",
});

// Add the magical summary component
const SummaryContainer = styled("div")({
  background: "linear-gradient(135deg, rgba(221, 214, 254, 0.3), rgba(243, 240, 255, 0.5))",
  borderRadius: "16px",
  padding: "2rem",
  margin: "2rem 0",
  border: "2px solid transparent",
  backgroundImage: "linear-gradient(135deg, rgba(221, 214, 254, 0.3), rgba(243, 240, 255, 0.5)), linear-gradient(135deg, #ddd6fe, #f3f0ff)",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(221, 214, 254, 0.4), transparent)",
    animation: "shimmer 3s infinite",
    zIndex: 1
  },
  "&.animation-complete::before": {
    animation: "none",
    opacity: 0
  },
  "&.collapsed": {
    padding: "1rem 2rem",
    "& .summary-content": {
      display: "none"
    }
  },
  "@keyframes shimmer": {
    "0%": { left: "-100%" },
    "100%": { left: "100%" }
  },
  "@media (max-width: 768px)": {
    padding: "1.5rem",
    margin: "1.5rem 0",
    borderRadius: "12px",
    "&.collapsed": {
      padding: "1rem 1.5rem"
    }
  }
});

const SummaryHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
  position: "relative",
  zIndex: 2,
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: "1rem"
  }
});

const SummaryTitle = styled(Typography)({
  color: "#7c3aed",
  fontWeight: "700",
  fontSize: "1.2rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  margin: 0,
  "&::before": {
    content: '"✨"',
    fontSize: "1.5rem"
  }
});

const ToggleButton = styled("button")({
  background: "linear-gradient(135deg, #ddd6fe, #f3f0ff)",
  border: "1px solid #c4b5fd",
  borderRadius: "8px",
  color: "#7c3aed",
  padding: "0.5rem 1rem",
  fontSize: "0.85rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.15)",
    backgroundColor: "#f3f0ff"
  },
  "&:active": {
    transform: "translateY(0)"
  }
});

const LoadingSkeleton = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  marginBottom: "1rem"
});

const SkeletonLine = styled("div")(({ width = "100%", delay = 0 }) => ({
  height: "1rem",
  background: "linear-gradient(90deg, rgba(221, 214, 254, 0.4), rgba(243, 240, 255, 0.8), rgba(221, 214, 254, 0.4))",
  borderRadius: "4px",
  width: width,
  animation: `skeletonPulse 1.5s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  "@keyframes skeletonPulse": {
    "0%": { opacity: 0.6 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0.6 }
  }
}));

const TypewriterText = styled("div")({
  color: "#4c1d95",
  fontSize: "1rem",
  lineHeight: "1.6",
  position: "relative",
  zIndex: 2,
  minHeight: "3rem"
});

const Cursor = styled("span")({
  display: "inline-block",
  width: "2px",
  height: "1.2rem",
  backgroundColor: "#a855f7",
  marginLeft: "2px",
  animation: "blink 1s infinite",
  "@keyframes blink": {
    "0%, 50%": { opacity: 1 },
    "51%, 100%": { opacity: 0 }
  }
});

const MagicalSummary = ({ content, post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading time - faster now
    const loadingTimer = setTimeout(() => {
      // Use the actual content from the code block
      setSummary(content.trim());
      setIsLoading(false);
      setShowCursor(true);
    }, 1500); // Changed from 2500 to 1500

    return () => clearTimeout(loadingTimer);
  }, [content]);

  useEffect(() => {
    if (!isLoading && summary && !isComplete) {
      const words = summary.split(' ');
      
      if (currentWordIndex < words.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => {
            const newText = prev + (prev ? ' ' : '') + words[currentWordIndex];
            return newText;
          });
          setCurrentWordIndex(prev => prev + 1);
        }, 50 + Math.random() * 100); // Vary timing slightly for natural feel

        return () => clearTimeout(timer);
      } else if (currentWordIndex >= words.length && !isComplete) {
        // Animation complete
        setIsComplete(true);
        setShowCursor(false);
      }
    }
  }, [currentWordIndex, summary, isLoading, isComplete]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SummaryContainer className={`${isCollapsed ? 'collapsed' : ''} ${isComplete ? 'animation-complete' : ''}`}>
      <SummaryHeader>
        <SummaryTitle className={isComplete ? 'animation-complete' : ''}>
          Resumo do artigo:
        </SummaryTitle>
        <ToggleButton onClick={toggleCollapse}>
          {isCollapsed ? 'Mostrar' : 'Ocultar'}
        </ToggleButton>
      </SummaryHeader>
      
      <div className="summary-content">
        {isLoading ? (
          <LoadingSkeleton>
            <SkeletonLine width="90%" delay={0} />
            <SkeletonLine width="95%" delay={0.2} />
            <SkeletonLine width="85%" delay={0.4} />
            <SkeletonLine width="75%" delay={0.6} />
          </LoadingSkeleton>
        ) : (
          <TypewriterText>
            {displayedText}
            {showCursor && !isComplete && <Cursor />}
          </TypewriterText>
        )}
      </div>
    </SummaryContainer>
  );
};

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
        // Check for magical summary block
        if (className === "lang-summary" || className === "lang-resumo") {
          return <MagicalSummary content={children} />;
        }

        // Check if this is inline code (no className) or a code block
        if (!className) {
          // Inline code
          return (
            <code
              style={{
                backgroundColor: 'rgba(0, 80, 140, 0.08)',
                color: '#00508C',
                padding: '0.2em 0.4em',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: "'Fira Code', monospace",
                border: '1px solid rgba(0, 80, 140, 0.12)',
                whiteSpace: 'nowrap'
              }}
              {...props}
            >
              {children}
            </code>
          );
        }

        // Code block - extract language
        const language = className.replace("lang-", "") || "text";
        
        // Ensure Prism has the language
        const supportedLanguage = Prism.languages[language] ? language : "text";
        
        return (
          <pre 
            className={`language-${supportedLanguage}`}
            style={{
              backgroundColor: '#1a1a1a',
              color: '#f8f8f2',
              padding: '1.5rem',
              borderRadius: '12px',
              overflow: 'auto',
              margin: '1.5rem 0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            <code
              className={`language-${supportedLanguage}`}
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
                padding: '0',
                border: 'none',
                borderRadius: '0',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                whiteSpace: 'pre',
                wordWrap: 'normal',
                wordBreak: 'normal',
                wordSpacing: 'normal',
                tabSize: '2'
              }}
              dangerouslySetInnerHTML={{
                __html: supportedLanguage !== "text" && Prism.languages[supportedLanguage]
                  ? Prism.highlight(children, Prism.languages[supportedLanguage], supportedLanguage)
                  : children,
              }}
            />
          </pre>
        );
      },
    },
    pre: {
      component: ({ children, ...props }) => {
        // If pre contains code with className, let the code component handle it
        if (React.Children.toArray(children).some(child => 
          React.isValidElement(child) && child.props?.className?.startsWith('lang-')
        )) {
          return <>{children}</>;
        }
        
        // Plain pre block
        return (
          <pre
            style={{
              backgroundColor: '#1a1a1a',
              color: '#f8f8f2',
              padding: '1.5rem',
              borderRadius: '12px',
              overflow: 'auto',
              margin: '1.5rem 0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.9rem',
              lineHeight: '1.6',
              whiteSpace: 'pre',
              wordWrap: 'normal'
            }}
            {...props}
          >
            {children}
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
            padding: '0 2px',
            wordBreak: 'break-all',
            overflowWrap: 'anywhere',
            wordWrap: 'break-word',
            maxWidth: '100%',
            whiteSpace: 'normal',
            lineBreak: 'anywhere',
            hyphens: 'none',
            WebkitHyphens: 'none',
            MozHyphens: 'none',
            msHyphens: 'none'
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

// Date icon component
const DateInfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 8.5 21 8.5Z" stroke="#666" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AuthorTooltip = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 10px)",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "white",
  border: "1px solid rgba(0, 80, 140, 0.15)",
  borderRadius: "12px",
  padding: "1rem",
  minWidth: "280px",
  maxWidth: "320px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  zIndex: 9999,
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.2s ease, visibility 0.2s ease",
  pointerEvents: "none",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "-5px",
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    width: "10px",
    height: "10px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 80, 140, 0.15)",
    borderRight: "none",
    borderBottom: "none",
    zIndex: 10000
  },
  "&.active": {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto"
  },
  "@media (max-width: 768px)": {
    position: "absolute",
    top: "auto",
    bottom: "calc(100% + 10px)",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "280px",
    maxWidth: "calc(100vw - 32px)",
    zIndex: 9999,
    "&::before": {
      top: "auto",
      bottom: "-5px",
      transform: "translateX(-50%) rotate(225deg)",
      zIndex: 10000
    }
  }
}));

const TooltipHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  marginBottom: "0.8rem"
});

const TooltipPhoto = styled("img")({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid rgba(0, 80, 140, 0.1)",
  flexShrink: 0
});

const TooltipInfo = styled("div")({
  flex: 1
});

const TooltipName = styled(Typography)({
  color: "#00508C",
  fontWeight: "600",
  fontSize: "1rem",
  lineHeight: "1.3",
  margin: "0"
});

const TooltipRole = styled(Typography)({
  color: "#666",
  fontSize: "0.85rem",
  lineHeight: "1.3",
  margin: "0",
  marginTop: "0.1rem"
});

const TooltipBio = styled(Typography)({
  color: "#444",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  margin: "0"
});

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const MarkdownPage = ({ needsExternal, filepath }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(false);
  const [hasExtendedAuthorInfo, setHasExtendedAuthorInfo] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update URL with title slug when post is loaded
  useEffect(() => {
    if (post && post.title) {
      const titleSlug = slugify(post.title);
      const currentPath = window.location.pathname;
      const newPath = `/arquivo/${id}/${titleSlug}`;
      
      // Only update URL if it's different from current
      if (currentPath !== newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [post, id, navigate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuthorClick = (authorId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isMobile) {
      setActiveTooltip(activeTooltip === authorId ? null : authorId);
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeTooltip && !event.target.closest('.author-tooltip-container')) {
        setActiveTooltip(null);
      }
    };

    if (activeTooltip) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeTooltip]);

  const fetchAuthors = async (postId) => {
    setAuthorsLoading(true);
    try {
      // Placeholder endpoint - replace with actual API endpoint when available
      const response = await axios.get(
        `https://blog2.ifmsabrazil.org/api/blogs/${postId}/authors`
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
      // Default to legacy author format on error
      setHasExtendedAuthorInfo(false);
      setAuthors([]);
    } finally {
      setAuthorsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMarkdownExternal = async () => {
      try {
        const response = await axios.get(
          `https://blog2.ifmsabrazil.org/api/blogs/${id}`
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

  // Helper function to clean and truncate summary for meta description
  const cleanSummary = (summary) => {
    if (!summary) return "IFMSA Brazil - International Federation of Medical Students' Associations of Brazil";
    
    // Remove HTML tags and extra whitespace, truncate to 155 characters for optimal SEO
    const cleaned = summary.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return cleaned.length > 155 ? cleaned.substring(0, 152) + '...' : cleaned;
  };

  const generateCanonicalUrl = () => {
    if (!post || !id) return `${window.location.origin}/`;
    const titleSlug = slugify(post.title);
    return `${window.location.origin}/arquivo/${id}/${titleSlug}`;
  };

  return (
    <Root>
      {needsExternal && post && (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>{post.title} - IFMSA Brazil</title>
          <meta name="description" content={cleanSummary(post.summary)} />
          <link rel="canonical" href={generateCanonicalUrl()} />
          
          {/* Open Graph Tags for Social Media */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={cleanSummary(post.summary)} />
          <meta property="og:url" content={generateCanonicalUrl()} />
          <meta property="og:site_name" content="IFMSA Brazil" />
          <meta property="og:locale" content="pt_BR" />
          {post.imageLink && (
            <>
              <meta property="og:image" content={post.imageLink} />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta property="og:image:alt" content={post.title} />
            </>
          )}
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={cleanSummary(post.summary)} />
          {post.imageLink && (
            <meta name="twitter:image" content={post.imageLink} />
          )}
          
          {/* Article specific tags */}
          {post.date && (
            <meta property="article:published_time" content={new Date(post.date).toISOString()} />
          )}
          {post.author && (
            <meta property="article:author" content={post.author} />
          )}
          <meta property="article:section" content="Blog" />
          
          {/* WhatsApp specific optimization */}
          <meta property="og:image:type" content="image/jpeg" />
        </Helmet>
      )}
      
      {needsExternal && post && (
        <>
          <PostHeader>
            <Title variant="h4">{post.title}</Title>
            <PostMeta>
              <DateInfo>
                <DateInfoIcon />
                <Typography variant="body2">
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </Typography>
              </DateInfo>
              {hasExtendedAuthorInfo && authors.length > 0 ? (
                <>
                  <Divider />
                  <AuthorsContainer>
                    {authors.map((author) => (
                      <AuthorChip 
                        key={author.id} 
                        onClick={(e) => handleAuthorClick(author.id, e)}
                        className="author-chip"
                      >
                        <AuthorPhoto 
                          src={author.photo} 
                          alt={author.name}
                          onError={(e) => {
                            e.target.src = `https://placehold.co/150`;
                          }}
                        />
                        <AuthorInfo>
                          <AuthorName variant="body2">{author.name}</AuthorName>
                          <AuthorTitle variant="body2">{author.bio}</AuthorTitle>
                        </AuthorInfo>
                        <AuthorTooltip 
                          className={`author-tooltip-container ${activeTooltip === author.id ? 'active' : ''}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TooltipHeader>
                            <TooltipPhoto 
                              src={author.photo} 
                              alt={author.name}
                              onError={(e) => {
                                e.target.src = `https://placehold.co/150`;
                              }}
                            />
                            <TooltipInfo>
                              <TooltipName>{author.name}</TooltipName>
                              <TooltipRole>Autor</TooltipRole>
                            </TooltipInfo>
                          </TooltipHeader>
                          <TooltipBio>{author.bio}</TooltipBio>
                        </AuthorTooltip>
                      </AuthorChip>
                    ))}
                  </AuthorsContainer>
                </>
              ) : (
                <>
                  <Divider />
                  <FallbackAuthor>
                    Escrito por: {post.author}
                  </FallbackAuthor>
                </>
              )}
            </PostMeta>
          </PostHeader>
        </>
      )}
      
      <MarkdownContainer>
        <Markdown options={MarkdownOptions}>{markdownContent}</Markdown>
      </MarkdownContainer>
    </Root>
  );
};

export default MarkdownPage;
