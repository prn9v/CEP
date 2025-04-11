"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <a href="#">
            <span>Sahyadri</span> Hope Initiative
          </a>
        </div>

        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          <div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`navbar-links  ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#impact" onClick={() => setMobileMenuOpen(false)}>
              Impact
            </a>
          </li>
          <li>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)}>
              Programs
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
              Success Stories
            </a>
          </li>
          <li>
            <a
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-cta"
            >
              Donate Now
            </a>
          </li>
          <li>
            <a
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-cta"
            >
              Login
            </a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1rem 0;
          transition: var(--transition);
          background-color: transparent;
          text-color: white;
        }

        .navbar-scrolled {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo a {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          font-family: "Poppins", sans-serif;
        }

        .navbar-logo span {
          font-weight: 400;
          color: var(--text-dark);
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
          text-color: white;
          margin: 0;
        }

        .navbar-links a {
          text-decoration: none;
          text-color: white;
          color: var(--text-dark);
          font-weight: 500;
          transition: var(--transition);
          position: relative;
        }

        .navbar-links a:hover {
          color: var(--primary);
        }

        .navbar-links a:after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }

        .navbar-links a:hover:after {
          width: 100%;
        }

        .nav-cta {
          background-color: var(--primary);
          color: white !important;
          padding: 0.5rem 1.2rem;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }

        .nav-cta:hover {
          background-color: var(--primary);
          transform: translateY(-2px);
        }
          
        .nav-cta:after {
          display: none !important;
        }

        .navbar-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }

        .toggle-bar {
          width: 30px;
          height: 3px;
          background-color: var(--text-dark);
          transition: var(--transition);
        }

        .toggle-bar.open:nth-child(1) {
          transform: rotate(45deg) translate(5px, 9px);
        }

        .toggle-bar.open:nth-child(2) {
          opacity: 0;
        }

        .toggle-bar.open:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -9px);
        }

        @media (max-width: 768px) {
          .navbar-toggle {
            display: flex;
            z-index: 1001;
          }

          .navbar-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background-color: white;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
            transition: right 0.4s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          }

          .navbar-links.active {
            right: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
