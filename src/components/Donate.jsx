'use client';
import React from 'react';
import './Donate.css';
import { Heart, DollarSign, CreditCard, Coffee } from 'lucide-react';

const Donate = () => {

  const handleSubmit = () => {
    alert("Payment Successful. Thanks For Donating money for this Noble Cause")
  }
  return (
    <section className="donate-section" id="donate">
      <div className="container">
        <div className="section-header">
          <h2>Support Our Cause</h2>
          <p className="section-subheading">Your contribution can transform lives and build a better community</p>
        </div>
        
        <div className="donate-grid">
          <div className="donate-info">
            <h3>Why Your Support Matters</h3>
            <p>
              Every donation helps us extend our reach and provide essential services to those in need. 
              Whether big or small, your contribution makes a difference in the rehabilitation journey of many individuals.
            </p>
            
            <div className="donation-impact">
              <div className="impact-item">
                <DollarSign size={28} />
                <h4>₹1000</h4>
                <p>Provides meals for 20 people</p>
              </div>
              <div className="impact-item">
                <Coffee size={28} />
                <h4>₹5000</h4>
                <p>Sponsors vocational training for one person</p>
              </div>
              <div className="impact-item">
                <Heart size={28} />
                <h4>₹10000</h4>
                <p>Supports shelter for a family for one month</p>
              </div>
            </div>
          </div>
          
          <div className="donate-form">
            <h3>Make a Donation</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Your email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="amount">Donation Amount (₹)</label>
                <input type="number" id="amount" min="100" placeholder="Amount" required />
              </div>
              
              <div className="donation-frequency">
                <h4>Donation Frequency</h4>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="frequency" value="one-time" defaultChecked />
                    One-time
                  </label>
                  <label>
                    <input type="radio" name="frequency" value="monthly" />
                    Monthly
                  </label>
                  <label>
                    <input type="radio" name="frequency" value="quarterly" />
                    Quarterly
                  </label>
                </div>
              </div>
              
              <div className="payment-methods">
                <h4>Payment Method</h4>
                <div className="payment-options">
                  <button type="button" className="payment-option active">
                    <CreditCard size={20} />
                    <span>Card</span>
                  </button>
                  <button type="button" className="payment-option">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/UPI-Logo-vector.svg" alt="UPI" width="20" />
                    <span>UPI</span>
                  </button>
                  <button type="button" className="payment-option">
                    <DollarSign size={20} />
                    <span>NetBanking</span>
                  </button>
                </div>
              </div>
              
              <button type="submit" className="donate-btn" onClick={handleSubmit}> 
                <Heart size={16} /> Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
