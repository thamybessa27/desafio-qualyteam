import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <header className="menu">
      <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
        <Navbar.Brand>QualyTeam</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            <Nav.Link>
              <FontAwesomeIcon icon={faHome} /> Início
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon icon={faPlus} /> Nova Não-Conformidade
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Menu;
