import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarPage = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid className="navbar-container">
        <Navbar.Brand href="/" style={{ paddingTop: '1.312rem' }}>
          <img
            alt="logo"
            src="https://ugc.production.linktr.ee/c92a9fdf-fc65-4212-8e90-7d81bc5aa84a_EC67FAA4-007F-4C00-9BC3-06CB97599063.png?io=true&size=avatar-v1_0"
            width="50"
            height="50"
            className="d-inline-block align-top rounded-circle"
          />{' '}
          <span style={{ fontSize: '1.55rem', marginLeft: '7px' }}> 42BakeShop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://linktr.ee/42Bakeshop" target="_blank">
              About
            </Nav.Link>
            {/* <NavDropdown title="Others" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Inventory</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
