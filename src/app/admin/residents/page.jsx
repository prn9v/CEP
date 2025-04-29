'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../../styles/ResidentsList.css';

// Mock data for residents
const mockResidents = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'male',
    isCurrentlyPresent: true,
    isNowRehabilited: false,
    isAlive: true,
    photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: '2023-05-15'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    age: 35,
    gender: 'female',
    isCurrentlyPresent: true,
    isNowRehabilited: true,
    isAlive: true,
    photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinedDate: '2023-06-22'
  },
  {
    id: 3,
    name: 'Amit Patel',
    age: 28,
    gender: 'male',
    isCurrentlyPresent: true,
    isNowRehabilited: false,
    isAlive: true,
    photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    joinedDate: '2023-07-10'
  },
  {
    id: 4,
    name: 'Sunita Gupta',
    age: 52,
    gender: 'female',
    isCurrentlyPresent: true,
    isNowRehabilited: false,
    isAlive: true,
    photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    joinedDate: '2023-08-05'
  },
  {
    id: 5,
    name: 'Rahul Verma',
    age: 31,
    gender: 'male',
    isCurrentlyPresent: true,
    isNowRehabilited: true,
    isAlive: true,
    photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    joinedDate: '2023-09-18'
  }
];

// Generate more mock data to have 150 residents
for (let i = 6; i <= 150; i++) {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  mockResidents.push({
    id: i,
    name: `Resident ${i}`,
    age: Math.floor(Math.random() * 50) + 20,
    gender,
    isCurrentlyPresent: Math.random() > 0.1,
    isNowRehabilited: Math.random() > 0.7,
    isAlive: true,
    photoUrl: `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${i % 99}.jpg`,
    joinedDate: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
  });
}

const ResidentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: 'all',
    status: 'all',
    rehabilitated: 'all'
  });
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 12;
  
  useEffect(() => {
    // Simulate fetching data from an API
    fetchResidents();
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1);
  };

  const fetchResidents = async () => {
    try {
      const response = await fetch("/api/resident", {
        method: "GET",
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Just log it to confirm
        setResidents(data.residents); // data.residents
      } else {
        console.error("Failed to fetch Residents:", response.statusText);
        setResidents(mockResidents);
      }
    } catch (error) {
      console.error("Error fetching Residents data:", error);
      setResidents(mockResidents);
    }
  };
  
  
  // Apply filters and search
  const filteredResidents =  (residents || []).filter(resident => {
    const matchesSearch = resident.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = filters.gender === 'all' || resident.gender === filters.gender;
    
    const matchesStatus = 
      filters.status === 'all' || 
      (filters.status === 'present' && resident.isCurrentlyPresent) ||
      (filters.status === 'not-present' && !resident.isCurrentlyPresent);
    
    const matchesRehabilitation = 
      filters.rehabilitated === 'all' || 
      (filters.rehabilitated === 'yes' && resident.isNowRehabilited) ||
      (filters.rehabilitated === 'no' && !resident.isNowRehabilited);
    
    return matchesSearch && matchesGender && matchesStatus && matchesRehabilitation;
  });
  
  // Pagination
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirstResident, indexOfLastResident);
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Sahyadri Hope</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="nav-item">
            <i className="nav-icon dashboard-icon"></i>
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/add-person" className="nav-item">
            <i className="nav-icon add-person-icon"></i>
            <span>Add Person</span>
          </Link>
          <Link href="/admin/residents" className="nav-item active">
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
          <h1>Current Residents</h1>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="profile-image"></div>
          </div>
        </div>
        
        <div className="residents-controls">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-input"
            />
            <i className="search-icon"></i>
          </div>
          
          <div className="filter-container">
            <div className="filter-group">
              <label>Gender:</label>
              <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status:</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="not-present">Not Present</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Rehabilitated:</label>
              <select name="rehabilitated" value={filters.rehabilitated} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="residents-count">
          Showing {currentResidents.length} of {filteredResidents.length} residents
        </div>
        
        <div className="residents-grid">
          {currentResidents.length > 0 ? (
            currentResidents.map(resident => (
              <div key={resident._id || resident.id} className="resident-card">
                <div className="resident-photo">
                  <img 
                    className='object-contain object-top' 
                    src={resident.photoOfPerson || resident.photoUrl} 
                    alt={resident.name} 
                  />
                  {resident.isNowRehabilited && (
                    <span className="resident-badge rehabilitated">Rehabilitated</span>
                  )}
                  {!resident.isCurrentlyPresent && (
                    <span className="resident-badge not-present">Not Present</span>
                  )}
                </div>
                
                <div className="resident-info">
                  <h3>{resident.name}</h3>
                  <div className="resident-details">
                    <p><span>Age:</span> {resident.age}</p>
                    <p><span>Gender:</span> {resident.gender.charAt(0).toUpperCase() + resident.gender.slice(1)}</p>
                    <p><span>Joined:</span> {resident.joinedDate}</p>
                  </div>
                  <div className="resident-actions">
                    <Link href={`/admin/residents/${resident._id || resident.id}`}>
                      <button className="view-button">View Details</button>
                    </Link>
                    <Link href={`/admin/residents/${resident._id || resident.id}/edit`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-residents">No residents found matching your criteria.</div>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(num => (
                  num === 1 || 
                  num === totalPages || 
                  (num >= currentPage - 2 && num <= currentPage + 2)
                ))
                .map(number => {
                  if (number === currentPage) {
                    return (
                      <span key={number} className="page-number active">{number}</span>
                    );
                  }
                  
                  return (
                    <button 
                      key={number} 
                      onClick={() => paginate(number)} 
                      className="page-number"
                    >
                      {number}
                    </button>
                  );
                })}
            </div>
            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentsList;