'use client';
import React from 'react';
import './Footer.css';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">Sahyadri Hope Initiative</h3>
            <p className="footer-description">
              A registered NGO working towards the rehabilitation and empowerment of beggars in Nagpur, providing them with dignity, skills, and hope.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Facebook size={18} /></a>
              <a href="#" className="social-link"><Instagram size={18} /></a>
              <a href="#" className="social-link"><Twitter size={18} /></a>
              <a href="#" className="social-link"><Youtube size={18} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#impact">Our Impact</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#donate">Donate</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-title">Get Involved</h3>
            <ul className="footer-links">
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Corporate Social Responsibility</a></li>
              <li><a href="#">Fundraise</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={16} />
                <span>Near Cotton Market, Sitabudi <br />Nagpur, Maharashtra 440010</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+91 712 236 6489</span>
              </li>
              <li>
                <Mail size={16} />
                <span>info@sahyadrihope.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © 2023 Sahyadri Gramin Vikas Kalyan Sansthan. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
