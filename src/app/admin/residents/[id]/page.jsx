"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
// Assuming you have this CSS file in your project
import "@/styles/ResidentDetails.css"; // Adjust the path as necessary

const ResidentDetails = ({ params }) => {
  const { id: residentId } = use(params); // 
  console.log(residentId, "residentId");

  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResident = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/resident/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResident(data.fetchedResident); // 
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch resident details");
      }
    } catch (error) {
      console.error("Error fetching Resident details:", error);
      setError("An error occurred while fetching resident details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (residentId) {
      fetchResident(residentId);
    }
  }, [residentId]);

  // Sidebar component to reduce duplication
  const Sidebar = () => (
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
  );

  // Header component to reduce duplication
  const Header = () => (
    <div className="admin-header">
      <h1>Resident Details</h1>
      <div className="admin-profile">
        <span>Admin User</span>
        <div className="profile-image"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-container">
        <Sidebar />
        <div className="admin-main">
          <Header />
          <div className="loading-container">
            <p>Loading resident details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resident) {
    return (
      <div className="admin-container">
        <Sidebar />
        <div className="admin-main">
          <Header />
          <div className="error-container">
            <p>{error || "Failed to load resident details"}</p>
            <Link href="/admin/residents">
              <button className="back-button">
                <i className="back-icon"></i>
                <span>Back to All Residents</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="resident-details-container">
          <div className="resident-details-header">
            <Link href="/admin/residents">
              <button className="back-button">
                <i className="back-icon"></i>
                <span>Back to All Residents</span>
              </button>
            </Link>

            <Link href={`/admin/residents/${resident._id}/edit`}>
              <button className="edit-button">
                <i className="edit-icon"></i>
                <span>Edit Resident</span>
              </button>
            </Link>
          </div>

          <div className="resident-details-content">
            <div className="resident-details-photo">
              <img src={resident.photoOfPerson} alt={resident.name} />
              {resident.isNowRehabilited && (
                <span className="resident-badge rehabilitated">
                  Rehabilitated
                </span>
              )}
              {!resident.isCurrentlyPresent && (
                <span className="resident-badge not-present">Not Present</span>
              )}
              {!resident.isAlive && (
                <span className="resident-badge deceased">Deceased</span>
              )}
            </div>

            <div className="resident-details-info">
              <h2>{resident.name}</h2>

              <div className="info-section">
                <h3>Basic Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Age</span>
                    <span className="info-value">{resident.age}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender</span>
                    <span className="info-value">
                      {resident.gender && resident.gender.charAt(0).toUpperCase() +
                        resident.gender.slice(1)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Current Status</span>
                    <span className="info-value">
                      {resident.isCurrentlyPresent ? "Present" : "Not Present"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rehabilitation Status</span>
                    <span className="info-value">
                      {resident.isNowRehabilited
                        ? "Rehabilitated"
                        : "Not Rehabilitated"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Medical Information</h3>
                <img src={resident.medicalReportPhoto}/>
              </div>
            </div>
          </div>

          <div className="document-section">
            <h3>Documents</h3>
            <div className="documents-grid">
              <div className="document-item">
                <div className="document-preview">
                  <img
                    src={resident.addharCard}
                    alt="Aadhar Card"
                  />
                </div>
                <span className="document-label">Aadhar Card</span>
              </div>
              <div className="document-item">
                <div className="document-preview">
                  <img
                    src={resident.medicalReportPhoto}
                    alt="Medical Report"
                  />
                </div>
                <span className="document-label">Medical Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;