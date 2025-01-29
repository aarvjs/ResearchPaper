import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AuthorDetails = () => {
  const { paperId } = useParams(); // Get the paper ID from the URL
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/get-authors/${paperId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching authors:', error);
      });
  }, [paperId]); // Re-run the effect when paperId changes

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Author Details</h2>
      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
          Error: {error}
        </p>
      )}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#007BFF', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Author ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>First Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Last Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Institution</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author) => (
              <tr key={author.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{author.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{author.first_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{author.last_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{author.institution}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{author.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  color: '#666',
                }}
              >
                No authors available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorDetails;
