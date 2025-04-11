"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../../styles/AddPerson.css"; // Assuming you have a CSS file for styles

const AddPerson = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    isCurrentlyPresent: true,
    isNowRehabilited: false,
    isAlive: true,
    photoOfPerson: null,
    addharCard: null,
    medicalReportPhoto: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    photoOfPerson: null,
    addharCard: null,
    medicalReportPhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      gender: "male",
      isCurrentlyPresent: true,
      isNowRehabilited: false,
      isAlive: true,
      photoOfPerson: null,
      addharCard: null,
      medicalReportPhoto: null,
    });
    setPreviewUrls({
      photoOfPerson: null,
      addharCard: null,
      medicalReportPhoto: null,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          [name]: reader.result 
        }));
        
        setPreviewUrls(prev => ({ 
          ...prev, 
          [name]: reader.result 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/resident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Successfully created the Resident.");
        handleReset();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Failed to create Resident: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating resident:", error);
      alert("Error creating resident. Please try again.");
    }
  };

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
          <Link href="/admin/add-person" className="nav-item active">
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
          <h1>Add New Person</h1>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="profile-image"></div>
          </div>
        </div>

        <div className="add-person-form-container">
          <form className="add-person-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row checkbox-row">
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isCurrentlyPresent"
                  name="isCurrentlyPresent"
                  checked={formData.isCurrentlyPresent}
                  onChange={handleInputChange}
                />
                <label htmlFor="isCurrentlyPresent">Currently Present</label>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isNowRehabilited"
                  name="isNowRehabilited"
                  checked={formData.isNowRehabilited}
                  onChange={handleInputChange}
                />
                <label htmlFor="isNowRehabilited">Rehabilitated</label>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isAlive"
                  name="isAlive"
                  checked={formData.isAlive}
                  onChange={handleInputChange}
                />
                <label htmlFor="isAlive">Alive</label>
              </div>
            </div>

            <div className="form-divider">
              <span>Documents & Photos</span>
            </div>

            <div className="form-group file-upload">
              <label htmlFor="photoOfPerson">Person's Photo</label>
              <input
                id="photoOfPerson"
                name="photoOfPerson"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="Upload photo of person"
              />
              {previewUrls.photoOfPerson && (
                <div className="file-preview">
                  <img src={previewUrls.photoOfPerson} alt="Person preview" />
                </div>
              )}
            </div>

            <div className="form-group file-upload">
              <label htmlFor="addharCard">Aadhar Card</label>
              <input
                id="addharCard"
                name="addharCard"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="Upload Aadhar card"
              />
              {previewUrls.addharCard && (
                <div className="file-preview">
                  <img src={previewUrls.addharCard} alt="Aadhar card preview" />
                </div>
              )}
            </div>

            <div className="form-group file-upload">
              <label htmlFor="medicalReportPhoto">Medical Report</label>
              <input
                id="medicalReportPhoto"
                name="medicalReportPhoto"
                type="file"
                accept="image/*"
                placeholder="Upload medical report"
                onChange={handleFileChange}
              />
              {previewUrls.medicalReportPhoto && (
                <div className="file-preview">
                  <img
                    src={previewUrls.medicalReportPhoto}
                    alt="Medical report preview"
                  />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="reset"
                onClick={handleReset}
                className="secondary-button"
              >
                Reset Form
              </button>
              <button type="submit" className="primary-button">
                Add Person
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;