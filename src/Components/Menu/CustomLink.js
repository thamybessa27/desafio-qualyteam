import React from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLink = React.forwardRef(({ path, icon, children }) => (
  <Nav.Link href={path}>
    <FontAwesomeIcon icon={icon} /> {children}
  </Nav.Link>
));
export default CustomLink;
