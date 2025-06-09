# IFMS Brasil - Algolia Search Crawler

This document explains how to use the automated crawler that indexes static pages from your React application into Algolia Search.

## Overview

The crawler automatically:
1. 🕷️ Crawls all static pages from your React application
2. 📝 Extracts text content and converts it to markdown format
3. 🔍 Indexes the content in Algolia for powerful search functionality
4. ⚙️ Configures search settings for optimal performance

## Features

- **Smart Content Extraction**: Extracts only user-facing text content, filtering out code, HTML, and technical markup
- **Clean Text Processing**: Focuses on meaningful content like headings, paragraphs, and user-readable text
- **Markdown Formatting**: Converts content to clean markdown format with proper heading detection
- **Dual Extraction Methods**: Tries component-level extraction first, then falls back to live URL crawling
- **Smart Tagging**: Automatically categorizes content with relevant tags
- **Size Optimization**: Automatically handles Algolia's 10KB record size limits
- **Search Optimization**: Configures Algolia index for best search experience
- **React Component**: Ready-to-use search component for your application

## Setup

### 1. Dependencies

The following dependencies are already installed:
- `algoliasearch` - Algolia JavaScript client
- `jsdom` - HTML parsing for server-side rendering

### 2. Configuration

Update your Algolia credentials in `src/crawler/algolia-indexer.js`:

```javascript
const client = algoliasearch('YOUR_APP_ID', 'YOUR_API_KEY');
```

### 3. Base URL

Update the base URL in the crawler configuration:

```javascript
this.baseUrl = 'https://your-domain.com';
```

## Usage

### Running the Crawler

There are several ways to run the crawler:

#### Option 1: Using npm scripts
```bash
# Run the crawler
npm run crawl

# Alternative command
npm run index-algolia
```

#### Option 2: Direct execution
```bash
# Run the crawler script directly
node scripts/crawl-and-index.js
```

#### Option 3: Programmatic usage
```javascript
import { processRecords, PageCrawler } from './src/crawler/algolia-indexer.js';

// Simple usage
const records = await processRecords();

// Advanced usage
const crawler = new PageCrawler();
const records = await crawler.crawlAndIndex();
```

### Expected Output

When running the crawler, you'll see output like:

```
🚀 Starting IFMS Brasil page crawler and Algolia indexer...

Processing: Página Inicial (/)
✓ Processed Página Inicial: 245 words
Processing: Eixos (/eixos)
✓ Processed Eixos: 189 words
Processing: Filiação (/filie-se)
✓ Processed Filiação: 156 words
...

✅ Successfully indexed 17 pages!
🎉 Crawling completed successfully!

📊 Summary:
   • Total pages processed: 17
   • Total words indexed: 3,421
   • Average words per page: 201

📝 Pages indexed:
   • Página Inicial: 245 words
   • Eixos: 189 words
   • Filiação: 156 words
   ...

✅ All pages have been successfully indexed in Algolia!
🔍 You can now search through your content using the index: 'ifmsabrazil_pages'
```

## Indexed Pages

The crawler automatically indexes these static pages:

- **/** - Página Inicial (Home)
- **/eixos** - Eixos
- **/filie-se** - Filiação
- **/estrutura** - Estrutura
- **/noticias** - Notícias
- **/institucional** - Institucional
- **/acoes** - Ações e Temáticas
- **/social-programs** - Programas Sociais
- **/eventos** - Eventos
- **/privacidade** - Política de Privacidade
- **/regulamento** - Regulamento
- **/lojinha_ag62** - Lojinha AG62
- **/outras-modalidades** - Outras Modalidades
- **/memoria** - Memória Institucional
- **/intercambio_nacional** - Intercâmbio Nacional
- **/intercambio_internacional** - Intercâmbio Internacional
- **/cobem** - COBEM

## Search Data Structure

Each indexed record contains:

