//Este componente es una tabla que muestra información de varias criptomonedas, 
//incluyendo su nombre, símbolo, precio en dólares estadounidenses, 
//cambio porcentual en las últimas 24 horas, capitalización de mercado y volumen. 
//Además, el componente tiene un campo de búsqueda que permite al usuario filtrar 
//las criptomonedas por nombre o símbolo. La tabla también tiene una función de paginación que muestra solo un número determinado de criptomonedas por página.

import { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import '../styles/coinstable.css'
import { Modal } from 'react-bootstrap';


const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState({});
    

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await axios.get("https://api.coinlore.net/api/tickers/");
            setCoins(res.data.data);
        };

        fetchCoins();
    }, []);

    const filterCoins = (coin) => {
        return (
            coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
        );
    };
    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
        setShowModal(true);
    };

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = coins.filter(filterCoins).slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="table-container">
            <h2>Precios de criptomonedas por capitalización de mercado</h2>
            <Form className="d-flex mb-3 justify-content-center">
                <Form.Control
                    type="search"
                    placeholder="Buscar una criptomoneda..."
                    className="me-2"
                    aria-label="Buscar una criptomoneda..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Form>
            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Symbol</th>
                            <th className="text-center">Price (USD)</th>
                            <th className="text-center">24h % Change</th>
                            <th className="text-center">Market Cap (USD)</th>
                            <th className="text-center">Volume (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoins.map((coin) => (
                            <tr key={coin.id}>
                                <td className="text-center" onClick={() => handleCoinClick(coin)}>{coin.name}</td>
                                <td className="text-center">{coin.symbol}</td>
                                <td className="text-center">{coin.price_usd}</td>
                                <td className="text-center" style={{ color: coin.percent_change_24h > 0 ? "green" : "red" }}>
                                    {coin.percent_change_24h}%
                                </td>
                                <td className="text-center">{coin.market_cap_usd}</td>
                                <td className="text-center">{coin.volume24}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCoin.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>ID: {selectedCoin.id}</p>
                    <p>Symbol: {selectedCoin.symbol}</p>
                    <p>Price USD: {selectedCoin.price_usd}</p>
                    <p>Percent Change 24h: {selectedCoin.percent_change_24h}%</p>
                    <p>Market Cap USD: {selectedCoin.market_cap_usd}</p>
                    <p>Volume 24h USD: {selectedCoin.volume24}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-center">
                <ul className="pagination">
                    {coins.filter(filterCoins).length > coinsPerPage &&
                        Array(Math.ceil(coins.filter(filterCoins).length / coinsPerPage))
                            .fill()
                            .map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                    <a className="page-link" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                </ul>
            </div>
        </div>
    );
};

export default CoinsTable;
