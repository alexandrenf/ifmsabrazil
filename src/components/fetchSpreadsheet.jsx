import axios from 'axios';

// Function to parse date strings in the format "dd MM yyyy"
const parseDateString = (dateString) => {
  const [day, month, year] = dateString.split(' ').map(part => parseInt(part, 10));
  return new Date(year, month - 1, day);
};

// Function to parse CSV data with handling for quoted commas and escaped double quotes
const parseCSV = (data) => {
  const lines = data.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
  const headers = lines[0].split(',').map(header => header.trim());
  const rows = lines.slice(1);

  return rows.map((line) => {
    const values = [];
    let insideQuotes = false;
    let value = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && insideQuotes && line[i + 1] === '"') {
        value += '"';
        i++; // Skip the next quote
      } else if (char === '"' && !insideQuotes) {
        insideQuotes = true;
      } else if (char === '"' && insideQuotes) {
        insideQuotes = false;
      } else if (char === ',' && !insideQuotes) {
        values.push(value.trim());
        value = '';
      } else {
        value += char;
      }
    }
    values.push(value.trim()); // Add the last value

    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  });
};

const fetchSpreadsheet = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'utf-8' });
    const data = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
    const jsonData = parseCSV(data);

    // Convert date strings in 'dia-mes-ano' column to JS Date objects and ensure proper encoding
    jsonData.forEach(row => {
      if (row['dia-mes-ano']) {
        row['dia-mes-ano'] = parseDateString(row['dia-mes-ano']);
      }
      Object.keys(row).forEach(key => {
        if (typeof row[key] === 'string') {
          // Normalize Unicode characters
          try {
            row[key] = row[key].normalize('NFC'); // Normalize to NFC (Normalization Form C)
          } catch (e) {
            console.warn(`Error normalizing value for key ${key}: ${row[key]}. Keeping the original value.`, e);
            // Keep original value if normalization fails
          }
        }
      });
    });

    return jsonData;
  } catch (error) {
    console.error('Error fetching the spreadsheet:', error);
    return [];
  }
};

export default fetchSpreadsheet;
