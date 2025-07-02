import React, { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import styled, { keyframes, css } from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "../components/codeStyles.css";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const sparkle = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 0.7; }
  100% { transform: scale(1.2) rotate(15deg); opacity: 1; }
`;

const skeletonPulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const fadeInWord = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

// Magical Summary Components
const SummaryContainer = styled.div`
  background: linear-gradient(135deg, rgba(221, 214, 254, 0.3), rgba(243, 240, 255, 0.5));
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 2px solid transparent;
  background-image: linear-gradient(135deg, rgba(221, 214, 254, 0.3), rgba(243, 240, 255, 0.5)), linear-gradient(135deg, #ddd6fe, #f3f0ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(221, 214, 254, 0.4), transparent);
    animation: ${shimmer} 3s infinite;
    z-index: 1;
  }

  &.animation-complete::before {
    animation: none;
    opacity: 0;
  }

  &.collapsed {
    padding: 1rem 2rem;
    
    .summary-content {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 12px;
    
    &.collapsed {
      padding: 1rem 1.5rem;
    }
  }
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const SummaryTitle = styled.div`
  color: #7c3aed;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const SparkleIcon = styled.span`
  font-size: 1.5rem;
  animation: ${sparkle} 1.5s ease-in-out infinite alternate;

  &.animation-complete {
    animation: none;
  }
`;

const ToggleButton = styled.button`
  background: linear-gradient(135deg, #ddd6fe, #f3f0ff);
  border: 1px solid #c4b5fd;
  border-radius: 8px;
  color: #7c3aed;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15);
    background-color: #f3f0ff;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const SkeletonLine = styled.div`
  height: 1rem;
  background: linear-gradient(90deg, rgba(221, 214, 254, 0.4), rgba(243, 240, 255, 0.8), rgba(221, 214, 254, 0.4));
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  animation: ${skeletonPulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

const TypewriterText = styled.div`
  color: #4c1d95;
  font-size: 1rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  min-height: 3rem;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2rem;
  background-color: #a855f7;
  margin-left: 2px;
  animation: ${blink} 1s infinite;
`;

const MagicalSummary = ({ content }) => {
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
        }, 150 + Math.random() * 100); // Vary timing slightly for natural feel

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
        <SummaryTitle>
          <SparkleIcon>✨</SparkleIcon>
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

const MarkdownContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 8px;  // Reduced padding
  @media (max-width: 768px) {
    padding: 12px 48px;
  }
  font-family: 'Poppins', sans-serif;

  & table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }
  }

  & th {
    background: linear-gradient(135deg, #00508c, #003366);
    color: white;
    padding: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  & td {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  & tr:hover td {
    background-color: rgba(0, 80, 140, 0.05);
  }

  & blockquote {
    border: none;
    padding: 1.5rem;
    margin: 2rem 0;
    background: linear-gradient(135deg, rgba(250, 200, 0, 0.1), rgba(0, 80, 140, 0.1));
    border-radius: 16px;
    position: relative;
    font-style: italic;
    color: #444;
    border-left: 4px solid #00508c;
    
    &::before {
      content: '""';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 40px;
      color: rgba(0, 80, 140, 0.3);
      font-family: Georgia, serif;
      font-weight: bold;
    }
  }

  & a {
    color: #00508c;
    text-decoration: none;
    position: relative;
    font-weight: 500;
    padding: 0 2px;
    transition: all 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #fac800;
      transform: scaleX(0);
      transition: transform 0.2s ease;
    }

    &:hover {
      color: #003459;
      
      &::after {
        transform: scaleX(1);
      }
    }
  }

  & img {
    width: 100%;
    max-width: 800px;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 2rem auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${float} 6s ease-in-out infinite;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    }
  }

  & h1, & h2, & h3, & h4, & h5, & h6 {
    margin: 0.5rem 0 0.5rem;  // Reduced margins for all headers
    display: block;
    width: 100%;
    clear: both;
    position: relative;
    color: #00508c;
    font-weight: 600;
    line-height: 1.3;
  }

  & h1 { font-size: 2.25rem; }
  & h2 { 
    font-size: 1.75rem;
    margin-top: 2rem;      // Reduced from 3rem
    margin-bottom: 1rem;   // Reduced from 2rem
    display: block;
    width: 100%;
    clear: both;
  }
  & h3 { 
    font-size: 1.5rem;
    margin-top: 1.5rem;    // Reduced from 2.5rem
    margin-bottom: 1rem;   // Reduced from 1.5rem
    display: block;
    width: 100%;
    clear: both;
  }
  & h4 { font-size: 1.25rem; }
  & h5 { font-size: 1.1rem; }
  & h6 { font-size: 1rem; }

  & pre {
    background-color: #1a1a1a !important;
    color: #f8f8f2 !important;
    padding: 1.5rem !important;
    border-radius: 12px !important;
    overflow: auto !important;
    margin: 1.5rem 0 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    position: relative;
    font-family: 'Fira Code', monospace !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    border: none !important;
    white-space: pre !important;
    word-wrap: normal !important;
    containment: layout style;

    & * {
      font-family: 'Fira Code', monospace !important;
    }

    & code {
      background-color: transparent !important;
      color: inherit !important;
      padding: 0 !important;
      border: none !important;
      border-radius: 0 !important;
      font-family: inherit !important;
      font-size: inherit !important;
      line-height: inherit !important;
      white-space: pre !important;
      word-wrap: normal !important;
      word-break: normal !important;
      word-spacing: normal !important;
      tab-size: 2;
    }
  }

  & code:not(pre code) {
    background-color: rgba(0, 80, 140, 0.08) !important;
    color: #00508C !important;
    padding: 0.2em 0.4em !important;
    border-radius: 4px !important;
    font-size: 0.9em !important;
    font-family: 'Fira Code', monospace !important;
    border: 1px solid rgba(0, 80, 140, 0.12) !important;
    white-space: nowrap !important;
  }

  & p {
    line-height: 1.5;
    margin: 0.5rem 0;  // Reduced margins
    color: #444;
    font-size: 1rem;
  }

  & ul, & ol {
    padding-left: 0.75rem;  // Reduced padding
    margin: 0.5rem 0;  // Reduced margins
    list-style: none;

    & li {
      margin: 0.25rem 0;  // Reduced margins
      line-height: 1.5;
      position: relative;
      padding-left: 1rem;  // Reduced padding
      font-size: 1rem;
      color: #444;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #00508c;
        transition: all 0.2s ease;
      }

      &:hover::before {
        color: #fac800;
        transform: scale(1.2);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 8px;  // Even smaller padding on mobile

    & h1 { font-size: 2rem; }
    & h2 { font-size: 1.5rem; }
    & h3 { font-size: 1.25rem; }
    & h4 { font-size: 1.1rem; }
    & h5 { font-size: 1rem; }
    & h6 { font-size: 0.9rem; }

    & blockquote {
      padding: 1rem;
      margin: 1.5rem 0;
    }

    & pre {
      padding: 1rem;
    }
  }
`;

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
        <img 
          {...props} 
          alt={props.alt || ""} 
          style={{ 
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
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
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          Prism.highlightAll();
        }, [children]);

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
            >
              {children}
            </code>
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
    br: {
      component: ({ className }) => {
        if (className === 'header-break') {
          return <div style={{ height: '0.3rem', width: '100%', clear: 'both' }} />;
        }
        return <br />;
      }
    },
    h2: {
      component: ({ children, ...props }) => (
        <h2 style={{ width: 'fit-content', display: 'block' }} {...props}>
          {children}
        </h2>
      ),
    },
  },
};

const MarkdownContent = ({ content }) => {
  const containerRef = useRef(null);

  // Format markdown content to ensure proper line breaks
  const formatMarkdownContent = (content) => {
    return content
      // Add explicit HTML breaks between headers
      .replace(/(#{2,3}[^\n]+)/g, '$1\n<br class="header-break"/>\n')
      // Clean up multiple breaks
      .replace(/<br class="header-break"\/>\n{2,}/g, '<br class="header-break"/>\n')
      // Remove excessive newlines
      .replace(/\n{4,}/g, '\n\n\n')
      .trim();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const headings = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const formattedContent = formatMarkdownContent(content);

  return (
    <MarkdownContainer ref={containerRef}>
      <Markdown options={MarkdownOptions}>{formattedContent}</Markdown>
    </MarkdownContainer>
  );
};

export default MarkdownContent;
