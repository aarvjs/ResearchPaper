import React, { useState } from 'react';
import axios from 'axios';

function SubmitArticle() {
    const [formData, setFormData] = useState({
        title: '',
        msccode: '',
        attachment: null,
        author: '',
        additionAuthors: '',
        suggestedEditors: '',
        message: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('msccode', formData.msccode);
        form.append('attachment', formData.attachment);
        form.append('author', formData.author);
        form.append('additionAuthors', formData.additionAuthors);
        form.append('suggestedEditors', formData.suggestedEditors);
        form.append('message', formData.message);

        try {
            const response = await axios.post('http://localhost:5000/submit-paper', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (error) {
            alert('Submission failed');
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
    };

    const headingStyle = {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333'
    };

    const formGroupStyle = {
        marginBottom: '15px'
    };

    const labelStyle = {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#555'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };

    const textareaStyle = {
        ...inputStyle,
        height: '100px',
        resize: 'vertical'
    };

    const fileInputStyle = {
        ...inputStyle,
        padding: '5px'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Research Paper Submission</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label htmlFor="title" style={labelStyle}>Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Enter the title of your research paper" 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="msccode" style={labelStyle}>MSC Code</label>
                    <input 
                        type="text" 
                        id="msccode" 
                        name="msccode" 
                        placeholder="Enter MSC Code" 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="attachment" style={labelStyle}>Attachment</label>
                    <input 
                        type="file" 
                        id="attachment" 
                        name="attachment" 
                        onChange={handleFileChange} 
                        required 
                        style={fileInputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="author" style={labelStyle}>Author</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        placeholder="Enter author name" 
                        onChange={handleChange} 
                        required 
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="additionAuthors" style={labelStyle}>Additional Authors</label>
                    <input 
                        type="text" 
                        id="additionAuthors" 
                        name="additionAuthors" 
                        placeholder="Enter additional authors (if any)" 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="suggestedEditors" style={labelStyle}>Suggested Editors</label>
                    <input 
                        type="text" 
                        id="suggestedEditors" 
                        name="suggestedEditors" 
                        placeholder="Enter suggested editors" 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Add a message (optional)" 
                        onChange={handleChange} 
                        style={textareaStyle}
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    style={{ ...buttonStyle, ...(formData.title && { ':hover': buttonHoverStyle }) }}
                >
                    Submit Article
                </button>
            </form>
        </div>
    );
}

export default SubmitArticle;