import React from "react";
import { Carousel } from "react-bootstrap";
import '../../styles/banner.css'
import axios from 'axios';
import { useState, useEffect } from 'react';


const Banner = () => {

  const [tickers, setTickers] = useState([]);
  useEffect(() => {
    axios.get('https://api.coinlore.net/api/tickers/')
      .then(response => {
        setTickers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);



  return (
    <div className="banner">
  <div className="titulo">
    <h1>CrypoApp</h1>
  </div>
  <div className="parrafo">
    <p>Obtenga toda la información sobre su criptomoneda favorita</p>
  </div>
  <div className="carrusel">
   <Carousel interval={3000} slide>
  {tickers.map(ticker => (
    <Carousel.Item key={ticker.id}>
       <div className="ticker-item">
        <h3>{ticker.name}</h3>
        <p>{ticker.symbol}</p>
        <p className={ticker.price_usd < 0 ? "negativo" : "positivo"}>
          $ {ticker.price_usd}
        </p>
      </div>
    </Carousel.Item>
  ))}
</Carousel>
  </div>
</div>
  );
};

export default Banner;
