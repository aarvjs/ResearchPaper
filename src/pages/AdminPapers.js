import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faUser, faDownload, faComment } from "@fortawesome/free-solid-svg-icons";

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    paperCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px'
    },
    userName: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#2c3e50'
    },
    userId: {
        color: '#666',
        fontSize: '14px'
    },
    detailsContainer: {
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px'
    },
    button: {
        padding: '8px 16px',
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '500'
    },
    acceptButton: {
        backgroundColor: '#10b981',
        '&:hover': {
            backgroundColor: '#059669'
        }
    },
    rejectButton: {
        backgroundColor: '#ef4444',
        '&:hover': {
            backgroundColor: '#dc2626'
        }
    },
    downloadButton: {
        backgroundColor: '#3b82f6',
        '&:hover': {
            backgroundColor: '#2563eb'
        }
    },
    feedbackButton: {
        backgroundColor: '#8b5cf6',
        '&:hover': {
            backgroundColor: '#7c3aed'
        }
    },
    feedbackSection: {
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "#f3f4f6",
        borderRadius: "6px",
    },
    textarea: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #d1d5db",
        marginBottom: "12px",
        minHeight: "100px",
        resize: "vertical",
    },
    submitButton: {
        backgroundColor: "#8b5cf6",
        color: "white",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
    },
    noData: {
        textAlign: "center",
        color: "#6b7280",
        padding: "24px",
    }
};

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
            console.log('Fetched papers:', data); // Check karne ke liye
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

    const downloadPaper = async (paperId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/download-attachment/${paperId}`, {
                headers: {
                    'Authorization': token
                }
            });
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `paper-${paperId}.pdf`;
            a.click();
        } catch (error) {
            console.error('Error downloading paper:', error);
            alert('Failed to download paper');
        }
    };

    if (loading) {
        return <div style={styles.noData}>Loading...</div>;
    }

    const handleStatusUpdate = async (paperId, newStatus) => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/admin/update-paper-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              paperId,
              status: newStatus
            })
          });
      
          if (response.ok) {
            fetchPapers(); // Refresh the list
          }
        } catch (error) {
          console.error('Error updating status:', error);
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

    return (
        <div style={styles.container}>
            {papers.map((paper) => (
                <div 
                    key={paper.id} 
                    style={styles.paperCard}
                    onClick={() => setShowDetails(showDetails === paper.id ? null : paper.id)}
                >
                    <div style={styles.userInfo}>
                        <FontAwesomeIcon icon={faUser} />
                        <span style={styles.userName}>{paper.submitter_name}</span>
                        <span style={styles.userId}>ID: {paper.user_id}</span>
                    </div>

                    {showDetails === paper.id && (
                        <div style={styles.detailsContainer}>
                            <h3>{paper.title}</h3>
                            {paper.authors && (
                                <p><strong>Authors:</strong> {paper.authors}</p>
                            )}
                            
                            <div style={styles.buttonGroup}>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAcceptReject(paper.id, 'accepted');
                                    }}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#10b981'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                    Accept
                                </button>

                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAcceptReject(paper.id, 'rejected');
                                    }}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#ef4444'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                    Reject
                                </button>

                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPaper(paper.id);
                                    }}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#8b5cf6'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faComment} />
                                    Feedback
                                </button>
                            </div>

                            {selectedPaper === paper.id && (
                                <div style={styles.feedbackSection}>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Enter feedback..."
                                        style={styles.textarea}
                                    />
                                    <button
                                        style={{ ...styles.button, ...styles.feedbackButton }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSubmitFeedback(paper.id);
                                        }}
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