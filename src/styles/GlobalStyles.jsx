/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap");

      html,
      body,
      body1,
      #root,
      #__next {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif !important;
        background-color: #ffffff;
        color: rgba(0, 0, 0, 0.87);
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      h1,
      h6,
      h2 {
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

      /* CSS for BrazilMap component */
      .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
      }

      .map-container {
        flex: 1;
        min-width: 300px;
        max-width: 600px;
        margin: 0 20px; /* Medium margin on the left and right sides */
      }

      .legend-container {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .color-box {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      /* Media query for mobile view */
      @media (max-width: 768px) {
        .container {
          flex-direction: column;
          align-items: center;
        }
        .map-container {
          margin: 0; /* Remove margins on mobile */
        }
        .legend-container {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          margin-left: 0;
          margin-top: 20px; /* Space between map and legend */
        }
        .legend-item {
          margin: 5px; /* Adjust margin for horizontal layout */
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .cookie-consent-buttons button {
        position: relative;
        overflow: hidden;
      }

      .cookie-consent-buttons button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 80, 140, 0.2);
        background: rgba(0, 80, 140, 1);
      }

      .cookie-consent-buttons button:active {
        transform: translateY(0);
      }

      .cookie-consent-buttons button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
      }

      .cookie-consent-buttons button:hover::before {
        width: 300px;
        height: 300px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .CookieConsent {
        animation: fadeIn 0.6s ease-out;
      }
    `}
  />
);

export default GlobalStyles;
