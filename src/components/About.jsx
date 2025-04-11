'use client';
import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Our Initiative</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-frame">
              <img src="grp.jpg" alt="Helping the underprivileged" />
            </div>
          </div>
          
          <div className="about-text">
            <h3>Our Mission</h3>
            <p>
              Sahyadri Gramin Vikas Kalyan Sansthan is a dedicated non-governmental organization working towards the rehabilitation and reintegration of beggars in Nagpur, Maharashtra. We believe that everyone deserves dignity, opportunity, and a chance at a self-reliant life.
            </p>
            
            <h3>Our Vision</h3>
            <p>
              We envision a society where no individual is forced to beg for survival. Through our comprehensive rehabilitation programs, vocational training, and community support systems, we work to transform lives and create sustainable pathways out of poverty.
            </p>
            
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">❤️</div>
                <h4>Compassion</h4>
                <p>We approach our work with empathy and understanding</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h4>Dignity</h4>
                <p>We respect and preserve the dignity of every individual</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon">💪</div>
                <h4>Empowerment</h4>
                <p>We enable people to build self-sufficient lives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-content {
          display: flex;
          gap: var(--spacing-xl);
          align-items: center;
        }
        
        .about-image, .about-text {
          flex: 1;
        }
        
        .image-frame {
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .image-frame:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid var(--primary);
          border-radius: var(--border-radius);
          z-index: -1;
          transform: translate(15px, 15px);
        }
        
        .image-frame img {
          display: block;
          width: 100%;
          height: auto;
        }
        
        .about-text h3 {
          color: var(--primary);
          margin-top: var(--spacing-md);
        }
        
        .about-text p {
          margin-bottom: var(--spacing-md);
          font-size: 1.1rem;
          line-height: 1.7;
        }
        
        .about-values {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }
        
        .value-item {
          background-color: white;
          padding: var(--spacing-md);
          border-radius: var(--border-radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: center;
          transition: var(--transition);
        }
        
        .value-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .value-icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-xs);
        }
        
        .value-item h4 {
          color: var(--primary-dark);
          margin-bottom: var(--spacing-xs);
        }
        
        .value-item p {
          font-size: 0.9rem;
          margin-bottom: 0;
        }
        
        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            gap: var(--spacing-lg);
          }
          
          .image-frame:after {
            transform: translate(10px, 10px);
          }
          
          .about-values {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
