import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUser, FaLock, FaEnvelope, FaGlobe, FaKey, FaExclamationCircle } from 'react-icons/fa';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    country: '',
    captchaInput: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedCaptcha = '';
    for (let i = 0; i < 6; i++) {
      generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return generatedCaptcha;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     alert('Registration Successful');
      // Example of sending formData to the backend
      // fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // }).then(response => response.json()).then(data => console.log(data));
  //   }
  // };

  const validateForm = () => {
    const { password, repassword, captchaInput } = formData;
    let formErrors = {};

    if (password !== repassword) formErrors.password = "Passwords do not match.";
    if (captcha !== captchaInput) formErrors.captcha = "Incorrect CAPTCHA.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Sending formData to the backend
      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert('Registration Successful');
          navigate('/'); 
          // Optionally, redirect or reset form
        } else if (data.error) {
          alert('Registration Failed: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
      });
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>New User Registration</h1>
      <form onSubmit={handleSubmit} style={styles.form} className="fadeIn">
        {/* Title ===============================================================*/}
        <div style={styles.inputGroup}>
          <label><FaUser style={styles.icon} /> Title</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
        </div>

        {/* First Name============================================== */}
        <div style={styles.inputGroup}>
          <label><FaUser style={styles.icon} /> First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Last Name========================================== */}
        <div style={styles.inputGroup}>
          <label><FaUser style={styles.icon} /> Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Username ================================================*/}
        <div style={styles.inputGroup}>
          <label><FaUser style={styles.icon} /> Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Email============================================================ */}
        <div style={styles.inputGroup}>
          <label><FaEnvelope style={styles.icon} /> Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Password ==============================================================*/}
        <div style={styles.inputGroup}>
          <label><FaLock style={styles.icon} /> Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Re-enter Password ==================================================*/}
        <div style={styles.inputGroup}>
          <label><FaLock style={styles.icon} /> Re-enter Password</label>
          <input
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Country ====================================================*/}
        <div style={styles.inputGroup}>
          <label><FaGlobe style={styles.icon} /> Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Captcha ==================================================*/}
        <div style={styles.inputGroup}>
          <label><FaKey style={styles.icon} /> Captcha: {captcha}</label>
          <input
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {errors.captcha && <span style={styles.error}><FaExclamationCircle /> {errors.captcha}</span>}
        </div>

        {/* Submit Button ================================*/}
        <button type="submit" style={styles.button} className="fadeIn">Register</button>

        {/* Display Errors ============================================*/}
        {Object.keys(errors).length > 0 && (
          <div style={styles.errorBox}>
            {errors.password && <p style={styles.error}><FaExclamationCircle /> {errors.password}</p>}
          </div>
        )}
      </form>

      {/* Footer======================================================== */}
      <div style={styles.footer}>
        <p>If you have any trouble with registration, please send an email to the administrator at <a href="mailto:mkovacevic@kg.ac.rs">mkovacevic@kg.ac.rs</a></p>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '50px',
  },
  header: {
    textAlign: 'center',
    fontSize: '1.8em',
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '8px',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '12px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '8px',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '1.1em',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#7f8c8d',
  },
  errorBox: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8d7da',
    borderRadius: '5px',
    color: '#721c24',
  },
  error: {
    fontSize: '0.9em',
    color: '#e74c3c',
  },
  icon: {
    marginRight: '8px',
    color: '#3498db',
  },
};

export default RegistrationPage;
