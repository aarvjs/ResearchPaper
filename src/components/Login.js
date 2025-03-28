import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt, FaPowerOff } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
 
 
 
  // To manage logged-in user data
  const navigate = useNavigate();


   // Check if user is logged in or fetch profile data if not found in localStorage=========================================
   useEffect(() => {
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch {
        return null;
      }
    })();
  
    if (storedUser) {
      setUser(storedUser);
    } else if (localStorage.getItem('token')) {
      fetchProfileData();
    } else {
      console.error('No user data or token found! Redirecting to login...');
      // navigate('/login'); 
    }
  }, []);
  
     // Check if user is logged in or fetch profile data if not found in localStorage=========================================

  
  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data)); // Cache user data
        setUser(data);
      } else {
        const error = await response.json();
        console.error('Error fetching profile data:', error.message);
        if (response.status === 401 || response.status === 403) {
          // navigate('/login'); 
        }
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
    }
  };

   // Check if user is logged in or fetch profile data if not found in localStorage=========================================
  

  // Inline CSS styles
  const styles = {
    container: {
      position: 'relative',
      margin: 'auto',
      width: '100%',
      maxWidth: '280px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    heading: {
      textAlign: 'center',
      fontSize: '22px',
      color: '#333',
      fontWeight: '600',
      marginBottom: '15px',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '8px 0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    inputIcon: {
      marginRight: '10px',
      fontSize: '18px',
      color: '#4CAF50',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: 'none',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#3498db',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonHover: {
      backgroundColor: '#368539',
    },
    profileContainer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
    },
    profileHeading: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333',
    },
    logoutButton: {
      marginTop: '15px',
      padding: '10px 15px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
    },
    link: {
      textAlign: 'center',
      marginTop: '10px',
      fontSize: '14px',
      color: '#3498db',
      cursor: 'pointer',
    },
  };

  // Handle Login Submission=================================================================================
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch('http://localhost:5000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.status === 200) {
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       // localStorage.setItem("email", data.user.email); 
  //       setUser(data.user);
  //       navigate('/profile-page');
  //       alert(data.message);
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     alert('Something went wrong. Please try again later.');
  //   }
  // };
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);  // ✅ Token store karna
        setUser(data.user);
        navigate("/profile-page");
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // localStorage.removeItem('users');
    // localStorage.removeItem('user_id');
    setUser(null);
    navigate('/');
    alert('You have been logged out.');
  };

  // Navigate to Forgot Password page=================================================
  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Make sure to create this route later
  };

  // Navigate to Register page====================================================
  const handleRegister = () => {
    navigate('/register'); // Make sure to create this route later
  };



  // Render Login Form or Profile View============================================
  return user ? (
    //after login hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    <div style={{
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      margin: 'auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '1rem',
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#333',
      }}>
        Welcome, {user.firstName} {user.lastName}!  
      </h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#555',
        marginBottom: '20px',
      }}>
        Email: {user.email}
      </p>

      <ul style={{
        listStyleType: 'none',
        padding: '0',
        margin: '0',
      }}>
        <li style={{ marginBottom: '12px' }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50', // Green for profile page
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
            onClick={() => navigate('/profile-page')}  // Navigate to Profile Page
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Profile Page
          </button>
        </li>

        <li style={{ marginBottom: '12px' }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#2196F3', // Blue for submitted papers
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
            onClick={() => navigate('/submitted-article')}  // Navigate to Submitted Papers
            onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            Submitted Papers
          </button>
        </li>

        <li style={{ marginBottom: '12px' }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#f44336', // Red for logout
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }} 
            onClick={handleLogout}  // Logout functionality
            onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            <FaPowerOff style={{ marginRight: '8px' }} /> Logout
          </button>
        </li>
      </ul>
    </div>
        //after end login hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

  ) : (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.inputContainer}>
          <FaUser style={styles.inputIcon} />
          <input
            type="text"
            placeholder="Enter your username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={styles.inputContainer}>
          <FaLock style={styles.inputIcon} />
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          <FaSignInAlt style={{ marginRight: '8px' }} /> Login
        </button>
      </form>
      <div style={styles.link}>
        <span onClick={handleForgotPassword}>Forgot Password?</span> |{' '}
        <span onClick={handleRegister}>Create an Account</span>
      </div>
    </div>
  );
};

export default Login;
