import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faUser, faComment } from "@fortawesome/free-solid-svg-icons";

const AdminPapers = () => {
    const [papers, setPapers] = useState([]);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [showDetails, setShowDetails] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPapers();
    }, []);

    const fetchPapers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/get-papers', {
                headers: {
                    'Authorization': token
                }
            });
            const data = await response.json();
            setPapers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error:', error);
            setPapers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitFeedback = async (paperId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/admin/paper-feedback/${paperId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ feedback })
            });

            if (response.ok) {
                alert('Feedback submitted successfully');
                setFeedback('');
                setSelectedPaper(null);
                fetchPapers();
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback');
        }
    };

    const handleAcceptReject = async (paperId, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/admin/update-status/${paperId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                alert(`Paper ${status} successfully`);
                fetchPapers();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div style={{ textAlign: "center", color: "#6b7280", padding: "24px" }}>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            {papers.map((paper) => (
                <div 
                    key={paper.id} 
                    style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "15px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer"
                    }}
                    onClick={() => setShowDetails(showDetails === paper.id ? null : paper.id)}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <FontAwesomeIcon icon={faUser} />
                        <span style={{ fontSize: "18px", fontWeight: "500", color: "#2c3e50" }}>{paper.submitter_name}</span>
                        <span style={{ color: "#666", fontSize: "14px" }}>ID: {paper.user_id}</span>
                    </div>

                    {showDetails === paper.id && (
                        <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "6px" }}>
                            <h3>{paper.title}</h3>
                            {paper.authors && <p><strong>Authors:</strong> {paper.authors}</p>}
                            
                            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleAcceptReject(paper.id, 'accepted'); }}
                                    style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                                >
                                    <FontAwesomeIcon icon={faCheck} /> Accept
                                </button>

                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleAcceptReject(paper.id, 'rejected'); }}
                                    style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                                >
                                    <FontAwesomeIcon icon={faTimes} /> Reject
                                </button>

                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedPaper(paper.id); }}
                                    style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#8b5cf6", color: "white", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                                >
                                    <FontAwesomeIcon icon={faComment} /> Feedback
                                </button>
                            </div>

                            {selectedPaper === paper.id && (
                                <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "6px" }}>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Enter feedback..."
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #d1d5db", marginBottom: "12px", minHeight: "100px", resize: "vertical" }}
                                    />
                                    <button
                                        style={{ backgroundColor: "#8b5cf6", color: "white", padding: "8px 16px", borderRadius: "4px", border: "none", cursor: "pointer" }}
                                        onClick={(e) => { e.stopPropagation(); handleSubmitFeedback(paper.id); }}
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminPapers;
