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
} from '@mui/material';

// Function to normalize strings for comparison
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim();
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
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_1.png';
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
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/short1.png';
    case 'meias':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/meia1.png';
    case 'bones':
    case 'bonés':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/bone1.png';
    case 'ecobags':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/ecobag1.png';
    case 'pins':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/pin1.png';
    case 'necessaires':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/necessaire1.png';
    case 'adesivos':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/adesivos1.png';
    case 'fita metrica':
      return 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/fitam.png';
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
  'Camisa IFMSA Brazil P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_1.png',
  'Camisa IFMSA Brazil M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_1.png',
  'Camisa IFMSA Brazil G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_1.png',
  'Camisa IFMSA Brazil GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_1.png',
  // Repeat the same image for different sizes or use specific images if available
  'Camisa Administrativo P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_2.png',
  'Camisa Administrativo M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_2.png',
  'Camisa Administrativo G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_2.png',
  'Camisa Administrativo GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_2.png',
  'Camisa Intercâmbios P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_3.png',
  'Camisa Intercâmbios M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_3.png',
  'Camisa Intercâmbios G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_3.png',
  'Camisa Intercâmbios GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_3.png',
  'Camisa Saúde Pública P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_4.png',
  'Camisa Saúde Pública M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_4.png',
  'Camisa Saúde Pública G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_4.png',
  'Camisa Saúde Pública GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_4.png',
  'Camisa Saúde Sexual P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_5.png',
  'Camisa Saúde Sexual M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_5.png',
  'Camisa Saúde Sexual G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_5.png',
  'Camisa Saúde Sexual GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_5.png',
  'Camisa Direitos Humanos e Paz P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_6.png',
  'Camisa Direitos Humanos e Paz M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_6.png',
  'Camisa Direitos Humanos e Paz G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_6.png',
  'Camisa Direitos Humanos e Paz GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_6.png',
  'Camisa Educação Médica P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_7.png',
  'Camisa Educação Médica M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_7.png',
  'Camisa Educação Médica G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_7.png',
  'Camisa Educação Médica GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_7.png',
  'Camisa Relações Públicas P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_8.png',
  'Camisa Relações Públicas M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_8.png',
  'Camisa Relações Públicas G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_8.png',
  'Camisa Relações Públicas GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_8.png',
  'Camisa Treinamentos P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_9.png',
  'Camisa Treinamentos M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_9.png',
  'Camisa Treinamentos G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_9.png',
  'Camisa Treinamentos GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_9.png',
  'Camisa Atividades P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_10.png',
  'Camisa Atividades M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_10.png',
  'Camisa Atividades G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_10.png',
  'Camisa Atividades GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_10.png',
  'Camisa Pesquisa e Extensão P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_11.png',
  'Camisa Pesquisa e Extensão M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_11.png',
  'Camisa Pesquisa e Extensão G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_11.png',
  'Camisa Pesquisa e Extensão GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_11.png',
  'Camisa Representatividade P': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_12.png',
  'Camisa Representatividade M': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_12.png',
  'Camisa Representatividade G': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_12.png',
  'Camisa Representatividade GG': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/Fotos Camisas_12.png',
  'Cartela de Adesivos': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/adesivos1.png',
  'Roller Clip Logo Clássica': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller4.png',
  'Roller Clip Viagens (colorido)': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller3.png',
  'Roller Clip Viagens (preto e branco)': 'https://cdn.jsdelivr.net/gh/alexandrenf/fotoslojinhaif24@latest/roller2.png',
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

const StockPage = () => {
  const csvUrl =
    'https://docs.google.com/spreadsheets/d/1JadpkRuL5WdGmjdjX4KnTUbC66yYD9UJcfNaC9H7Dg4/export?format=csv';

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

      if (normalizedProductName.startsWith('camisa')) {
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
      setCurrentCategory(category);
      setShowCategoryModal(true);
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
      <Typography variant="h6" align="center">
        Carregando...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Estoque de Produtos
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(categories).map((categoryName, index) => {
          const allOutOfStock = !isCategoryInStock(categories[categoryName]);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCategoryClick(categoryName)}
                sx={{
                  backgroundColor: allOutOfStock ? '#f0f0f0' : '#fff',
                  cursor: allOutOfStock ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: !allOutOfStock && '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardActionArea disabled={allOutOfStock}>
                  <Box sx={{ aspectRatio: '1', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={getCategoryImage(categoryName)}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: allOutOfStock ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {categoryName}
                    </Typography>
                  </CardContent>
                  {allOutOfStock && (
                    <Typography
                      variant="h6"
                      color="red"
                      sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                      Esgotado
                    </Typography>
                  )}
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Category Modal */}
      {currentCategory && (
        <Modal
          open={showCategoryModal}
          onClose={handleCloseCategoryModal}
          aria-labelledby="category-modal-title"
        >
          <Box
            sx={{
              padding: 3,
              backgroundColor: 'white',
              margin: '5% auto',
              width: '80%',
              height: '80vh',
              overflowY: 'auto',
              borderRadius: 2,
            }}
          >
            <Typography id="category-modal-title" variant="h5" gutterBottom>
              {currentCategory}
            </Typography>
            <Grid container spacing={3}>
              {categories[currentCategory].map((product, index) => {
                const outOfStock = !isInStock(product.Estoque);
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      onClick={() => handleProductClick(product)}
                      sx={{
                        backgroundColor: outOfStock ? '#f0f0f0' : '#fff',
                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                        position: 'relative',
                        '&:hover': {
                          boxShadow:
                            !outOfStock && '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <CardActionArea disabled={outOfStock}>
                        <Box sx={{ aspectRatio: '1', overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            image={getProductImage(product)}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: outOfStock ? 'grayscale(100%)' : 'none',
                            }}
                          />
                        </Box>
                        <CardContent>
                          <Typography variant="h6" align="center">
                            {product.Produto}
                          </Typography>
                        </CardContent>
                        {outOfStock && (
                          <Typography
                            variant="h6"
                            color="red"
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                          >
                            Esgotado
                          </Typography>
                        )}
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Modal>
      )}

      {/* Product Modal */}
      {currentProduct && (
        <Modal open={showProductModal} onClose={handleCloseProductModal}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: 'white',
              margin: '5% auto',
              width: '50%',
              maxHeight: '80vh',
              overflowY: 'auto',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {currentProduct.Produto}
            </Typography>
            <Typography>
              <strong>Valor:</strong> {currentProduct.Valor}
            </Typography>
            <Typography>
              <strong>Estoque:</strong>{' '}
              {isInStock(currentProduct.Estoque) ? 'Disponível' : 'Indisponível'}
            </Typography>
            {/* Additional product details can be added here */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleCloseProductModal}
            >
              Fechar
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default StockPage;