import React from 'react';
import Header from './Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CoingPage = () => {
  const [coinInfo, setCoinInfo] = useState(null);
  
  useEffect(() => {
    const getCoinInfo = async () => {
      const response = await axios.get('https://api.coinlore.net/api/ticker/?id=90');
      setCoinInfo(response.data[0]);
    };
    getCoinInfo();
  }, []);

  if (!coinInfo) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{coinInfo.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Symbol</td>
            <td>{coinInfo.symbol}</td>
          </tr>
          <tr>
            <td>Price (USD)</td>
            <td>{coinInfo.price_usd}</td>
          </tr>
          <tr>
            <td>24h % Change</td>
            <td>{coinInfo.percent_change_24h}%</td>
          </tr>
          <tr>
            <td>Market Cap (USD)</td>
            <td>{coinInfo.market_cap_usd}</td>
          </tr>
          <tr>
            <td>Volume (USD)</td>
            <td>{coinInfo.volume24}</td>
          </tr>
        </tbody>
      </table>
      <div>
        Insertar cualquier otro componente o contenido aquí
      </div>
    </div>
  );
};

export default CoingPage;
