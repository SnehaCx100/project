import React,{useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
// import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  // const history =useNavigate();
  const[removeUser,setRemoveUser] =useState('')
  const logout =() =>{
    setRemoveUser(localStorage.removeItem('userDetails'))
    // history('/login')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">User Registration</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        
        </Nav>
        <i className="fa fa-sign-out"  style={{ color: 'white', fontSize : '20px',float:'right'}} onClick={logout}></i>
      </Container>
    </Navbar>
  );
};

export default Header;
