// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import GlobalStyles from './styles/GlobalStyles.js';
import './styles/Fonts.js';
import MarkdownPage from './components/MarkdownPage.js';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<MarkdownPage />} />
        <Route path="/estrutura" element={<MarkdownPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
