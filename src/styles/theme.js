import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Poppins'), local('Poppins-Regular'), url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap') format('woff2');
          unicodeRange: U+0000-00FF; /* Latin characters */
        }
      `,
    },
  },
});

export default theme;
