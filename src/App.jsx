"use client"; // Add this directive for client-side rendering

import React, { Suspense, lazy, useEffect } from "react"; // Add useEffect
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; // Add useLocation
import CookieConsent from "react-cookie-consent";
import Navbar from "./components/Navbar.jsx";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import "./styles/Fonts.js"; // Ensure this file is imported to load the fonts
import Footer from "./components/Footer.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Loading from "./components/Loading.jsx";
import Home from "./paginas/Home.jsx";
import theme from "./styles/theme.js";

// Create a ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const navbarHeight = 85; // Adjust this value based on your navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      return;
    }
    // Otherwise, scroll to top
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Lazy load components for code-splitting
const MarkdownPage = lazy(() => import("./components/MarkdownPage.jsx"));
const GeradorLink = lazy(() => import("./components/GeradorLink.jsx"));
const Arquivos = lazy(() => import("./paginas/Arquivos.jsx"));
const Estrutura = lazy(() => import("./paginas/Estrutura.jsx"));
const Filiacao = lazy(() => import("./paginas/Filiacao.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx")); // Import the NotFound component
const Noticias = lazy(() => import("./paginas/Noticias.jsx")); // Import the Noticias component
const Institucional = lazy(() => import("./paginas/Institucional.jsx")); // Import the Institucional component
const AcoesETematicas = lazy(() => import("./paginas/AcoesETematicas.jsx")); // Import the AcoesETematicas component
const SocialPrograms = lazy(() => import("./paginas/SocialPrograms.jsx")); // Import the SocialPrograms component
const Eixos = lazy(() => import("./paginas/Eixos.jsx")); // Import the Eixos component
const Eventos = lazy(() => import("./paginas/Eventos.jsx")); // Import the Eventos component
const StockPage = lazy (() => import("./paginas/StockPage.jsx")); // Import the StockPage component
const MemoriaInstitucional = lazy(() =>
  import("./paginas/MemoriaInstitucional.jsx")
); // Import the MemoriaInstitucional component
const Regulamento = lazy(() => import("./paginas/Regulamento.jsx")); // Import the Regulamento component
const OutrosIntercambios = lazy(() =>
  import("./paginas/OutrosIntercambios.jsx")
); // Import the OutrosIntercambios component
const IntercambioInternacional = lazy(() =>
  import("./paginas/IntercambioInternacional.jsx")
); // Import the IntercambioInternacional component
const PoliticaPriv = lazy(() => import("./paginas/PoliticaPrivacidade.jsx")); // Import the PoliticaPriv component
const IntercambioNacional = lazy(() =>
  import("./paginas/IntercambioNacional.jsx")
); // Import the IntercambioNacional component
const LinkPage = lazy(() => import("./paginas/LinkPage.jsx"));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop /> {/* Add the ScrollToTop component */}
        <GlobalStyles />
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eixos" element={<Eixos />} />
            <Route
              path="/arquivo/:id/:title"
              element={<MarkdownPage needsExternal={true} />}
            />
            <Route path="/gerarlink" element={<GeradorLink />} />
            <Route path="/filie-se" element={<Filiacao />} />
            <Route path="/estrutura" element={<Estrutura />} />
            <Route path="/filiacao" element={<Filiacao />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/acoes" element={<AcoesETematicas />} />
            <Route path="/arquivos/:type" element={<Arquivos />} />
            <Route path="/social-programs" element={<SocialPrograms />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/privacidade" element={<PoliticaPriv />} />
            <Route path="/regulamento" element={<Regulamento />} />
            <Route path="/lojinha_ag61" element={<StockPage />} />
            <Route
              path="/outras-modalidades"
              element={<OutrosIntercambios />}
            />
            <Route path="/memoria" element={<MemoriaInstitucional />} />
            <Route
              path="/intercambio_nacional"
              element={<IntercambioNacional />}
            />
            <Route
              path="/intercambio_internacional"
              element={<IntercambioInternacional />}
            />
            <Route
              path="/tutorial"
              element={
                <MarkdownPage
                  needsExternal={false}
                  filepath={"/markdown/pagina.md"}
                />
              }
            />
            <Route path="/cobem" element={<LinkPage />} />
            {/* Add other routes here */}
            <Route path="*" element={<NotFound />} />{" "}
            {/* Catch-all route for 404 */}
          </Routes>
          <CookieConsent
          location="bottom"
          buttonText="Aceito"
          cookieName="userCookieConsent"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#fff", backgroundColor: "#00963B", fontSize: "14px" }}
          expires={365}
        >
          Esse site usa cookies para melhorar a sua experiência.{" "}
          <span style={{ fontSize: "12px" }}>
            Ao usar esse site, você concorda com o uso de cookies e nossa política de privacidade.
          </span>
        </CookieConsent>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
