import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // ✅ Added function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`site-header-new ${isMenuOpen ? "menu-open" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div
        className="header-logo"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        {/* ✅ Call scrollToTop when logo clicked */}
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            scrollToTop();
          }}
        >
          <img
            src="/logo.jpg"
            alt="Site Logo"
            className="logo-icon rounded-full"
          />
        </Link>
      </div>

      <nav className={`header-nav-center ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>
          <img
            src="/NavLogos/Home.png"
            alt="Home"
            className="nav-icon"
            style={{ width: 55, height: 55, objectFit: "contain" }}
          />
          <span className="nav-text">Home</span>
        </Link>

        <Link to="/events" className="nav-link" onClick={closeMenu}>
          <img
            src="/NavLogos/Events.png"
            alt="Events"
            className="nav-icon"
            style={{ width: 55, height: 55, objectFit: "contain" }}
          />
          <span className="nav-text">Events</span>
        </Link>

        <Link to="/gallery" className="nav-link" onClick={closeMenu}>
          <img
            src="/NavLogos/Gallery.png"
            alt="Gallery"
            className="nav-icon"
            style={{ width: 55, height: 55, objectFit: "contain" }}
          />
          <span className="nav-text">Gallery</span>
        </Link>

        <Link to="/team" className="nav-link" onClick={closeMenu}>
          <img
            src="/NavLogos/Team.png"
            alt="Team"
            className="nav-icon"
            style={{ width: 55, height: 55, objectFit: "contain" }}
          />
          <span className="nav-text">Team</span>
        </Link>

        <Link
          to="/contact"
          className="cta-button contact-glass"
          onClick={closeMenu}
        >
          <svg
            className="cta-icon"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 12 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12.5V4.779L10.383 3V11.5H3ZM3 13.5H10.383V21L3 19.221V13.5ZM11.383 11.5V3.136L21 4.5V11.5H11.383ZM11.383 13.5H21V19.5L11.383 20.864V13.5Z"
              fill="#fff"
            />
          </svg>
          <span className="cta-text">Contact Us</span>
        </Link>
      </nav>

      <button
        className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
