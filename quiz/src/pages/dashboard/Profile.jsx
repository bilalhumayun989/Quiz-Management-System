import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    image: "",
    password: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setProfile({ ...data, password: "" });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      // Create preview URL
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setProfile(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('phone', profile.phone);
    formData.append('location', profile.location);
    formData.append('password', profile.password);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      setProfile({ ...data, password: "" });
      setSelectedFile(null);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-5 fw-bold fs-2" style={{ color: '#101010' }}>Account <span style={{ color: '#5F5F60' }}>Profile</span></h3>

        {message && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="alert alert-success bg-success text-white border-0 mb-4"
          >
            {message}
          </motion.div>
        )}

        {!isEditing ? (
          <div className="profile-display text-center">
            <div className="profile-image-container">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="profile-display-img"
                />
              ) : (
                <div className="profile-placeholder">
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </div>

            <div className="profile-details">
              <h2>{profile.name}</h2>
              <p><i className="bi bi-envelope-fill"></i> {profile.email}</p>
              {profile.phone && <p><i className="bi bi-telephone-fill"></i> {profile.phone}</p>}
              {profile.location && <p><i className="bi bi-geo-alt-fill"></i> {profile.location}</p>}
            </div>

            <button
              className="btn btn-update mt-4 px-5"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile Info
            </button>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleUpdate}
            className="profile-edit-form"
          >
            <div className="text-center mb-4">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="profile-edit-img"
                />
              ) : (
                <div className="profile-placeholder-edit">
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Leave blank to keep same"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <button
                type="button"
                className="btn btn-edit-toggle px-4"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-update px-4">Save Changes</button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}