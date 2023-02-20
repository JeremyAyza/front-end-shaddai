import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NavItem = ({ link, listStyle, name }) => {
  return (
    <Nav.Link as={Link} to={link}>
      {name}
    </Nav.Link>
  );
};

export default NavItem;
