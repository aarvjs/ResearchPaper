import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoForAuthors = () => {
  const navigate = useNavigate();

  const containerStyle = {
    padding: '15px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    padding: '15px',
    marginBottom: '15px',
  };

  const sectionTitleStyle = {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    paddingBottom: '5px',
  };

  const topSectionStyle = {
    ...sectionStyle,
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f4f9f4',
  };

  const paragraphStyle = {
    fontSize: '1em',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '12px',
  };

  const linkStyle = {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={topSectionStyle}>
        <h2 style={sectionTitleStyle}>A new version of the KJM article style</h2>
        <p style={paragraphStyle}>
          A new version of the KJM article style has been released, starting from 18th January 2016 all submissions should be prepared using the new template.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>About Polymathia, Multidisciplinary Journal</h2>
        <p style={paragraphStyle}>
          Polymathia, Multidisciplinary Journal is an international journal devoted to research concerning all aspects of mathematics. Requirements for acceptance of papers include originality, scientific significance, and clarity of presentation.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Submission Requirements</h2>
        <p style={paragraphStyle}>
          Submissions are accepted with the understanding that the article is the original work of the authors and that the same, or a substantially similar paper, has not been published, nor is under consideration for publication, in another journal.
        </p>
        <p style={paragraphStyle}>
          The submitted contributions must be in English. Manuscripts not written in English will not be considered for publication.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Submission Process</h2>
        <p style={paragraphStyle}>
          The papers should be written as usual in scientific journals. For details, see the articles in the latest issues of this Journal.
        </p>
        <p style={paragraphStyle}>
          Papers should be prepared in TeX or LaTeX and submitted in electronic format exclusively via this website.
        </p>
        <p style={paragraphStyle}>
          All papers are refereed.
        </p>
        <p style={paragraphStyle}>
          When preparing the manuscript, please read the following instructions:<br />
          - <a 
              href="/guide-for-authors" 
              style={linkStyle}
              onClick={(e) => {
                e.preventDefault();
                navigate('/guide-for-authors');
              }}
            >
              Guide for Authors
            </a><br />
          - <a 
              href="/preparation-files" 
              style={linkStyle}
              onClick={(e) => {
                e.preventDefault();
                navigate('/preparation-files');
              }}
            >
              Preparation files
            </a>
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Guide for Authors & Preparation Files</h2>
        <p style={paragraphStyle}>
          Soon after acceptance, a downloadable and printable PDF version of each article is available from the web-page Accepted papers. Reprints will not be sent to authors unless they are ordered. For prices and additional information, please contact the Editorial Board via e-mail at krag_j_math@kg.ac.rs.
        </p>
      </div>
    </div>
  );
};

export default InfoForAuthors;
