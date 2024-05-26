import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import GlobalStyles from './styles/GlobalStyles.jsx';
import './styles/Fonts.jsx';
import Footer from './components/Footer.jsx';
import { CssBaseline } from '@material-ui/core';
import fetchSpreadsheet from './components/fetchSpreadsheet.jsx';
import Loading from './components/Loading.jsx';
import Home from './components/Home.jsx';

// Lazy load components for code-splitting
const MarkdownPage = lazy(() => import('./components/MarkdownPage.jsx'));
const GeradorLink = lazy(() => import('./components/GeradorLink.jsx'));
const Noticias = lazy(() => import('./components/Noticias.jsx'));
const Estrutura = lazy(() => import('./paginas/Estrutura.jsx'));

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/14lmnc_GTJzWvLatvU9QQIBO9_Xg1fKjBEMYU12FsZuk/export?gid=0&format=csv';

  useEffect(() => {
    const loadData = async () => {
      try {
        const spreadsheetData = await fetchSpreadsheet(googleSheetsUrl);
        setPosts(spreadsheetData); // Get the first 4 posts
      } catch (error) {
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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home posts={posts} loading={loading} />} />
          <Route path="/post/:title" element={<MarkdownPage posts={posts} loading={loading} needsExternal={true} />} />
          <Route path="/gerarlink" element={<GeradorLink />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/noticias" element={<Noticias posts={posts} loading={loading} />} />
          <Route path="/tutorial" element={<MarkdownPage needsExternal={false} filepath={'/markdown/pagina.md'} />} />
          {/* Add other routes here */}
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
