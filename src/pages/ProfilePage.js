import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProfileImg from "../images/ProfileImg.png"; // Your image path
import SubmitIcon from "../images/SubmitIcon.png"; 
import ArticlesIcon from "../images/ArticlesIcon.png"; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      {/* Cards Container */}
      <div style={styles.cardsContainer}>
        {/* Edit Profile Card =============================================================================*/}
        <div
          style={{ ...styles.card }}
          onClick={() => navigateTo("/edit-profile")}
        >
          <div style={styles.imageSection}>
            <img src={ProfileImg} alt="Edit Profile" style={styles.image} />
          </div>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>Edit My Profile</div>
            <div style={styles.cardDescription}>
              Change your password, update your name, or modify your location details.
            </div>
            <button style={styles.button}>Edit Profile</button>
          </div>
        </div>

        {/* Online Submission Card========================================================================= */}
        <div
          style={{ ...styles.card }}
          onClick={() => navigateTo("/submit-article")}
        >
          <div style={styles.imageSection}>
            <img src={SubmitIcon} alt="Online Submission" style={styles.image} />
          </div>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>Online Submission</div>
            <div style={styles.cardDescription}>
              Submit your latest articles and track submission progress easily.
            </div>
            <button style={styles.button}>Submit Article</button>
          </div>
        </div>

        {/* Submitted Articles Card ====================================================================*/}
        <div
          style={{ ...styles.card }}
          onClick={() => navigateTo("/submitted-article")}
        >
          <div style={styles.imageSection}>
            <img
              src={ArticlesIcon}
              alt="Submitted Articles"
              style={styles.image}
            />
          </div>
          <div style={styles.cardContent}>
            <div style={styles.cardTitle}>Submitted Articles</div>
            <div style={styles.cardDescription}>
              View your previously submitted articles and their current status.
            </div>
            <button style={styles.button}>View Articles</button>
          </div>
        </div>
        {/* here admin card lgao ++++++++++++++++++++++++++++++++++++++++++++++++++++++++========================================== */}
        {user?.isAdmin && (
         <div
         style={{ ...styles.card }}
         onClick={() => navigateTo("/admin-papers")}
       >
         <div style={styles.imageSection}>
           <img
             src={ArticlesIcon}
             alt="Submitted Articles"
             style={styles.image}
           />
         </div>
         <div style={styles.cardContent}>
           <div style={styles.cardTitle}>Admin Panel</div>
           <div style={styles.cardDescription}>
           Check and manage research papers.
           </div>
           <button style={styles.button}>View Details</button>
         </div>
       </div>
        
      )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "65%",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#e3f2fd",
    borderRadius: "8px",
    width: "30%",
    padding: "20px",
    cursor: "pointer",
    textAlign: "center",
    boxSizing: "border-box",
    minWidth: "200px",
    flexShrink: 0,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
  imageSection: {
    marginBottom: "15px",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  cardContent: {
    padding: "10px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#1565c0",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#1e88e5",
    color: "white",
    border: "none",
    padding: "8px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  "@media (max-width: 768px)": {
    cardsContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      width: "90%",
    },
  },
};

export default ProfilePage;
