import axios from 'axios';
import * as XLSX from 'xlsx';

// Function to parse date strings in the format "dd MM yyyy"
const parseDateString = (dateString) => {
  const [day, month, year] = dateString.split(' ').map(part => parseInt(part, 10));
  return new Date(year, month - 1, day);
};

const fetchSpreadsheet = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'utf-8' });
    const data = new Uint8Array(response.data);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    // Convert date strings in 'dia-mes-ano' column to JS Date objects and ensure proper encoding
    jsonData.forEach(row => {
      if (row['dia-mes-ano']) {
        row['dia-mes-ano'] = parseDateString(row['dia-mes-ano']);
      }
      Object.keys(row).forEach(key => {
        if (typeof row[key] === 'string') {
          row[key] = decodeURIComponent(escape(row[key]));
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
