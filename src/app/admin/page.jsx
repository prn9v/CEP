"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/AdminPanel.css";

const AdminPanel = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [residents, setResidents] = useState([]);
  const [rehabilitated, setRehabilitated] = useState([]);
  const [rehabilitatedCount, setRehabilitatedCount] = useState(0);
  const [residentsLength, setResidentsLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch("/api/resident");

        if (response.ok) {
          const data = await response.json();
          setResidents(data.residents);
          setRehabilitated(data.residents.filter((resident) => resident.isNowRehabilited));
          setRehabilitatedCount(data.residents.filter((resident) => resident.isNowRehabilited).length);
          setResidentsLength(data.residents.length);
        } else {
          console.error("Failed to fetch Residents:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Residents data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

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
          <h1>Welcome to Admin Dashboard</h1>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="profile-image"></div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-box">
            <h3>{!hasMounted || loading ? "Loading..." : residentsLength}</h3>
            <p>Current Residents</p>
          </div>
          <div className="stat-box ">
            <h3>
              {!hasMounted || loading ? "Loading..." : rehabilitatedCount}
            </h3>
            <p>Rehabilitated</p>
          </div>
          <div className="stat-box">
            <h3>₹ 1.2M</h3>
            <p>Total Donations</p>
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Add New Person</h3>
            <p>Register new resident details and documents</p>
            <Link href="/admin/add-person" className="dashboard-card-button">
              Go to Form
            </Link>
          </div>
          <div className="dashboard-card">
            <h3>Manage Residents</h3>
            <p>View and update information for current residents</p>
            <Link href="/admin/residents" className="dashboard-card-button">
              Manage Residents
            </Link>
          </div>
          <div className="dashboard-card">
            <h3>Donation Statistics</h3>
            <p>View financial reports and donation history</p>
            <Link href="/admin/donations" className="dashboard-card-button">
              View Stats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
