import React from "react";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = ({ name, setName }) => {
  // const name = localStorage.getItem("userDetails");
  const history = useNavigate();
  const logout = () => {
    setName(null)
    localStorage.clear();
    history("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">User Registration</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#Home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        {name ? (
          <Nav>
            <NavDropdown
              title={name}
              style={{ color: "white" }}
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              {/* <i className="fa fa-sign-out" style={{ color: 'white', fontSize: '20px', float: 'right' }} */}
            </NavDropdown>
          </Nav>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
