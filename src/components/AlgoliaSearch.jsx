import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { algoliasearch } from 'algoliasearch';
import styled from 'styled-components';
import { Search, X, ExternalLink } from 'lucide-react';

// Initialize Algolia client
const client = algoliasearch('6RE19NWP78', '72529d76b31f930f85662940f68f24e8');

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #00508c;
    box-shadow: 0 0 0 3px rgba(0, 80, 140, 0.1);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  cursor: pointer;
`;

const ClearButton = styled(X)`
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  cursor: pointer;
  width: 20px;
  height: 20px;
  
  &:hover {
    color: #374151;
  }
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 8px;
`;

const ResultItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  gap: 16px;

  &:hover {
    background-color: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  
  mark {
    background-color: #fef3c7;
    color: #92400e;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const ResultExcerpt = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
  
  mark {
    background-color: #fef3c7;
    color: #92400e;
    padding: 1px 2px;
    border-radius: 2px;
  }
`;

const ResultMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #9ca3af;
`;

const ResultTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const NoResults = styled.div`
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-style: italic;
`;

const LoadingSpinner = styled.div`
  padding: 24px;
  text-align: center;
  color: #6b7280;
`;

const AlgoliaSearch = ({ placeholder = "Pesquisar no site...", onResultClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      // Use Algolia v5 search format
      const { results } = await client.search({
        requests: [
          {
            indexName: 'ifmsabrazil_pages',
            query: searchQuery,
            hitsPerPage: 8,
            attributesToRetrieve: [
              'title', 
              'excerpt', 
              'path', 
              'url', 
              'tags', 
              'wordCount', 
              'type'
            ],
            attributesToHighlight: ['title', 'excerpt'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
          },
          {
            indexName: 'noticias_index',
            query: searchQuery,
            hitsPerPage: 8,
            attributesToRetrieve: [
              'title', 
              'excerpt', 
              'path', 
              'url', 
              'tags', 
              'wordCount', 
              'type',
              'imageLink',
              'date',
              'author'
            ],
            attributesToHighlight: ['title', 'excerpt'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
          }
        ]
      });

      // Combine results from both indices
      const combinedResults = [
        ...(results[0]?.hits || []),
        ...(results[1]?.hits || [])
      ];

      setResults(combinedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      console.error('Error details:', error.message);
      
      // Fallback: try a simpler search without highlighting
      try {
        const { results } = await client.search({
          requests: [
            {
              indexName: 'ifmsabrazil_pages',
              query: searchQuery,
              hitsPerPage: 8
            },
            {
              indexName: 'noticias_index',
              query: searchQuery,
              hitsPerPage: 8
            }
          ]
        });
        
        // Combine results from both indices in fallback case too
        const combinedResults = [
          ...(results[0]?.hits || []),
          ...(results[1]?.hits || [])
        ];
        
        setResults(combinedResults);
        setShowResults(true);
      } catch (fallbackError) {
        console.error('Fallback search also failed:', fallbackError);
        setResults([]);
        setShowResults(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    //console.log('Search result clicked:', result);
    
    if (onResultClick) {
      // Use the custom click handler provided by the parent
      onResultClick(result);
      const stripDomain = (url) => {
        const domain = 'ifmsabrazil.org';
        const replaced = url.replace(`https://${domain}`, '');
        if (replaced.includes('arquivo') && /\d+/.test(replaced)) {
          return replaced;
        } else {
          return replaced;
        }
      };
      navigate(stripDomain(result.url));
    } else {
      // Direct navigation to result.url if available (preferred method)
      if (result.url) {
        try {
          // Extract just the path from the URL for React Router
          const urlObj = new URL(result.url);
          const path = urlObj.pathname;
          
          //console.log('Navigating to path:', path);
          navigate(path);
        } catch (error) {
          // If URL parsing fails or navigation fails, try direct navigation
          //console.log('Falling back to direct URL navigation:', result.url);
          window.location.href = result.url;
        }
      } 
      // Fallback for news articles with objectID but no URL
      else if (result.objectID) {
        const path = `/arquivo/${result.objectID}`;
        //console.log('Navigating to constructed path:', path);
        navigate(path);
      }
      // Last resort fallback
      else {
        console.error('No navigation path found for result:', result);
      }
    }
    setShowResults(false);
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <SearchContainer ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
        />
        {query && (
          <ClearButton onClick={handleClear} />
        )}
        <SearchIcon />
      </div>

      {showResults && (
        <ResultsContainer>
          {isLoading ? (
            <LoadingSpinner>Buscando...</LoadingSpinner>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <ResultItem 
                key={result.objectID || index} 
                onClick={() => handleResultClick(result)}
              >
                {result.imageLink && (
                  <ResultImage src={result.imageLink} alt={result.title} />
                )}
                <ResultContent>
                  <ResultTitle 
                    dangerouslySetInnerHTML={createMarkup(result._highlightResult?.title?.value || result.title)}
                  />
                  <ResultExcerpt 
                    dangerouslySetInnerHTML={createMarkup(result._highlightResult?.excerpt?.value || result.excerpt)}
                  />
                  <ResultMeta>
                    {result.tags && result.tags.length > 0 && (
                      <>
                        <ResultTags>
                          {result.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Tag key={tagIndex}>{tag}</Tag>
                          ))}
                        </ResultTags>
                      </>
                    )}
                  </ResultMeta>
                </ResultContent>
              </ResultItem>
            ))
          ) : query.trim() ? (
            <NoResults>
              Nenhum resultado encontrado para "{query}"
            </NoResults>
          ) : null}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

export default AlgoliaSearch; 