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

/* Add this to your main CSS file or a new CSS file */
.map-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px; /* Adjust the max width as needed */
  margin: 0 auto;
  padding: 0;
}

.map-legend {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.map-legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.map-legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

@media (max-width: 600px) {
  .map-container {
    flex-direction: column;
    align-items: center;
  }

  .map-legend {
    margin-left: 0;
    margin-top: 20px;
  }
}



`;

export default GlobalStyles;
