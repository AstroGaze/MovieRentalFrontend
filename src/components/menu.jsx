import React, { useState } from "react";
import NavbarCustom from "./navbar";

function Menu() {
  const [activeLink, setActiveLink] = useState(null); // Track the active link

  const handleClick = (linkName) => {
    setActiveLink(linkName); // Update active link on click
  };
  return <NavbarCustom />;
}

export default Menu;