```javascript
{
  objectID: "unique_page_identifier",
  title: "Page Title",
  path: "/page-path",
  url: "https://full-url.com/page-path",
  content: "Full markdown content...",
  excerpt: "First 50 words preview...",
  wordCount: 245,
  lastUpdated: "2024-01-01T00:00:00.000Z",
  type: "page",
  tags: ["category1", "category2"]
}
```

## Using the Search Component

### Basic Usage

```jsx
import AlgoliaSearch from './components/AlgoliaSearch';

function App() {
  return (
    <div>
      <AlgoliaSearch placeholder="Pesquisar no site..." />
    </div>
  );
}
```

### Advanced Usage with Custom Handler

```jsx
import AlgoliaSearch from './components/AlgoliaSearch';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const navigate = useNavigate();

  const handleResultClick = (result) => {
    // Custom navigation logic
    navigate(result.path);
    
    // Or analytics tracking
    gtag('event', 'search_result_click', {
      search_term: query,
      result_title: result.title
    });
  };

  return (
    <AlgoliaSearch 
      placeholder="Buscar páginas..." 
      onResultClick={handleResultClick}
    />
  );
}
```

## Search Features

The search component provides:

- **Real-time search** with 300ms debounce
- **Highlighted matches** in titles and excerpts
- **Tag-based categorization**
- **Word count display**
- **Responsive design**
- **Keyboard navigation** support
- **Click outside to close**

## Algolia Index Configuration

The crawler automatically configures your Algolia index with:

### Searchable Attributes
- `title` (most important)
- `content`
- `excerpt`
- `tags`

### Faceting Attributes
- `type` (for filtering by content type)
- `tags` (for category filtering)

### Custom Ranking
- Pages with more words rank higher (`desc(wordCount)`)

### Highlighting
- Pre/post tags: `<mark>` and `</mark>`
- Snippet ellipsis: `...`
- Results per page: 10

## Automation

### Scheduled Crawling

You can set up automated crawling using:

#### GitHub Actions
```yaml
name: Update Search Index
on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  workflow_dispatch:

jobs:
  crawl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run crawl
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
```

#### Cron Job
```bash
# Add to your crontab for daily indexing
0 2 * * * cd /path/to/your/project && npm run crawl
```

## Troubleshooting

### Common Issues

1. **No content extracted**
   - Check if your components export content properly
   - Verify the base URL is accessible
   - Ensure pages render without JavaScript errors

2. **Algolia API errors**
   - Verify your API credentials
   - **"Not enough rights" error**: Make sure you're using an Admin API key, not a Search-only key
   - Check your Algolia usage limits
   - Ensure proper network connectivity

3. **Search not working**
   - Verify the index name matches
   - Check browser console for errors
   - Ensure Algolia credentials are correct in the search component

### Debug Mode

Enable debug logging by setting an environment variable:

```bash
DEBUG=crawler npm run crawl
```

## Performance Considerations

- The crawler processes pages sequentially to avoid overwhelming servers
- Search queries are debounced by 300ms to reduce API calls
- Results are limited to 8 items for optimal performance
- Content extraction focuses on meaningful text only

## Security Notes

- API keys should be stored as environment variables in production
- The search-only API key should have limited permissions
- Consider rate limiting if exposing search publicly

## Updates

To update the indexed content:

1. Run the crawler again: `npm run crawl`
2. The crawler will overwrite existing records with fresh content
3. New pages will be automatically added
4. Removed pages should be manually deleted from Algolia

## Support

For issues related to:
- **Crawler functionality**: Check the console output and error messages
- **Search component**: Verify React component integration
- **Algolia service**: Consult [Algolia documentation](https://www.algolia.com/doc/)

---

## Next Steps

1. **Test the crawler**: Run `npm run crawl` to index your pages
2. **Integrate search**: Add the `AlgoliaSearch` component to your app
3. **Customize styling**: Modify the styled-components to match your design
4. **Set up automation**: Schedule regular crawling for fresh content
5. **Monitor usage**: Check your Algolia dashboard for search analytics 