import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Détecter le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Vérifier si le lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Remplacez par votre logo */}
          <span className="logo-text">Gamer Profile</span>
        </Link>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`toggle-icon ${menuOpen ? 'open' : ''}`}></span>
        </div>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-items">
            <li className="navbar-item">
              <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
                Accueil
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/jeux" className={`navbar-link ${isActive('/jeux') ? 'active' : ''}`}>
                Jeux
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/codes" className={`navbar-link ${isActive('/codes') ? 'active' : ''}`}>
                Codes Ami
              </Link>
            </li>
            {/* Ajoutez d'autres liens selon vos besoins */}
          </ul>
          
          {/* <div className="navbar-buttons">
            <Link to="/login" className="navbar-button">
              Connexion
            </Link>
            <Link to="/inscription" className="navbar-button navbar-button-highlight">
              Inscription
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;