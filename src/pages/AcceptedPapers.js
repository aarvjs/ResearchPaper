import React from 'react';

const AcceptedPapers = () => {
  const papers = [
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 1 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 2 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 3 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 4 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 5 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 49 No. 6 (2025)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 1 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 2 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 3 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 4 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 5 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 6 (2026)",
    "Polymathia, Multidisciplinary Journal Vol. 50 No. 7 (2026)"
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#36545e', fontSize:'18px' }}>Accepted Papers</h2>
      <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', marginLeft: '20px', color: '#61a203',marginTop:'40px' }}>
        {papers.map((paper, index) => (
          <li key={index} style={{ margin: '15px 0', fontSize: '16px' }}>
            {paper}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedPapers;
