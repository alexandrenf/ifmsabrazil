const characterMap = {
    'ç': 'c',
    'Ç': 'C',
    'á': 'a',
    'Á': 'A',
    'é': 'e',
    'É': 'E',
    'í': 'i',
    'Í': 'I',
    'ó': 'o',
    'Ó': 'O',
    'ú': 'u',
    'Ú': 'U',
    'à': 'a',
    'À': 'A',
    'ã': 'a',
    'Ã': 'A',
    'õ': 'o',
    'Õ': 'O',
    // Add more mappings as needed
  };
  
  export const convertToAscii = (str) => {
    return str.split('').map(char => characterMap[char] || char).join('');
  };
  