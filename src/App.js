import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import GlobalStyles from './styles/GlobalStyles.js';
import './styles/Fonts.js';
import MarkdownPage from './components/MarkdownPage.js';
import GeradorLink from './components/GeradorLink.js';
import Noticias from './components/Noticias.js';
import Footer from './components/Footer.js';
import { CssBaseline } from '@material-ui/core';
import fetchSpreadsheet from './components/fetchSpreadsheet.js'; // Import fetchSpreadsheet

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/14lmnc_GTJzWvLatvU9QQIBO9_Xg1fKjBEMYU12FsZuk/export?gid=0&format=csv';

  useEffect(() => {
    const loadData = async () => {
      try {
      const spreadsheetData = await fetchSpreadsheet(googleSheetsUrl);
      setPosts(spreadsheetData); // Get the first 4 posts
      } catch {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [googleSheetsUrl]);

  return (
    <Router>
      <GlobalStyles />
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} loading={loading}/>} />
        <Route path="/post/:title" element={<MarkdownPage posts={posts} loading={loading} needsExternal={true}/>} />
        <Route path="/gerarlink" element={<GeradorLink/>} />
        <Route path="/noticias" element={<Noticias posts={posts} loading={loading}/>} />
        <Route path="/tutorial" element={<MarkdownPage needsExternal={false} filepath={'/markdown/pagina.md'}/>} />
        <Route path="/estrutura" element={<MarkdownPage />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
