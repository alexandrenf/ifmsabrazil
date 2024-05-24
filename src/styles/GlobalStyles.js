// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #f0f0f0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  h1, h2 {
    margin: 0;
  }

  button {
    outline: none;
  }

.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
}

.carousel .slide {
  background: none;
}

`;

export default GlobalStyles;
