import React, { useState } from "react";
import { Link } from "react-router-dom";
import './header.css'
function Header({ searchTerm, setSearchTerm }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <Link className="CategoryPage-link" to="/category">
        Categories
      </Link>

      <input
        type="text"
        placeholder="Sök filmer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Link className="BookmarkPage-link" to="/bookmark">
        Bookmarked
      </Link>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;
