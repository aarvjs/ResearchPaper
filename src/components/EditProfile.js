import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  // Initialize form data
  const [profileData, setProfileData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    country: '',
  });

  const [message, setMessage] = useState("");

  // Fetch user data from API (Replace with your actual API endpoint)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/profile", {  // Correct API endpoint
          headers: { Authorization: `Bearer ${token}` },  // Include token for authentication
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put("/edit-profile", profileData, {  // Correct API endpoint
        headers: { Authorization: `Bearer ${token}` },  // Include token for authentication
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Edit Profile
      </h2>

      {message && (
        <div
          style={{
            textAlign: "center",
            color: message === "Profile updated successfully!" ? "green" : "red",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={profileData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="repassword"
            value={profileData.repassword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            value={profileData.country}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
