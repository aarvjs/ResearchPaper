import React from 'react';
import book from '../images/book.jpg'; // Import image

function BookSection() {
  return (
    <div
      style={{
        padding: '15px', // Reduced padding
        backgroundColor: '#fff',
        borderRadius: '8px', // Reduced border radius
        height: 'auto',  // Auto height based on content
        overflow: 'hidden',
      }}
    >
      <h3
        style={{
          fontSize: '18px', // Increased font size for the title
          fontWeight: 'bold',
          marginBottom: '10px', // Space below the title
          color: '#333',
        }}
      >
        Latest Issue
      </h3>
      <p
        style={{
          fontSize: '14px',  // Slightly increased font size for the description
          color: '#555',
          marginBottom: '10px', // Space between the description and image
        }}
      >
        Kragujevac Journal of Mathematics Vol. 48 No.6 (2024)
      </p>
      <img 
        src={book} 
        alt="Book Cover" 
        style={{ 
          width: '60%',
          height:'35vh', // Reduced image size
          borderRadius: '6px', // Rounded corners for the image
        }} 
      />
    </div>
  );
}

export default BookSection;
