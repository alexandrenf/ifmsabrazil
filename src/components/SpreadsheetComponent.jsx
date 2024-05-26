import React, { useEffect, useState } from 'react';
import fetchSpreadsheet from './fetchSpreadsheet.jsx'; // Adjust the path as needed

const SpreadsheetComponent = () => {
  const [data, setData] = useState([]);
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/14lmnc_GTJzWvLatvU9QQIBO9_Xg1fKjBEMYU12FsZuk/export?gid=0&format=csv';

  useEffect(() => {
    const loadData = async () => {
      const spreadsheetData = await fetchSpreadsheet(googleSheetsUrl);
      console.log('Spreadsheet Data:', spreadsheetData); // Debugging: Check the data structure
      setData(spreadsheetData);
    };

    loadData();
  }, [googleSheetsUrl]);

  return (
    <div>
      <h1>Spreadsheet Data</h1>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Dia-Mês-Ano</th>
              <th>Autor</th>
              <th>Resumo</th>
              <th>Link</th>
              <th>Imagem Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row['dia-mes-ano'] ? row['dia-mes-ano'].toLocaleDateString() : ''}</td>
                <td>{row.autor}</td>
                <td>{row.resumo}</td>
                <td>
                  <a href={row.link} target="_blank" rel="noopener noreferrer">
                    {row.link}
                  </a>
                </td>
                <td>
                  <img src={row['imagem-link']} alt="Image" width="100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpreadsheetComponent;
