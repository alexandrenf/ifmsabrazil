import React, { useEffect, useRef } from "react";
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

const MarkdownContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 8px;  // Reduced padding
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
    
    &::before {
      content: '"';
      position: absolute;
      top: -20px;
      left: 20px;
      font-size: 60px;
      color: rgba(0, 80, 140, 0.2);
      font-family: Georgia, serif;
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
    margin: 0.75rem 0 0.25rem;  // Significantly reduced margins
    color: #00508c;
    font-weight: 600;
    line-height: 1.3;
    display: inline-block;
  }

  & h1 { font-size: 2.25rem; }
  & h2 { 
    font-size: 1.75rem;
    margin-top: 1rem;  // Slightly more space before h2
    width: fit-content;
  }
  & h3 { 
    font-size: 1.5rem;
    margin-top: 1rem;  // Reduced from 1.75rem
  }
  & h4 { font-size: 1.25rem; }
  & h5 { font-size: 1.1rem; }
  & h6 { font-size: 1rem; }


  /* Base header styles */
  & h1, & h2, & h3, & h4, & h5, & h6 {
    margin: 0.5rem 0 0.5rem;  // Reduced margins for all headers
    display: block;
    width: 100%;
    clear: both;
    position: relative;
  }

  & pre {
    background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
    padding: 1.5rem;
    border-radius: 16px;
    overflow: hidden;
    margin: 1.5rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px 16px 0 0;
    }

    & code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }
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

  /* Add explicit spacing between headers */
  & h2 {
    margin-top: 2rem;      // Reduced from 3rem
    margin-bottom: 1rem;   // Reduced from 2rem
    display: block;
    width: 100%;
    clear: both;
  }

  & h3 {
    margin-top: 1.5rem;    // Reduced from 2.5rem
    margin-bottom: 1rem;   // Reduced from 1.5rem
    display: block;
    width: 100%;
    clear: both;
  }


  /* Ensure headers are block elements with proper spacing */
  & h1, & h2, & h3, & h4, & h5, & h6 {
    display: block;
    width: 100%;
    clear: both;
    position: relative;
    break-before: auto;    // Changed from always
    break-after: auto;     // Changed from always
    page-break-before: auto; // Changed from always
    page-break-after: auto;  // Changed from always
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
      component: ({ children, ...props }) => {
        const language = props.className?.replace("language-", "") || "javascript";
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
