import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        padding: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "24px",
        color: "#1f2937",
    },
    paperContainer: {
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    paperInfo: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        fontSize: "24px",
        color: "#6b7280",
        marginRight: "16px",
    },
    paperText: {
        color: "#374151",
    },
    buttonGroup: {
        display: "flex",
        gap: "12px",
    },
    button: {
        padding: "8px 16px",
        borderRadius: "6px",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        transition: "background 0.3s",
    },
    acceptButton: {
        backgroundColor: "#10b981",
    },
    acceptButtonHover: {
        backgroundColor: "#059669",
    },
    rejectButton: {
        backgroundColor: "#ef4444",
    },
    rejectButtonHover: {
        backgroundColor: "#dc2626",
    },
};

const AdminDashboard = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        // axios.get("http://localhost:5000/pending-papers").then((res) => setPapers(res.data));
    }, []);

    const updateStatus = async (id, status) => {
        // await axios.post("http://localhost:5000/update-status", { id, status });
        setPapers(papers.filter((paper) => paper.id !== id));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard</h2>
            <div style={styles.card}>
                {papers.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#6b7280" }}>No pending papers.</p>
                ) : (
                    papers.map((paper) => (
                        <div key={paper.id} style={styles.paperContainer}>
                            <div style={styles.paperInfo}>
                                <FontAwesomeIcon icon={faUser} style={styles.icon} />
                                <div>
                                    <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#374151" }}>{paper.title}</h3>
                                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{paper.content}</p>
                                </div>
                            </div>
                            <div style={styles.buttonGroup}>
                                <button 
                                    onClick={() => updateStatus(paper.id, "accepted")} 
                                    style={{ ...styles.button, ...styles.acceptButton }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = styles.acceptButtonHover.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = styles.acceptButton.backgroundColor}
                                >
                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: "8px" }} /> Accept
                                </button>
                                <button 
                                    onClick={() => updateStatus(paper.id, "rejected")} 
                                    style={{ ...styles.button, ...styles.rejectButton }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = styles.rejectButtonHover.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = styles.rejectButton.backgroundColor}
                                >
                                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: "8px" }} /> Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;