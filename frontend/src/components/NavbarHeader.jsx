import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";
import "bootstrap/dist/css/bootstrap.min.css"

const NavbarHeader = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={PathConstants.HOME}>KURYLENKO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={PathConstants.HOME}>Home</Nav.Link>
            <Nav.Link as={Link} to={PathConstants.BLOG}>Blog</Nav.Link>
            <Nav.Link as={Link} to={PathConstants.ACCOUNT}>Account</Nav.Link>
            <Nav.Link as={Link} to={PathConstants.REGISTRATION}>Register</Nav.Link>
            <Nav.Link as={Link} to={PathConstants.LOGIN}>Login</Nav.Link>
            <Nav.Link as={Link} to={PathConstants.PAYMENT}>Buy Photoshoot</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
