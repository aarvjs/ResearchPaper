import React, { useState, useEffect } from "react";
import axios from "axios";

function ResearchPaperSubmit() {
  const [formData, setFormData] = useState({
    title: "",
    msccode: "",
    message: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    correspondingAuthor: "No",
    institution: "",
    email: "",
    orcid: "",
    address: "",
    country: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEditors, setSelectedEditors] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState([]);

  const editors = [
    "Dr. Md. Ibrahim",
    "Dr. Waseem A Khan",
    "Dr. Anubhav Sony",
    "Dr. Mohd Shuaib Siddiqui",
    "Mr. Beenoo Singh",
    "Dr. Taueer Khan",
    "Dr. Hiba Haroon",
    "Dr. KG Chaubey",
    "Dr. Mohd.Rashid",
    "Dr. Farhad ilahi Bakshi",
    "Mr. Touheed Khan",
  ];

  // Fetch Countries=========================================================================
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Add Author========================================
  const handleAddAuthor = (e) => {
    e.preventDefault(); 
    setShowForm(true);
  };

  // Submit Author Details
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate required fields================================
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.institution ||
      !formData.country
    ) {
      alert("Please fill all required fields: First Name, Last Name, Email, Institution, Country.");
      return;
    }

    // Create new author object======================================
    const newAuthor = {
      title: formData.title,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      gender: formData.gender,
      correspondingAuthor: formData.correspondingAuthor,
      institution: formData.institution,
      email: formData.email,
      orcid: formData.orcid,
      address: formData.address,
      country: formData.country,
    };

    // Add the new author to the authorsList==================================
    setAuthorsList([...authorsList, newAuthor]);

    // Reset the form fields===================================================
    setFormData({
      ...formData,
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      correspondingAuthor: "No",
      institution: "",
      email: "",
      orcid: "",
      address: "",
      country: "",
    });

    // Close the form modal
    setShowForm(false);
  };

  // Submit Paper
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
  
    if (authorsList.length === 0) {
      alert("Please add at least one author.");
      return;
    }
  
    const token = localStorage.getItem("token"); // ✅ Token get karo
    if (!token) {
      alert("You must be logged in to submit a paper!");
      return;
    }
  
    const form = new FormData();
    form.append("title", formData.title);
    form.append("msccode", formData.msccode);
    form.append("attachment", selectedFile);
    // form.append("suggestedEditors", selectedEditors.join(", "));
    // form.append("suggestedEditors", JSON.stringify(selectedEditors)); 
    form.append("suggestedEditors", JSON.stringify(selectedEditors));
    form.append("message", formData.message);
  
    try {
      const paperResponse = await axios.post("http://localhost:5000/submit-paper", form, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` // ✅ Token include karo
        },
      });
  
      // Submit Authors
      await axios.post("http://localhost:5000/add-authors", {
        paperId: paperResponse.data.paperId,
        authors: authorsList,
      },{
        headers: { Authorization: `Bearer ${token}` } // ✅ Token authors API me bhi send karo
      });
      // Reset Form
      setFormData({
        title: "",
        msccode: "",
        message: "",
      });
  
      setSelectedFile(null);
      setAuthorsList([]);
      setSelectedEditors([]);
  
      alert("Submission successful!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(`Submission failed: ${error.response?.data?.error || "Server error"}`);
    }
  };
  

  // Handle Editor Selection==========================================
  const handleCheckboxChange = (editor) => {
    setSelectedEditors((prev) =>
      prev.includes(editor)
        ? prev.filter((e) => e !== editor) // Remove editor
        : [...prev, editor] // Add editor
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "10px auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Research Paper Submission
      </h2>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: "10px 0",
        }}
      />

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            *Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "98%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            placeholder="Ensure that the title matches the manuscript."
            required
          />
        </div>

        {/* Attachment Field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            *Attachment:
          </label>
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            style={{
              width: "98%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            required
          />
        </div>

        {/* Authors Section */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Authors:
          </label>
          <button
            type="button" // Ensure this button does not submit the form
            onClick={handleAddAuthor}
            style={{
              display: "inline-block",
              padding: "8px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              cursor: "pointer",
              background: "#f0f0f0",
            }}
          >
            Add Author
          </button>
          <ul>
            {authorsList.map((author, index) => (
              <li key={index}>
                {author.firstName} {author.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* MSC Code Field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            MSC Code:
          </label>
          <input
            type="text"
            name="msccode"
            value={formData.msccode}
            onChange={handleChange}
            style={{
              width: "98%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Suggested Editors Section ==========================================================================*/}
        <div
          style={{
            maxWidth: "500px",
            margin: "40px auto",
            fontFamily: "Arial, sans-serif",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              borderBottom: "3px solid #007bff",
              paddingBottom: "10px",
              color: "#333",
              fontSize: "20px",
            }}
          >
            Suggest Editor for this Paper
          </h3>
          {editors.map((editor) => (
            <label
              key={editor}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "5px",
                background: "#f8f9fa",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="checkbox"
                checked={selectedEditors.includes(editor)}
                onChange={() => handleCheckboxChange(editor)}
                style={{
                  marginRight: "10px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              <strong style={{ fontSize: "16px", color: "#333" }}>{editor}</strong>
            </label>
          ))}
        </div>

        {/* Message Field */}============================================================================================
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            *Message to Editor:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{
              width: "98%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            rows="5"
            required
          />
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Submit Paper
          </button>
        </div>
      </form>

      {/* Author Form Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "30%",
            width: "40%",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h2>Add Author:</h2>
          <button
            onClick={() => setShowForm(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
            }}
          >
            X
          </button>

          <form onSubmit={handleFormSubmit}>
            <label>Title: </label>
            <select name="title" value={formData.title} onChange={handleChange}>
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Dr.</option>
              <option>Prof.</option>
            </select>
            <br />
            <br />

            <label>*First Name: </label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <br />
            <br />

            <label>Middle name: </label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
            <br />
            <br />

            <label>*Last name: </label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <br />
            <br />

            <label>Gender: </label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
            <br />
            <br />

            <label>Corresponding author: </label>
            <select name="correspondingAuthor" value={formData.correspondingAuthor} onChange={handleChange}>
              <option>No</option>
              <option>Yes</option>
            </select>
            <br />
            <br />

            <label>*Institution / University: </label>
            <input type="text" name="institution" value={formData.institution} onChange={handleChange} required />
            <br />
            <br />

            <label>*Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <br />
            <br />

            <label>*Orcid ID: </label>
            <input type="text" name="orcid" value={formData.orcid} onChange={handleChange} />
            <br />
            <br />

            <label>*Address: </label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            <br />
            <br />

            <label>*Country: </label>
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">-- Choose your country --</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <br />
            <br />

            <button type="submit">Add Author</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResearchPaperSubmit;
