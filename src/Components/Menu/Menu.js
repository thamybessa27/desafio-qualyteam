import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";

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
            <Link to="/" component={CustomLink} icon={faHome} path="/">
              Início
            </Link>
            <Link
              to="/nova-nao-conformidade"
              component={CustomLink}
              icon={faPlus}
              path="/nova-nao-conformidade"
            >
              Nova não-conformidade
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Menu;
