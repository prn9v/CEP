'use client';
import React, { useState } from 'react';
import '../../styles/login.css'; // Assuming you have a CSS file for styles
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !phoneNumber) {
      setError('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Clear form and error after submission
    setEmail('');
    setPhoneNumber('');
    setError('');

    if(phoneNumber === "7263803183" && email === "deshmukhpm_1@rknec.edu"){
      router.push('/admin');
    }else{
      alert('Login attempt successful! You are now eligible to Doante');
      router.push('/');
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue your journey with us</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <i className="input-icon email-icon"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone-number">Phone-Number</label>
            <div className="input-container">
              <i className="input-icon password-icon"></i>
              <input
                id="phone-number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
