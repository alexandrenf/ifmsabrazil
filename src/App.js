import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import GlobalStyles from './styles/GlobalStyles.js';
import './styles/Fonts.js';
import MarkdownPage from './components/MarkdownPage.js';
import Footer from './components/Footer.js';
import { CssBaseline } from '@material-ui/core';
import fetchSpreadsheet from './components/fetchSpreadsheet.js'; // Import fetchSpreadsheet

const App = () => {
  const [posts, setPosts] = useState([]);
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/14lmnc_GTJzWvLatvU9QQIBO9_Xg1fKjBEMYU12FsZuk/export?gid=0&format=csv';

  useEffect(() => {
    const loadData = async () => {
      const spreadsheetData = await fetchSpreadsheet(googleSheetsUrl);
      setPosts(spreadsheetData.slice(0, 4)); // Get the first 4 posts
    };

    loadData();
  }, [googleSheetsUrl]);

  return (
    <Router>
      <GlobalStyles />
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/post/:title" element={<MarkdownPage posts={posts} />} />
        <Route path="/teste" element={<MarkdownPage />} />
        <Route path="/estrutura" element={<MarkdownPage />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
