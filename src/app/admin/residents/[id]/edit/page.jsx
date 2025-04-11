"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
// Import any required styles
import "@/styles/AddPerson.css"; // Adjust as needed

const ResidentEdit = ({ params }) => {
  const { id: residentId } = use(params);

  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    medicalCondition: "",
    background: "",
    personalBelongings: "",
    contactInfo: "",
    lastLocation: "",
    isCurrentlyPresent: true,
    isNowRehabilited: false,
    isAlive: true,
    // Add other fields as needed
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddDocumentForm, setShowAddDocumentForm] = useState(false);
  const [newDocument, setNewDocument] = useState({ title: "", file: null });

  const fetchResident = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/resident/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResident(data.fetchedResident); //
        
        // Initialize form data with fetched resident's data
        setFormData({
          name: data.fetchedResident.name || "",
          age: data.fetchedResident.age || "",
          gender: data.fetchedResident.gender || "",
          medicalCondition: data.fetchedResident.medicalCondition || "",
          background: data.fetchedResident.background || "",
          personalBelongings: data.fetchedResident.personalBelongings || "",
          contactInfo: data.fetchedResident.contactInfo || "",
          lastLocation: data.fetchedResident.lastLocation || "",
          isCurrentlyPresent: data.fetchedResident.isCurrentlyPresent !== false,
          isNowRehabilited: data.fetchedResident.isNowRehabilited || false,
          isAlive: data.fetchedResident.isAlive !== false,
        });
        
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/resident/${residentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: formData }), // Wrap formData in an object
      });
  
      if (response.ok) {
        const result = await response.json();
        setResident(result.resident); // Update local state with returned data
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update resident");
      }
    } catch (error) {
      setError("Error updating resident");
      console.error("Error updating resident:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const handleAddDocumentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewDocument(prev => ({ ...prev, file: files[0] }));
    } else {
      setNewDocument(prev => ({ ...prev, [name]: value }));
    }
  };


  if (loading) {
    return (
      <div className="admin-container">
        {/* Sidebar remains the same */}
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
            <h1>Edit Resident</h1>
            <div className="admin-profile">
              <span>Admin User</span>
              <div className="profile-image"></div>
            </div>
          </div>

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
        {/* Sidebar remains the same */}
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
            <h1>Edit Resident</h1>
            <div className="admin-profile">
              <span>Admin User</span>
              <div className="profile-image"></div>
            </div>
          </div>

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
          <h1>Edit Resident</h1>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="profile-image"></div>
          </div>
        </div>

        <div className="resident-edit-container">
          <div className="resident-edit-header">
            <Link href={`/admin/resident/${residentId}`}>
              <button className="back-button">
                <i className="back-icon"></i>
                <span>Back to Resident Details</span>
              </button>
            </Link>
          </div>

          {saveSuccess && (
            <div className="success-message">
              Resident information updated successfully!
            </div>
          )}

          <form className="resident-edit-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <div className="resident-details-photo">
                  <img 
                    src={resident.photoOfPerson} 
                    alt={resident.name} 
                    onClick={() => handleImageClick(resident.photoOfPerson)}
                    style={{ cursor: 'pointer' }}
                  />
                  {resident.isNowRehabilited && (
                    <span className="resident-badge rehabilitated">
                      Rehabilitated
                    </span>
                  )}
                  {!resident.isCurrentlyPresent && (
                    <span className="resident-badge not-present">
                      Not Present
                    </span>
                  )}
                  {!resident.isAlive && (
                    <span className="resident-badge deceased">Deceased</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-checkboxes">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="isCurrentlyPresent"
                    name="isCurrentlyPresent"
                    checked={formData.isCurrentlyPresent}
                    onChange={handleChange}
                  />
                  <label htmlFor="isCurrentlyPresent">Currently Present</label>
                </div>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="isNowRehabilited"
                    name="isNowRehabilited"
                    checked={formData.isNowRehabilited}
                    onChange={handleChange}
                  />
                  <label htmlFor="isNowRehabilited">Rehabilitated</label>
                </div>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="isAlive"
                    name="isAlive"
                    checked={formData.isAlive}
                    onChange={handleChange}
                  />
                  <label htmlFor="isAlive">Alive</label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Documents</h3>
              <div className="documents-grid">
                <div className="document-item">
                  <div 
                    className="document-preview"
                    onClick={() => handleImageClick(resident.addharCard)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={resident.addharCard} alt="Aadhar Card" />
                  </div>
                  <span className="document-label">Aadhar Card</span>
                </div>
                <div className="document-item">
                  <div 
                    className="document-preview"
                    onClick={() => handleImageClick(resident.medicalReportPhoto)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={resident.medicalReportPhoto}
                      alt="Medical Report"
                    />
                  </div>
                  <span className="document-label">Medical Report</span>
                </div>
                {resident.additionalDocuments && resident.additionalDocuments.map((doc, index) => (
                  <div className="document-item" key={index}>
                    <div 
                      className="document-preview"
                      onClick={() => handleImageClick(doc.url)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={doc.url} alt={doc.title} />
                    </div>
                    <span className="document-label">{doc.title}</span>
                  </div>
                ))}
              </div>
              
              <div className="add-document-section">
                {showAddDocumentForm && (
                  <div className="add-document-form">
                    <h4>Add New Document</h4>
                    <div className="form-group">
                      <label htmlFor="docTitle">Document Title</label>
                      <input
                        type="text"
                        id="docTitle"
                        name="title"
                        value={newDocument.title}
                        onChange={handleAddDocumentChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="docFile">Document File</label>
                      <input
                        type="file"
                        id="docFile"
                        name="file"
                        onChange={handleAddDocumentChange}
                        required
                      />
                    </div>
                    <button 
                      type="button" 
                      className="upload-document-button"
                      onClick={handleAddDocument}
                    >
                      Upload Document
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <Link href={`/admin/residents/${residentId}`}>
                <button type="button" className="edit-button">
                  Cancel
                </button>
              </Link>
              <button 
              onClick={handleSubmit}
                type="submit" 
                className="edit-button" 
                disabled={saving}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={handleCloseModal}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Full size view" />
          </div>
        </div>
      )}

      {/* CSS for the image modal */}
      <style jsx>{`
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* High z-index to appear above everything */
        }

        .image-modal-content {
          position: relative;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .image-modal-content img {
          display: block;
          max-width: 100%;
          max-height: 80vh; /* Limits height to 80% of viewport height */
          margin: 0 auto;
        }

        .close-modal {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          z-index: 1001; /* Slightly higher than the overlay */
          transition: color 0.2s;
        }

        .close-modal:hover {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default ResidentEdit;