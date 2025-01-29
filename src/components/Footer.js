import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',  // Lighter background for white theme
      color: '#333',  // Darker text for contrast
      textAlign: 'center',
      padding: '20px 0',  // Added padding for better spacing
      fontSize: '16px',  // Slightly larger font for better readability
      position: 'relative',
      width: '100%',
      marginTop: '30px',  // Added margin to move footer down
      borderTop: '1px solid #e0e0e0',  // Light border for separation
    }}>
      <p style={{ margin: '0' }}>Copyright © University of Kragujevac - Faculty of Science, 2025</p>
    </footer>
  );
};

export default Footer;
