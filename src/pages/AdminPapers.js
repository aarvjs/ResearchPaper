import { useEffect, useState } from "react";
import axios from "axios";

const EditorPapers = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first!");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/get-paperss", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Editor Papers Response:", response.data);
        setPapers(response.data);
      } catch (error) {
        console.error("Error fetching papers:", error.response?.data || error.message);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Assigned Papers</h2>
      {papers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No papers assigned to you.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {papers.map((paper) => (
            <li key={paper.id} style={{ 
              background: "#f9f9f9", 
              padding: "15px", 
              marginBottom: "10px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
            }}>
              <h3 style={{ color: "#0056b3", marginBottom: "5px" }}>{paper.title}</h3>
              <p style={{ color: "#555", marginBottom: "10px" }}>MSC Code: {paper.msccode}</p>
              <a
                href={`http://localhost:5000/${paper.attachmentPath}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  background: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                View Paper
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditorPapers;