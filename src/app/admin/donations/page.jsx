'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import '../../../styles/DonationStats.css';

// Mock data for donation statistics
const monthlyDonations = [
  { month: 'Jan', amount: 85000 },
  { month: 'Feb', amount: 65000 },
  { month: 'Mar', amount: 92000 },
  { month: 'Apr', amount: 78000 },
  { month: 'May', amount: 110000 },
  { month: 'Jun', amount: 95000 },
  { month: 'Jul', amount: 125000 },
  { month: 'Aug', amount: 140000 },
  { month: 'Sep', amount: 132000 },
  { month: 'Oct', amount: 115000 },
  { month: 'Nov', amount: 128000 },
  { month: 'Dec', amount: 150000 }
];

const donorTypes = [
  { type: 'Individual', percentage: 60, color: '#5e8b7e' },
  { type: 'Corporate', percentage: 25, color: '#a7c4bc' },
  { type: 'NGO Partners', percentage: 10, color: '#2f5d62' },
  { type: 'Government', percentage: 5, color: '#dfeeea' }
];

// Mock data for recent donations
const recentDonations = [
  { id: 1, name: 'Arjun Kapoor', amount: 5000, date: '2023-12-01', email: 'arjun@example.com', status: 'completed' },
  { id: 2, name: 'Meera Sharma', amount: 10000, date: '2023-11-29', email: 'meera@example.com', status: 'completed' },
  { id: 3, name: 'Tech Solutions Ltd.', amount: 50000, date: '2023-11-28', email: 'finance@techsol.com', status: 'completed' },
  { id: 4, name: 'Vikram Patel', amount: 2000, date: '2023-11-28', email: 'vikram@example.com', status: 'pending' },
  { id: 5, name: 'Nisha Reddy', amount: 7500, date: '2023-11-27', email: 'nisha@example.com', status: 'completed' },
  { id: 6, name: 'Green Earth Foundation', amount: 25000, date: '2023-11-26', email: 'contact@greenearthfoundation.org', status: 'completed' },
  { id: 7, name: 'Anil Kumar', amount: 1000, date: '2023-11-25', email: 'anil@example.com', status: 'failed' },
  { id: 8, name: 'Priya Singh', amount: 3000, date: '2023-11-24', email: 'priya@example.com', status: 'completed' },
  { id: 9, name: 'Global Aid Inc.', amount: 45000, date: '2023-11-22', email: 'donations@globalaid.org', status: 'completed' },
  { id: 10, name: 'Rohan Joshi', amount: 5500, date: '2023-11-20', email: 'rohan@example.com', status: 'completed' },
];

const DonationStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  
  // Calculate totals
  const totalDonationAmount = monthlyDonations.reduce((sum, item) => sum + item.amount, 0);
  const totalDonors = 532; // Static count for demonstration
  const averageDonation = Math.round(totalDonationAmount / totalDonors);
  
  // Calculate the max amount for the chart scaling
  const maxDonationAmount = Math.max(...monthlyDonations.map(item => item.amount));

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Sahyadri Hope</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="nav-item active">
            <i className="nav-icon dashboard-icon"></i>
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/add-person" className="nav-item">
            <i className="nav-icon add-person-icon"></i>
            <span>Add Person</span>
          </Link>
          <Link href="/admin/residents" className="nav-item">
            <i className="nav-icon residents-icon"></i>
            <span>Residents</span>
          </Link>
          <Link href="/admin/donations" className="nav-item">
            <i className="nav-icon donations-icon"></i>
            <span>Donations</span>
          </Link>
          <Link href="/" className="nav-item">
            <i className="nav-icon home-icon"></i>
            <span>Back to Site</span>
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="logout-button">
            <i className="logout-icon"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-main">
        <div className="admin-header">
          <h1>Donation Statistics</h1>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="profile-image"></div>
          </div>
        </div>
        
        <div className="stats-overview">
          <div className="stats-card total-donations">
            <div className="stats-icon donations-total-icon"></div>
            <div className="stats-details">
              <h3>₹ {(totalDonationAmount / 100000).toFixed(2)}L</h3>
              <p>Total Donations</p>
            </div>
          </div>
          
          <div className="stats-card total-donors">
            <div className="stats-icon donors-icon"></div>
            <div className="stats-details">
              <h3>{totalDonors}</h3>
              <p>Total Donors</p>
            </div>
          </div>
          
          <div className="stats-card average-donation">
            <div className="stats-icon average-icon"></div>
            <div className="stats-details">
              <h3>₹ {averageDonation}</h3>
              <p>Average Donation</p>
            </div>
          </div>
          
          <div className="stats-card recurring-donors">
            <div className="stats-icon recurring-icon"></div>
            <div className="stats-details">
              <h3>78</h3>
              <p>Recurring Donors</p>
            </div>
          </div>
        </div>
        
        <div className="stats-row">
          <div className="donations-chart-container">
            <div className="chart-header">
              <h2>Donation Trends</h2>
              <div className="chart-period-selector">
                <button 
                  className={selectedPeriod === 'month' ? 'active' : ''} 
                  onClick={() => setSelectedPeriod('month')}
                >
                  Month
                </button>
                <button 
                  className={selectedPeriod === 'quarter' ? 'active' : ''} 
                  onClick={() => setSelectedPeriod('quarter')}
                >
                  Quarter
                </button>
                <button 
                  className={selectedPeriod === 'year' ? 'active' : ''} 
                  onClick={() => setSelectedPeriod('year')}
                >
                  Year
                </button>
              </div>
            </div>
            
            <div className="donations-chart">
              {monthlyDonations.map((item, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar" 
                      style={{ height: `${(item.amount / maxDonationAmount) * 100}%` }}
                    >
                      <span className="chart-value">₹{(item.amount / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <div className="chart-label">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="donor-types-container">
            <h2>Donor Distribution</h2>
            <div className="donor-types-chart">
              <div className="pie-chart">
                {donorTypes.map((item, index) => (
                  <div 
                    key={index}
                    className="pie-segment" 
                    style={{
                      '--percentage': `${item.percentage}%`, 
                      '--color': item.color,
                      '--start': index === 0 ? '0%' : 
                        `${donorTypes.slice(0, index).reduce((sum, d) => sum + d.percentage, 0)}%`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="donor-types-legend">
                {donorTypes.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <div className="legend-text">
                      <span>{item.type}</span>
                      <span>{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="recent-donations">
          <h2>Recent Donations</h2>
          <div className="table-container">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map(donation => (
                  <tr key={donation.id}>
                    <td>{donation.name}</td>
                    <td>{donation.email}</td>
                    <td className="amount-cell">₹ {donation.amount.toLocaleString()}</td>
                    <td>{new Date(donation.date).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className={`status-badge ${donation.status}`}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="table-action-button view">View</button>
                        <button className="table-action-button export">Export</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="view-all-link-container">
            <a href="#" className="view-all-link">View All Donations</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationStats;
