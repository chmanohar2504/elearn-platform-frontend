import React, { useState } from "react";
import "./navbar.css";

const Navbar = ({ onNavigate, activePage, loggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const allLinks = [
    { label: "Home",      page: "home",      protected: false },
    { label: "Dashboard", page: "dashboard", protected: true  },
    { label: "Courses",   page: "courses",   protected: true  },
    { label: "Quiz",      page: "quiz",      protected: true  },
    { label: "Analytics", page: "analytics", protected: true  },
    { label: "Profile",   page: "profile",   protected: true  },
  ];

  const links = allLinks.filter(l => !l.protected || loggedIn);

  const handleNav = (page) => {
    setMenuOpen(false);
    if (!loggedIn && page !== "home") {
      onNavigate("login");
      return;
    }
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => handleNav("home")}>
        <div className="nav-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
        </div>
        <span className="nav-logo-text">
          Learn<span className="nav-logo-accent">Smart</span>
        </span>
      </div>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.page}>
            <button
              className={`nav-link ${activePage === l.page ? "active" : ""}`}
              onClick={() => handleNav(l.page)}
            >
              {l.label}
              {activePage === l.page && <span className="nav-underline" />}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button className="nav-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>

        <button
          className="nav-avatar"
          onClick={() => loggedIn ? handleNav("profile") : handleNav("login")}
        >
          A
        </button>

        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <button
            key={l.page}
            className={`nav-mobile-link ${activePage === l.page ? "active" : ""}`}
            onClick={() => handleNav(l.page)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;