import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import './App.css'; // Assuming you have an external CSS file for styling

const LostPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('An auto-login link has been sent to your email.');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div style={styles.container} className="fadeIn">
      <h1 style={styles.header}>Lost Password</h1>
      <p style={styles.description}>
        Insert the email used for registration. We will send you an auto-login link.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label><FaEnvelope style={styles.icon} /> Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        
        {message && (
          <div style={styles.messageBox}>
            <p style={styles.message}>{message}</p>
          </div>
        )}

        <button type="submit" style={styles.button} className="fadeIn">
          <FaPaperPlane style={styles.icon} /> Send Link
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-out',
    marginTop: '50px',
  },
  header: {
    textAlign: 'center',
    fontSize: '2em',  // Slightly larger header font
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.1em',  // Slightly larger description font
    marginBottom: '20px',
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
    fontSize: '1.1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '8px',
    transition: 'border-color 0.3s',
    ':focus': {
      borderColor: '#3498db',
    },
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  icon: {
    marginRight: '8px',
    color: '#fff',
  },
  messageBox: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    color: '#00695c',
    fontSize: '0.9em',
    textAlign: 'center',
  },
  message: {
    margin: 0,
  },
};

export default LostPasswordPage;
