import React from 'react';

const Polymathia = () => {
  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    lineHeight: '1.6',
    color: '#2c3e50',
    borderRadius: '8px',
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '27px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#34495e',
    paddingBottom: '10px',
    borderBottom: '2px solid #3498db',
  };

  const sectionStyle = {
    // marginBottom: '40px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '500',
    color: '#34495e',
    marginBottom: '15px',
    paddingBottom: '8px',
    borderBottom: '1px solid #eaecef',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  const listItemStyle = {
    marginBottom: '8px', 
    fontSize: '16px',
    color: '#4a5568',
    padding: '10px',
    backgroundColor: '#f0f4f8',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
  };

  const listItemHoverStyle = {
    backgroundColor: '#e2e8f0',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Polymathia: International journal of Multidisciplinary</h1>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Editor in Chief</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Dr. Divesh Srivastava</strong> - Associate Professor, Allenhouse Institute of Management, Kanpur, India
          </li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Co-Editors</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Dr. Md. Ibrahim</strong> - Assistant Professor, Department of Electrical Engineering, Integral University Lucknow, India
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Anubhav Sony</strong> - Associate Professor, Allenhouse Institute of Management, Kanpur, India
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Waseem A Khan</strong> - Research Associate Professor, Prince Mohammad Bin Fahad University, Al Khobar, Saudi Arabia
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Mohd Shuaib Siddiqui</strong> - Assistant Professor, Department of Management, University of Tabuk, Kingdom of Saudi Arabia
          </li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Editorial Board</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Mr. Beenoo Singh</strong> - Assistant Professor (Management), Allenhouse Business School, Kanpur
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Hiba Haroon</strong> - Assistant Professor (Mathematics), Integral University, Lucknow, India
          </li>
          <li style={listItemStyle}>
            <strong>Dr. K G Chaubey</strong> - Associate Professor (Management), Allenhouse Institute of Management, Kanpur, India
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Taueer Khan</strong> - Associate Professor, Department of Liberal Education, Era University, Lucknow
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Mohd. Rashid</strong> - Assistant Professor (English), Integral University, Lucknow
          </li>
          <li style={listItemStyle}>
            <strong>Dr. Farhad Ilahi Bakhsh</strong> - Assistant Professor (Electrical Engg.), NIT Srinagar, India
          </li>
          <li style={listItemStyle}>
            <strong>Mr. Touheed Khan</strong> - Electrical Systems Engineer, Alstom, UK
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Polymathia;