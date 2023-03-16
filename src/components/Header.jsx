
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CryptoState } from '../Cryptocontext';
import logo from "../img/logo.png"

function Header(props) {
  const { currency, setCurrency } = CryptoState();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Crypto-App</Navbar.Brand>
        <img src={logo} alt="logo" width="50"/>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            

            <NavDropdown title="Type" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() => setCurrency("USD")}
                active={currency === "USD"}
              >
                USD
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => setCurrency("COP")}
                active={currency === "COP"}
              >
                COP
              </NavDropdown.Item>


            </NavDropdown>
            <Nav.Link className={`logoutNav`}>
              <button onClick={() => props.logout()} className="border-0">Logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;