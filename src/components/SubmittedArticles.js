import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SubmittedArticle = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/get-papers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPapers(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching papers:', error);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Research Papers</h2>
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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Author</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {papers.length > 0 ? (
            papers.map((paper) => (
              <tr
                key={paper.id}
                style={{
                  backgroundColor: '#f9f9f9',
                  textAlign: 'left',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
              >
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paper.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link
                    to={`/author-details/${paper.id}`} // Link to AuthorDetails page
                    style={{ textDecoration: 'none', color: '#007BFF' }}
                  >
                    {paper.title}
                  </Link>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paper.author}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(paper.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  color: '#666',
                }}
              >
                No papers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedArticle;
