"use client"; // Add this directive for client-side rendering

import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import "./styles/Fonts.jsx";
import Footer from "./components/Footer.jsx";
import { CssBaseline } from "@mui/material";
import Loading from "./components/Loading.jsx";
import Home from "./paginas/Home.jsx";

// Lazy load components for code-splitting
const MarkdownPage = lazy(() => import("./components/MarkdownPage.jsx"));
const GeradorLink = lazy(() => import("./components/GeradorLink.jsx"));
const Noticias = lazy(() => import("./paginas/Noticias.jsx"));
const Estrutura = lazy(() => import("./paginas/Estrutura.jsx"));
const Filiacao = lazy(() => import("./paginas/Filiacao.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx")); // Import the NotFound component

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <CssBaseline />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/post/:id/:title"
            element={<MarkdownPage needsExternal={true} />}
          />
          <Route path="/gerarlink" element={<GeradorLink />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/filiacao" element={<Filiacao />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route
            path="/tutorial"
            element={
              <MarkdownPage
                needsExternal={false}
                filepath={"/markdown/pagina.md"}
              />
            }
          />
          {/* Add other routes here */}
          <Route path="*" element={<NotFound />} />{" "}
          {/* Catch-all route for 404 */}
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
