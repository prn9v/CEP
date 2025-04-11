'use client';
import React from 'react';
import './Impact.css'; // Assuming you have a CSS file for styles
import { Heart, Users, Home, Award } from 'lucide-react';

const Impact = () => {
  const impactData = [
    {
      icon: <Users size={36} />,
      number: '500+',
      title: 'Lives Changed',
      description: 'Individuals successfully rehabilitated from begging'
    },
    {
      icon: <Home size={36} />,
      number: '300+',
      title: 'Shelter Provided',
      description: 'Safe housing and accommodation for those in need'
    },
    {
      icon: <Award size={36} />,
      number: '200+',
      title: 'Job Placements',
      description: 'Sustainable employment opportunities created'
    },
    {
      icon: <Heart size={36} />,
      number: '1000+',
      title: 'Donors & Volunteers',
      description: 'Compassionate individuals supporting our cause'
    }
  ];

  return (
    <section className="impact-section" id="impact">
      <div className="container">
        <div className="section-header">
          <h2>Our Impact</h2>
          <p className="section-subheading">Making a Difference in Nagpur, One Life at a Time</p>
        </div>
        
        <div className="impact-grid">
          {impactData.map((item, index) => (
            <div className="impact-card" key={index}>
              <div className="impact-icon">
                {item.icon}
              </div>
              <h3 className="impact-number">{item.number}</h3>
              <h4 className="impact-title">{item.title}</h4>
              <p className="impact-description">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="impact-story">
          <h3>Success Stories</h3>
          <div className="story-container">
            <div className="story-card">
              <div className="story-image"></div>
              <div className="story-content">
                <h4>Rajesh's Journey</h4>
                <p>
                  "After 8 years on the streets, Sahyadri Hope Initiative helped me find dignity and purpose. 
                  Today, I work as a skilled craftsman and can support my family."
                </p>
              </div>
            </div>

            <div className="story-card">
              <div className="story-image"></div>
              <div className="story-content">
                <h4>Anjali's Transformation</h4>
                <p>
                  "The NGO not only provided me shelter but also training in tailoring. 
                  Now I run my own small business and inspire others in my community."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="impact-cta">
          <h3>Join Us in Creating More Success Stories</h3>
          <a href='#donate'><button className="btn-primary">Donate Now</button></a>
          <button className="btn-secondary">Volunteer</button>
        </div>
      </div>
    </section>
  );
};

export default Impact;
