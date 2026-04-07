import React, { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = ({ onNavigate, activePage, loggedIn }) => {
  const [darkMode,   setDarkMode]   = useState(() => {
    return localStorage.getItem("ls_darkmode") !== "false";
  });
  const [hidden,     setHidden]     = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const allLinks = [
    { label: "Home",      page: "home",      protected: false },
    { label: "Dashboard", page: "dashboard", protected: true  },
    { label: "Courses",   page: "courses",   protected: true  },
    { label: "Quiz",      page: "quiz",      protected: true  },
    { label: "Analytics", page: "analytics", protected: true  },
    { label: "Profile",   page: "profile",   protected: true  },
  ];

  const links = allLinks.filter(l => !l.protected || loggedIn);

  /* ── hide on scroll down show on scroll up ── */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) {
        setHidden(true);   // scrolling down → hide
      } else {
        setHidden(false);  // scrolling up → show
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  /* ── dark / light mode ── */
  useEffect(() => {
    localStorage.setItem("ls_darkmode", darkMode);
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--bg",      "#080c09");
      root.style.setProperty("--bg2",     "#0a110b");
      root.style.setProperty("--card",    "#0f1810");
      root.style.setProperty("--card2",   "#131f14");
      root.style.setProperty("--border",  "#1a2e1c");
      root.style.setProperty("--border2", "#1f3522");
      root.style.setProperty("--text",    "#e4ede5");
      root.style.setProperty("--text2",   "#6fa876");
      root.style.setProperty("--text3",   "#38583e");
      root.style.setProperty("--green",   "#2ecc71");
      root.style.setProperty("--green2",  "#1aba60");
      document.body.style.background = "#080c09";
      document.body.style.color      = "#e4ede5";
    } else {
      root.style.setProperty("--bg",      "#f0f7f1");
      root.style.setProperty("--bg2",     "#e4f0e5");
      root.style.setProperty("--card",    "#ffffff");
      root.style.setProperty("--card2",   "#f5faf6");
      root.style.setProperty("--border",  "#c8e6c9");
      root.style.setProperty("--border2", "#a5d6a7");
      root.style.setProperty("--text",    "#1a2e1a");
      root.style.setProperty("--text2",   "#2e7d32");
      root.style.setProperty("--text3",   "#388e3c");
      root.style.setProperty("--green",   "#1aba60");
      root.style.setProperty("--green2",  "#0e9e50");
      document.body.style.background = "#f0f7f1";
      document.body.style.color      = "#1a2e1a";
    }
  }, [darkMode]);

  const handleNav = (page) => {
    if (!loggedIn && page !== "home") {
      onNavigate("login");
      return;
    }
    onNavigate(page);
  };

  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>

      {/* ══ ROW 1 — Logo + Moon + Avatar ══ */}
      <div className="nav-top-row">

        {/* Logo */}
        <div className="nav-logo" onClick={() => handleNav("home")}>
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" width="18" height="18">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          </div>
          <span className="nav-logo-text">
            Learn<span className="nav-logo-accent">Smart</span>
          </span>
        </div>

        {/* Moon + Avatar */}
        <div className="nav-right">

          {/* 🌙 Dark / Light toggle */}
          <button
            className="nav-icon-btn"
            onClick={toggleDark}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" width="18" height="18">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" width="18" height="18">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1"  x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1"  y1="12" x2="3"  y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Avatar */}
          <button
            className="nav-avatar"
            onClick={() => loggedIn ? handleNav("profile") : handleNav("login")}
            title={loggedIn ? "Go to Profile" : "Login"}
          >
            A
          </button>

        </div>
      </div>

      {/* ══ ROW 2 — Nav Links ══ */}
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

    </nav>
  );
};

export default Navbar;