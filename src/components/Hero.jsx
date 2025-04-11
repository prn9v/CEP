'use client';
import React from 'react';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Rehabilitating Lives, Restoring Dignity</h1>
          <p className="hero-subtitle">
            Sahyadri Gramin Vikas Kalyan Sansthan is dedicated to transforming the lives of beggars in Nagpur through rehabilitation, education, and empowerment.
          </p>
          <div className="hero-cta">
            <a href="#donate" className="btn">Donate Now</a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          background-image: url('main3.jpg');
          background-size: cover;
          
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          color: var(--text-light);
          repeat: no-repeat;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(56, 142, 60, 0.7) 300%);
        }
        
        .hero-container {
          position: relative;
          z-index: 10;
        }
        
        .hero-content {
          max-width: 700px;
          animation: fadeInUp 1s ease;
        }
        
        .hero-title {
          font-size: 3.5rem;
          margin-bottom: var(--spacing-md);
          font-weight: 700;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: var(--spacing-lg);
          opacity: 0.9;
        }
        
        .hero-cta {
          display: flex;
          gap: var(--spacing-md);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .hero-cta {
            flex-direction: column;
            gap: var(--spacing-sm);
            width: 100%;
          }
          
          .hero-cta .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
