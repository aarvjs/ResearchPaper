import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SubmittedArticle = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);

 
  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // Token fetch karo
  
  //   fetch("http://localhost:5000/get-papers", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": `Bearer ${token}`, // Token bhejo
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPapers(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.error("Error fetching papers:", error);
  //     });
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:5000/get-papers", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) { // Ensure it's an array
          setPapers(data);
        } else {
          setPapers([]); // Fallback to an empty array
        }
      })
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);
  
  


  const downloadFile = async (paperId) => {
    try {
      const response = await fetch(`http://localhost:5000/download-attachment/${paperId}`);
      if (!response.ok) throw new Error("File not found!");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attachment_${paperId}.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const viewFile = (attachmentPath) => {
    if (attachmentPath) {
      window.open(`http://localhost:5000/${attachmentPath}`, "_blank");
    } else {
      alert("No attachment found!");
    }
  };

  

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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>MSC Code</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Suggested Editors</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Submission Time</th>
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
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paper.msccode}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paper.suggestedEditors}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(paper.submission_time).toLocaleString()}
                </td>
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
                No papers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
  <ul style={{ listStyle: "none", padding: "0" }}>
    {papers.map((paper) => (
      <li
        key={paper.id}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9f9f9",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <strong style={{ flex: 1 }}>{paper.title}</strong>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            marginLeft: "10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() => downloadFile(paper.id)}
        >
          Download
        </button>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            marginLeft: "10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() => viewFile(paper.attachmentPath)}
        >
          View
        </button>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default SubmittedArticle;
