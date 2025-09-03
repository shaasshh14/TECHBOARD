// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`site-header-new ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-logo">
        <Link to="/">
          {/* ADD rounded-full HERE */}
          <img src="/logo.jpg" alt="Site Logo" className="logo-icon rounded-full" />
        </Link>
      </div>

      <nav className="header-nav-center">

        {/* ... (rest of your navigation links) ... */}
         <Link to="/" className="nav-link">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9.5L12 2L21 9.5V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 22V12H15V22"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-text">Home</span>
        </Link>
         <Link to="/events" className="nav-link has-dropdown">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 16H3V4H17V16H15M11 16V18M11 18H7.5M11 18H14.5M19.5 16H20.5C21.0523 16 21.5 15.5523 21.5 15V11C21.5 10.4477 21.0523 10 20.5 10H19.5C18.9477 10 18.5 10.4477 18.5 11V15C18.5 15.5523 18.9477 16 19.5 16ZM20 12V11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-text">Events</span>
        </Link>
        <Link to="/gallery" className="nav-link">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22S19 18 19 12V5L12 2L5 5V12C5 18 12 22 12 22Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-text">Gallery</span>
        </Link>

       {/* teams */}
       <Link to="/team" className="nav-link has-dropdown">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.5 11.5L18.5 9.5M18.5 9.5L16.5 7.5M18.5 9.5H13.5M9 7.5H7M9 11.5H5M2 12C2 7.85786 2 5.7867 3.3934 4.3934C4.7867 3 6.85786 3 11 3H13C17.1421 3 19.2133 3 20.6066 4.3934C22 5.7867 22 7.85786 22 12V13C22 17.1421 22 19.2133 20.6066 20.6066C19.2133 22 17.1421 22 13 22H11C6.85786 22 4.7867 22 3.3934 20.6066C2 19.2133 2 17.1421 2 13V12Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-text">Team</span>
        </Link>
       
      </nav>

      <div className="header-cta-right">
        <Link to="/contact" className="cta-button">
          <svg className="cta-icon" viewBox="0 0 24 24">
            <path d="M3 12.5V4.779L10.383 3V11.5H3ZM3 13.5H10.383V21L3 19.221V13.5ZM11.383 11.5V3.136L21 4.5V11.5H11.383ZM11.383 13.5H21V19.5L11.383 20.864V13.5Z" />
          </svg>
          <span className="cta-text">Contact Us</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;