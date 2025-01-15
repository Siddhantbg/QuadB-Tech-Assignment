import React from "react";

const Navbar = ({ toggleSidebar }) => {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="src/assets/menu.png" onClick={toggleSidebar} alt="Menu" className="icon" />
        <img className="logo" src="src/assets/logo.png" alt="Logo"/>
      </div>
      <div className="navbar-right">
        <img src="src/assets/search.png" alt="Search" className="icon" />
        <img src="src/assets/Icon.png" alt="Settings" className="icon" />
        <img src="src/assets/Vector.png" alt="Apps" className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
