import React, { createContext, useContext, useEffect, useState } from 'react'



const Crypto = createContext();

const Cryptocontext = ({children}) => {
    const [currency, setCurrency] = useState("COP")
    const [symbol, setSymbol] = useState("$")


    useEffect(() => {
        if (currency === "COP") setSymbol("$")
        else if ( currency === "USD") setCurrency ("$")
    }, [currency])


  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}

export default Cryptocontext;

export const CryptoState = () => {
  return  useContext(Crypto);
}
