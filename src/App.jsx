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
            buttonText="Aceitar"
            cookieName="userCookieConsent"
            style={{ 
              background: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
              maxWidth: "320px",
              margin: "24px",
              borderRadius: "16px",
              left: "0",
              right: "auto",
              transform: "none",
              padding: "16px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              fontSize: "13px",
              lineHeight: "1.5",
              color: "#1a1a1a"
            }}
            buttonStyle={{ 
              background: "rgba(0, 80, 140, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "white", 
              fontSize: "13px",
              borderRadius: "12px",
              padding: "8px 16px",
              fontWeight: "600",
              marginTop: "12px",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              width: "100%"
            }}
            contentStyle={{
              margin: "0",
              padding: "0"
            }}
            buttonWrapperClasses="cookie-consent-buttons"
            expires={365}
            hideOnAccept={true}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: "10px"
            }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M10 6v1.5m0 5.5v1.5m-4-4h1.5m5.5 0h1.5m-7.207-5.793L9.5 6.5m4.707 7.293L13.5 13m-7 0-.793.793m8.586-8.586L13.5 6" 
                  stroke="#00508c" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                <circle cx="10" cy="10" r="8" stroke="#00508c" strokeWidth="1.5"/>
              </svg>
              <div>
                <div style={{ 
                  fontWeight: "600",
                  marginBottom: "4px",
                  color: "#00508c",
                  fontSize: "13px"
                }}>
                  Cookies
                </div>
                Utilizamos cookies para melhorar sua experiência.{" "}
                <a 
                  href="/privacidade" 
                  style={{ 
                    color: "#00508c",
                    textDecoration: "none",
                    fontWeight: "500"
                  }}
                >
                  Saiba mais
                </a>
              </div>
            </div>
          </CookieConsent>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
