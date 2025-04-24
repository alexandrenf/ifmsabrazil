import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Modal,
  Box,
  Button,
  Chip,
  Stack,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '6px 16px',
  borderRadius: '20px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  position: 'absolute',
  top: '12px',
  right: '12px',
  boxShadow: theme.shadows[2],
}));

const StockBadge = styled(Chip)(({ theme, instock }) => ({
  position: 'absolute',
  top: '12px',
  left: '12px',
  backgroundColor: instock ? theme.palette.success.main : theme.palette.error.main,
  color: 'white',
  fontWeight: 'bold',
  boxShadow: theme.shadows[1],
}));

const SizeBalloon = styled(Chip)(({ theme, available }) => ({
  margin: '4px',
  backgroundColor: available ? theme.palette.success.main : theme.palette.error.main,
  color: 'white',
  fontWeight: 'bold',
  textDecoration: available ? 'none' : 'line-through',
  opacity: available ? 1 : 0.7,
  '&:hover': {
    transform: available ? 'scale(1.1)' : 'none',
    transition: 'transform 0.2s ease',
  },
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

// Function to normalize strings for comparison
const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim();
};

// Add this function after normalizeString
const cleanProductName = (name) => {
  if (!name) return '';
  
  // Remove [NC] prefix if present
  let result = name.replace(/^\[NC\]\s*/i, '');
  
  // Remove size indicators only at the very end of the string
  // Using a more precise regex that only matches at the end
  const sizePatterns = [
    /\s+(P|M|G|GG)$/i,      // Matches " P", " M", " G", " GG" at the end
    /\s+-\s+(P|M|G|GG)$/i,  // Matches " - P", " - M", etc. at the end
    /\s+\((P|M|G|GG)\)$/i   // Matches " (P)", " (M)", etc. at the end
  ];
  
  // Apply each pattern until one matches
  for (const pattern of sizePatterns) {
    if (pattern.test(result)) {
      result = result.replace(pattern, '');
      break;
    }
  }
  
  return result.trim();
};

// Add this function after cleanProductName
const capitalizeProductName = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => {
      // Special case for "Pin" to ensure "M" is capitalized
      if (word.toLowerCase() === 'pin') return 'Pin';
      // Special case for "Metálico" to ensure it's spelled correctly
      if (word.toLowerCase() === 'etálico') return 'Metálico';
      // Special case for "Moletinho" to ensure it's spelled correctly
      if (word.toLowerCase() === 'oletinho') return 'Moletinho';
      // Capitalize first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

// Function to check if a product is in stock
const isInStock = (stockStatus) => {
  const status = stockStatus ? normalizeString(stockStatus) : '';
  return status === 'sim';
};

// Function to check if any product in the category is in stock
const isCategoryInStock = (products) => {
  return products.some((product) => isInStock(product.Estoque));
};

// Function to get category images
const getCategoryImage = (categoryName) => {
  const normalizedCategory = normalizeString(categoryName);
  switch (normalizedCategory) {
    case 'camisas':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/yt.png';
    case 'bottons':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/botton-placeholder.png';
    case 'roller clips':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller1.png';
    case 'moletons':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/moletom1.png';
    case 'calcas':
    case 'calças':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/calca1.png';
    case 'shorts':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/doll.png';
    case 'meias':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/meias.png';
    case 'bones':
    case 'bonés':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/bone.png';
    case 'ecobags':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ecobag1.png';
    case 'pins':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/pin1.png';
    case 'necessaires':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/necessaire.png';
    case 'adesivos':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/adesivos1.png';
    case 'fita metrica':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/fitam.png';
    case 'camisas - nova colecao':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_br.png';
    case 'buckets':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/bucket2.png';
    case 'moletinho':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/moletinho.png';
    default:
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/default_placeholder.png';
  }
};

// Mapping of product names to image URLs
const productImages = {
  // Bottons
  'Botton Queer': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_queer.png',
  'Botton Estudantes de Medicina': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/botton-placeholder.png',
  'Botton IF LGBTQIAP+': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_if_lgbtqiap.png',
  'Botton Marie Curie': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_marie_curie.png',
  'Botton Expressões Regionais': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_expressoes_regionais.png',
  'Botton Educação Paulo Freire': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_paulo_freire.png',
  'Botton Martin Luther King Jr': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_mlk.png',
  'Botton Girls Just Wanna Have Fun': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_girls_just_wanna_have_fun.png',
  'Bottom Feminista': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_feminista.png',
  'Botton Em Tudo Que O Sol toca': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_em_tudo_que_o_sol_toca.png',
  'Botton (Ex)Change': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/botton_exchange.png',
  'Botton Capacity Building': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bottons/Botton_Capacity_Building.png',
  // Camisas
  // Repeat the same image for different sizes or use specific images if available
  'Camisa Administrativo P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/yt.png',
  'Camisa Administrativo M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/yt.png',
  'Camisa Administrativo G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/yt.png',
  'Camisa Administrativo GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/yt.png',
  'Camisa Intercâmbios P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/int.png',
  'Camisa Intercâmbios M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/int.png',
  'Camisa Intercâmbios G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/int.png',
  'Camisa Intercâmbios GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/int.png',
  'Camisa Saúde Pública P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/ot.png',
  'Camisa Saúde Pública M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/ot.png',
  'Camisa Saúde Pública G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/ot.png',
  'Camisa Saúde Pública GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/ot.png',
  'Camisa Saúde Sexual P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/rlt.png',
  'Camisa Saúde Sexual M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/rlt.png',
  'Camisa Saúde Sexual G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/rlt.png',
  'Camisa Saúde Sexual GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/rlt.png',
  'Camisa Direitos Humanos e Paz P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/glt.png',
  'Camisa Direitos Humanos e Paz M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/glt.png',
  'Camisa Direitos Humanos e Paz G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/glt.png',
  'Camisa Direitos Humanos e Paz GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/glt.png',
  'Camisa Educação Médica P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/wt.png',
  'Camisa Educação Médica M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/wt.png',
  'Camisa Educação Médica G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/wt.png',
  'Camisa Educação Médica GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/wt.png',
  'Camisa Relações Públicas P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/drp.png',
  'Camisa Relações Públicas M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/drp.png',
  'Camisa Relações Públicas G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/drp.png',
  'Camisa Relações Públicas GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/drp.png',
  'Camisa Treinamentos P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/cbt.png',
  'Camisa Treinamentos M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/cbt.png',
  'Camisa Treinamentos G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/cbt.png',
  'Camisa Treinamentos GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/cbt.png',
  'Camisa Atividades P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/pad.png',
  'Camisa Atividades M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/pad.png',
  'Camisa Atividades G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/pad.png',
  'Camisa Atividades GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/pad.png',
  'Camisa Pesquisa e Extensão P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/sci.png',
  'Camisa Pesquisa e Extensão M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/sci.png',
  'Camisa Pesquisa e Extensão G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/sci.png',
  'Camisa Pesquisa e Extensão GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/sci.png',
  'Camisa Representatividade P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/tre.png',
  'Camisa Representatividade M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/tre.png',
  'Camisa Representatividade G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/tre.png',
  'Camisa Representatividade GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/tre.png',
  'Cartela de Adesivos': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/adesivos1.png',
  'Roller Clip Logo Clássica': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller4.png',
  'Roller Clip Viagens (colorido)': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller3.png',
  'Roller Clip Viagens (preto e branco)': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller2.png',
  '[NC] Camisa Raiz P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_raiz.png',
  '[NC] Camisa Raiz M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_raiz.png',
  '[NC] Camisa Raiz G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_raiz.png',
  '[NC] Camisa Raiz GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_raiz.png',
  '[NC] Camisa AG 62 P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_ag62.png',
  '[NC] Camisa AG 62 M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_ag62.png',
  '[NC] Camisa AG 62 G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_ag62.png',
  '[NC] Camisa AG 62 GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_ag62.png',
  '[NC] Camisa Brasilidades P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_br.png',
  '[NC] Camisa Brasilidades M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_br.png',
  '[NC] Camisa Brasilidades G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_br.png',
  '[NC] Camisa Brasilidades GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/camisa_br.png',
  'Short Doll P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/doll.png',
  'Short Doll M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/doll.png',
  'Short Doll G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/doll.png',
  'Short Doll GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/doll.png',
  'Short Samba Calção P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/samba.png',
  'Short Samba Calção M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/samba.png',
  'Short Samba Calção G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/samba.png',
  'Short Samba Calção GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/samba.png',  
  'Bucket Iéfico': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/bucket2.png',
  'Moletinho P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/moletinho.png',
  'Moletinho M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/moletinho.png',
  'Moletinho G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/moletinho.png',
  'Moletinho GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/moletinho.png',
  'Pin Metálico Capivara': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ag62/capivara.png',
  // ... Add mappings for all other Camisas with appropriate images
  // Roller Clips
  // Add mappings for other products if images are available
};

// Function to get product images
const getProductImage = (product) => {
  // Return the specific image if available, else return the category image
  const imageUrl = productImages[product.Produto];
  if (imageUrl) {
    return imageUrl;
  } else {
    return getCategoryImage(product.CategoryName || 'default');
  }
};

// Add this function after the existing utility functions
const parsePrice = (price) => {
  if (!price) return 0;
  
  // Remove any currency symbols and spaces
  const cleanPrice = price.toString().replace(/[R$\s]/g, '');
  
  // Replace comma with dot for decimal point
  const normalizedPrice = cleanPrice.replace(',', '.');
  
  // Parse the number
  const parsedPrice = parseFloat(normalizedPrice);
  
  // Return 0 if parsing fails
  return isNaN(parsedPrice) ? 0 : parsedPrice;
};

// Add this function after parsePrice
const hasUniformPricing = (products) => {
  if (!products || products.length === 0) return false;
  
  const prices = products
    .filter(product => isInStock(product.Estoque))
    .map(product => parsePrice(product.Valor));
  
  if (prices.length === 0) return false;
  
  const firstPrice = prices[0];
  return prices.every(price => price === firstPrice);
};

// Improved function to group products by base name
const groupProductsByBaseName = (products) => {
  const grouped = {};
  
  products.forEach(product => {
    const originalProductName = product.Produto;
    if (!originalProductName) return;
    
    // Use product.Tamanho field if available
    const sizeFromField = product.Tamanho?.trim();
    
    // Check if this is a sized product - only look at the very end of the string
    const sizeRegex = /\s+(P|M|G|GG)$/i;
    const dashSizeRegex = /\s+-\s+(P|M|G|GG)$/i;
    const parenSizeRegex = /\s+\((P|M|G|GG)\)$/i;
    
    // Try to extract the size from the product name using the specific regex patterns
    let sizeFromName = null;
    if (sizeRegex.test(originalProductName)) {
      sizeFromName = originalProductName.match(sizeRegex)[1];
    } else if (dashSizeRegex.test(originalProductName)) {
      sizeFromName = originalProductName.match(dashSizeRegex)[1];
    } else if (parenSizeRegex.test(originalProductName)) {
      sizeFromName = originalProductName.match(parenSizeRegex)[1];
    }
    
    const isSizedProduct = sizeFromField || sizeFromName || 
                         (originalProductName.endsWith(' P') || 
                          originalProductName.endsWith(' M') || 
                          originalProductName.endsWith(' G') || 
                          originalProductName.endsWith(' GG'));
    
    // Use the size from the field if available, otherwise use the one from the name
    const size = sizeFromField || sizeFromName;
    
    // Clean the product name using our improved function
    const baseName = cleanProductName(originalProductName);
    
    if (!grouped[baseName]) {
      grouped[baseName] = [];
    }
    
    // Add the product with its determined size and flag if it's a sized product
    grouped[baseName].push({
      ...product,
      determinedSize: size,
      isSizedProduct: !!isSizedProduct,
      originalName: originalProductName
    });
  });
  
  return grouped;
};

// Update the getGroupedProductsForCategory function
const getGroupedProductsForCategory = (categoryProducts) => {
  const grouped = groupProductsByBaseName(categoryProducts);
  return Object.entries(grouped).map(([baseName, products]) => {
    // Check if this is a product with size variants
    const hasSizeVariants = products.some(p => p.isSizedProduct);
    
    // Get all available sizes, only if this is a sized product
    const availableSizes = hasSizeVariants ? 
      products
        .filter(p => isInStock(p.Estoque))
        .map(p => p.determinedSize)
        .filter(Boolean) : // Remove any undefined sizes
      [];
    
    // Find the first available product to use as the representative
    const representativeProduct = products.find(p => isInStock(p.Estoque)) || products[0];
    
    return {
      baseName,
      products,
      representativeProduct,
      hasSizeVariants,
      hasMultipleSizes: availableSizes.length > 1,
      availableSizes,
      hasAnyAvailable: products.some(p => isInStock(p.Estoque)),
    };
  });
};

// Add this function after getGroupedProductsForCategory
const countUniqueProducts = (products) => {
  const grouped = groupProductsByBaseName(products);
  return Object.keys(grouped).length;
};

const StockPage = () => {
  const csvUrl =
    'https://docs.google.com/spreadsheets/d/1kr_Q9njQ3nBcs4Z9XGIn2pkEh5stw9boas5rCLGIg6Q/export?format=csv';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(csvUrl);
        const parsedData = Papa.parse(response.data, { header: true });
        const realData = parsedData.data.filter((item) => item.Produto); // Filter out empty rows

        const categorizedProducts = categorizeProducts(realData);
        setProducts(realData);
        setCategories(categorizedProducts);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  // Function to categorize products
  const categorizeProducts = (products) => {
    const categories = {};

    products.forEach((product) => {
      const productName = product.Produto || '';
      const normalizedProductName = normalizeString(productName);
      let categoryName = 'Outros';

      if (normalizedProductName.startsWith('[nc]')) {
        categoryName = 'Camisas - Nova Coleção';
      } else if (normalizedProductName.startsWith('camisa')) {
        categoryName = 'Camisas';
      } else if (
        normalizedProductName.startsWith('botton') ||
        normalizedProductName.startsWith('bottom')
      ) {
        categoryName = 'Bottons';
      } else if (normalizedProductName.startsWith('roller')) {
        categoryName = 'Roller Clips';
      } else if (normalizedProductName.startsWith('moletom')) {
        categoryName = 'Moletons';
      } else if (
        normalizedProductName.startsWith('calca') ||
        normalizedProductName.startsWith('calça')
      ) {
        categoryName = 'Calças';
      } else if (normalizedProductName.startsWith('short')) {
        categoryName = 'Shorts';
      } else if (normalizedProductName.startsWith('meias')) {
        categoryName = 'Meias';
      } else if (
        normalizedProductName.startsWith('bone') ||
        normalizedProductName.startsWith('boné')
      ) {
        categoryName = 'Bonés';
      } else if (normalizedProductName.startsWith('ecobag')) {
        categoryName = 'Ecobags';
      } else if (normalizedProductName.startsWith('pin')) {
        categoryName = 'Pins';
      } else if (normalizedProductName.startsWith('necessaire')) {
        categoryName = 'Necessaires';
      } else if (normalizedProductName.startsWith('cartela')) {
        categoryName = 'Adesivos';
      } else if (normalizedProductName.startsWith('fita')) {
        categoryName = 'Fita Métrica';
      } else if (normalizedProductName.startsWith('bucket')) {
        categoryName = 'Buckets';
      } else if (normalizedProductName.startsWith('moletinho')) {
        categoryName = 'Moletinho';
      }

      product.CategoryName = categoryName; // Add category name to product for later use

      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }

      categories[categoryName].push(product);
    });
    return categories;
  };

  // Handle opening and closing modals
  const handleCategoryClick = (category) => {
    if (isCategoryInStock(categories[category])) {
      const uniqueProducts = getGroupedProductsForCategory(categories[category]);
      if (uniqueProducts.length === 1) {
        // If there's only one product, open its modal directly
        handleProductClick(uniqueProducts[0].representativeProduct);
      } else {
        // Otherwise, show the category modal
        setCurrentCategory(category);
        setShowCategoryModal(true);
      }
    }
  };

  const handleProductClick = (product) => {
    if (isInStock(product.Estoque)) {
      setCurrentProduct(product);
      setShowProductModal(true);
    }
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setCurrentCategory(null);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setCurrentProduct(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ 
          mb: 8, 
          fontWeight: 'bold',
          color: 'primary.main',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Nossa Loja
      </Typography>
      
      <Grid container spacing={4}>
        {Object.keys(categories)
          .sort((a, b) => a.localeCompare(b, 'pt-BR'))
          .map((categoryName, index) => {
          const allOutOfStock = !isCategoryInStock(categories[categoryName]);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StyledCard
                  onClick={() => handleCategoryClick(categoryName)}
                  sx={{
                    cursor: allOutOfStock ? 'not-allowed' : 'pointer',
                    opacity: allOutOfStock ? 0.7 : 1,
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    borderRadius: '16px',
                  }}
                >
                  <CardActionArea disabled={allOutOfStock}>
                    <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                      <CardMedia
                        component="img"
                        image={getCategoryImage(categoryName)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: allOutOfStock ? 'grayscale(100%)' : 'none',
                          borderRadius: '16px 16px 0 0',
                        }}
                      />
                      {allOutOfStock && (
                        <StockBadge
                          label="ESGOTADO"
                          instock={false}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      position: 'relative',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '24px',
                    }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        gutterBottom
                        sx={{
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {categoryName}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          fontSize: '1.1rem',
                        }}
                      >
                        {countUniqueProducts(categories[categoryName])} {countUniqueProducts(categories[categoryName]) === 1 ? 'produto' : 'produtos'}
                        {hasUniformPricing(categories[categoryName]) && (
                          <> · R$ {parsePrice(categories[categoryName][0].Valor).toFixed(2)}</>
                        )}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Category Modal */}
      <Modal
        open={showCategoryModal}
        onClose={handleCloseCategoryModal}
        aria-labelledby="category-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
            overflow: 'auto',
            background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
          }}
        >
          <Typography 
            id="category-modal-title" 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            {currentCategory}
          </Typography>
          <Grid container spacing={3}>
            {getGroupedProductsForCategory(categories[currentCategory] || [])
              .sort((a, b) => a.baseName.localeCompare(b.baseName, 'pt-BR'))
              .map((group, index) => {
              const { baseName, products, representativeProduct, hasSizeVariants, availableSizes, hasAnyAvailable } = group;
              const outOfStock = !isInStock(representativeProduct.Estoque);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <StyledCard
                      onClick={() => handleProductClick(representativeProduct)}
                      sx={{
                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                        opacity: outOfStock ? 0.7 : 1,
                        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                        borderRadius: '16px',
                      }}
                    >
                      <CardActionArea disabled={outOfStock}>
                        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                          <CardMedia
                            component="img"
                            image={getProductImage(representativeProduct)}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: outOfStock ? 'grayscale(100%)' : 'none',
                              borderRadius: '16px 16px 0 0',
                            }}
                          />
                          <PriceTag>
                            R$ {parsePrice(representativeProduct.Valor).toFixed(2)}
                          </PriceTag>
                          <StockBadge
                            label={outOfStock ? "ESGOTADO" : "DISPONÍVEL"}
                            instock={!outOfStock}
                          />
                        </Box>
                        <CardContent sx={{ 
                          padding: '20px',
                          textAlign: 'center',
                        }}>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            gutterBottom
                            sx={{
                              fontWeight: 'bold',
                              color: 'text.primary',
                            }}
                          >
                            {baseName}
                          </Typography>
                          <Stack direction="row" spacing={1} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
                            {hasAnyAvailable ? (
                              hasSizeVariants ? (
                                availableSizes.length > 1 ? (
                                  availableSizes.map(size => (
                                    <Chip
                                      key={size}
                                      label={size}
                                      size="small"
                                      sx={{
                                        backgroundColor: 'primary.light',
                                        color: 'white',
                                        margin: '2px',
                                      }}
                                    />
                                  ))
                                ) : (
                                  <Chip
                                    label="Tamanho Único"
                                    size="small"
                                    sx={{
                                      backgroundColor: 'primary.light',
                                      color: 'white',
                                    }}
                                  />
                                )
                              ) : null
                            ) : (
                              <Chip
                                label="ESGOTADO"
                                size="small"
                                sx={{
                                  backgroundColor: 'error.main',
                                  color: 'white',
                                }}
                              />
                            )}
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </StyledCard>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={handleCloseCategoryModal}
              sx={{ 
                mt: 2,
                borderRadius: '20px',
                padding: '8px 24px',
                fontSize: '1.1rem',
              }}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Product Modal */}
      <Modal
        open={showProductModal}
        onClose={handleCloseProductModal}
        aria-labelledby="product-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '800px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
          }}
        >
          {currentProduct && (
            <>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                    <CardMedia
                      component="img"
                      image={getProductImage(currentProduct)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '16px',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography 
                    id="product-modal-title" 
                    variant="h4" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                    }}
                  >
                    {(() => {
                      const productBaseName = cleanProductName(currentProduct.Produto);
                      return capitalizeProductName(productBaseName);
                    })()}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color="primary" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    R$ {parsePrice(currentProduct.Valor).toFixed(2)}
                  </Typography>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    {(() => {
                      const modalBaseName = cleanProductName(currentProduct.Produto)
                        .replace(/\s+(P|M|G|GG)$/, '')
                        .replace(/\s+-\s+(P|M|G|GG)$/, '')
                        .replace(/\s+\(P|M|G|GG\)$/, '')
                        .trim();
                        
                      const groupedProducts = groupProductsByBaseName(products);
                      const sizeProducts = groupedProducts[modalBaseName] || [];
                      
                      // Check if this is a product with size variants
                      const hasSizeVariants = sizeProducts.some(p => p.isSizedProduct);
                      const availableSizes = sizeProducts.filter(p => isInStock(p.Estoque) && p.determinedSize);
                      
                      if (hasSizeVariants && availableSizes.length > 0) {
                        return (
                          <Box>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                              Tamanhos Disponíveis
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {availableSizes.length === 1 ? (
                                <SizeBalloon
                                  label="Tamanho Único"
                                  available={true}
                                  size="medium"
                                />
                              ) : (
                                availableSizes.map(product => (
                                  <SizeBalloon
                                    key={product.determinedSize}
                                    label={product.determinedSize}
                                    available={true}
                                    size="medium"
                                  />
                                ))
                              )}
                            </Box>
                          </Box>
                        );
                      }
                      
                      return (
                        <Box>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Estoque
                          </Typography>
                          <Chip
                            label={isInStock(currentProduct.Estoque) ? "DISPONÍVEL" : "ESGOTADO"}
                            color={isInStock(currentProduct.Estoque) ? "success" : "error"}
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                      );
                    })()}
                  </Stack>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={handleCloseProductModal}
                      sx={{
                        borderRadius: '20px',
                        padding: '12px',
                        fontSize: '1.1rem',
                      }}
                    >
                      Fechar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default StockPage;