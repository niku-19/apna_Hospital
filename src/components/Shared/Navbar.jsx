import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      fixed="top"
      className="px-5"
    >
      <Link to="/" className="navbar-brand">
        {" "}
        Apka Apna Hospital{" "}
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/patients" className="nav-link">
            Patients
          </Link>
          <Link to="/wards" className="nav-link">
            Wards
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
