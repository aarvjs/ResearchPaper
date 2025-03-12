import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorDetails = () => {
  const { paperId } = useParams();
  const [authors, setAuthors] = useState([]);
  const [paperTitle, setPaperTitle] = useState("Loading...");
  // const [editor, setEditor] = useState("Loading...");
  // const [submissionTime, setSubmissionTime] = useState("Loading...");
  // const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/get-paper/${paperId}`)
      .then((res) => res.json())
      .then((data) => setPaperTitle(data.title || "No Title Found"))
      .catch(() => setPaperTitle("Error fetching title"));

    // fetch(`http://localhost:5000/get-paper-details/${paperId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setEditor(data.editor || "Not Assigned");
    //     setSubmissionTime(data.submissionTime || "Unknown");
    //     setAttachments(data.attachments || []);
    //   })
    //   .catch(() => setError("Error fetching paper details"));

    fetch(`http://localhost:5000/get-authors/${paperId}`)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch(() => setError("Error fetching authors"));
  }, [paperId]);
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{paperTitle}</h2>
        <h3 style={styles.subTitle}>Author Details</h3>
        {error && <p style={styles.error}>{error}</p>}

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>ID</th>
              <th>Name</th>
              <th>Institution</th>
              <th>Email</th>
              <th>ORCID</th>
              <th>Address</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr key={author.id} style={styles.tableRow}>
                  <td>{author.id}</td>
                  <td>{`${author.title} ${author.firstName} ${author.middleName || ""} ${author.lastName}`}</td>
                  <td>{author.institution}</td>
                  <td>{author.email}</td>
                  <td>{author.orcid || "-"}</td>
                  <td>{author.address}</td>
                  <td>{author.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.noData}>No authors available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <div style={styles.detailsBox}>
          <h3 style={styles.boxTitle}>Editor</h3>
          <p>{editor}</p>

          <h3 style={styles.boxTitle}>Submission Time</h3>
          <p>{submissionTime}</p>

          <h3 style={styles.boxTitle}>Attachments</h3>
          {attachments.length > 0 ? (
            attachments.map((file, index) => (
              <p key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </p>
            ))
          ) : (
            <p>No attachments available</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    // backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    // maxWidth: "1100px",
    backgroundColor: "#fff",
    padding: "20px",
    // borderRadius: "10px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "2px solid #007BFF",
  },
  title: {
    color: "#007BFF",
    fontSize: "24px",
    marginBottom: "15px",
  },
  subTitle: {
    color: "#333",
    fontSize: "18px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
  },
  tableHeader: {
    backgroundColor: "#007BFF",
    color: "#fff",
    textAlign: "left",
    padding: "10px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  noData: {
    textAlign: "center",
    padding: "10px",
    color: "#888",
  },
  detailsBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  boxTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default AuthorDetails;
