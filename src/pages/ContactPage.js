import React from 'react';

const ContactPage = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <h3 style={{ textAlign: 'center', fontSize: '24px', color: '#333' }}>
        Polymathia, Multidisciplinary Journal
      </h3>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Faculty of Science</strong>
        <br />
        Radoja Domanovića 12
        <br />
        34000 Kragujevac, Serbia
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Tel:</strong> +381 34 336223
        <br />
        <strong>Fax:</strong> +381 34 335040
        <br />
        <strong>Email:</strong>{' '}
        <a
          href="mailto:krag_j_math@kg.ac.rs"
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          krag_j_math@kg.ac.rs
        </a>
      </p>
    </div>
  );
};

export default ContactPage;

