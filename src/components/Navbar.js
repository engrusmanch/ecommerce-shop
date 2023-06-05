import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { CartFill } from 'react-bootstrap-icons';
// import logo from './logo.svg';
// import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFilter, MdFilter1, MdFilterList, MdHome, MdListAlt, MdLogin, MdOutlineAddShoppingCart } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../App';

export function MyNavbar({ handleCategory ,setCategory,isAuthenticated}) {
  // const navigate = useNavigate();
  // function navigateToCart(){
  //   navigate(`/carts/1`);
  // }
  const handleSelect = (eventKey) => {
    handleCategory(eventKey);
    setCategory(eventKey);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="bg-dark py-3 sticky-top" style={{ marginBottom: "80px" }}>
        <Container>
          <Navbar.Brand href="#home">Ecommerce Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home<MdHome /></Nav.Link>
            {/* <Nav.Link href="/products">Products<MdListAlt/></Nav.Link> */}
            <Nav.Link href="/carts"><span>Cart</span><MdOutlineAddShoppingCart /></Nav.Link>
            <NavDropdown title="Filter" id="basic-nav-dropdown" onSelect={handleSelect}>
              {/* <NavDropdown.Item> */}
              <NavDropdown title="By Category" style={{ backgroundColor: "black" }}>
                <NavDropdown.Item eventKey="all">All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="electronics">Electronics</NavDropdown.Item>
                <NavDropdown.Item eventKey="jewelery">Jewelry</NavDropdown.Item>
                <NavDropdown.Item eventKey="men's clothing">Men's Clothing</NavDropdown.Item>
                <NavDropdown.Item eventKey="women's clothing">Women's Clothing</NavDropdown.Item>
              </NavDropdown>
              {/* </NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link href="/filter">Filter<MdFilterList /></Nav.Link> */}
            <Nav.Link href="/login">{{isAuthenticated}?`Login/SignUp`:`LogOut`}<MdLogin /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

