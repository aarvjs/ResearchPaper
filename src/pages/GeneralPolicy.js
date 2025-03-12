import React from 'react';

const JournalGuidelines = () => {
  const containerStyle = {
    padding: '30px',
    fontFamily: "'Roboto', sans-serif",
    maxWidth: '1000px',
    margin: '0 auto',
    lineHeight: '1.8',
    color: '#333',
  };

  const headingStyle = {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: '15px',
    borderBottom: '2px solid #E0E0E0',
    paddingBottom: '10px',
  };

  const subheadingStyle = {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#34495E',
    marginTop: '20px',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'justify',
  };

  const listStyle = {
    marginLeft: '20px',
    listStyleType: 'disc',
    paddingLeft: '20px',
  };

  const listItemStyle = {
    marginBottom: '12px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Aims & Scope</h1>
      <p style={paragraphStyle}>
        Polymathia, Multidisciplinary Journal motivates authors to publish significant research papers, which are of broad interest in pure and applied mathematics. From 2021, the journal appears in one volume and six issues per annum: in February, April, June, August, October, and December.
      </p>
      <p style={paragraphStyle}>
        A paper that intends to be published in the Journal must be correct, new in the field with original results, nontrivial, and significant.
      </p>
      <p style={paragraphStyle}>
        The submission of the paper implies the author’s assurance that it has not been copyrighted, published, or submitted for publication elsewhere.
      </p>

      <h2 style={subheadingStyle}>Review Process</h2>
      <p style={paragraphStyle}>
        The journal follows a single-blind peer review approach. Reviews are conducted by at least 2 external reviewers.
      </p>

      <h2 style={subheadingStyle}>Open Access Policy</h2>
      <p style={paragraphStyle}>
        This is an open-access journal, which means that all content is freely available without charge to the user or their institution. Users are allowed to read, download, copy, distribute, print, search, or link to the full texts of the articles, or use them for any other lawful purpose, without asking prior permission from the publisher or the author.
      </p>

      <h2 style={subheadingStyle}>Copyright</h2>
      <p style={paragraphStyle}>
        Copyright on any article is retained by the author(s). Authors grant Polymathia, Multidisciplinary Journal the license to publish and distribute the article within the journal's networks in electronic and print versions, and allows the indexing in other services. The article and any associated published materials are distributed under the Creative Commons License CC BY-ND 4.0.
      </p>
      <p style={paragraphStyle}>
        The CC BY-ND 4.0 license allows anyone to share — to copy and redistribute — the verbatim copy of the material under the following conditions:
      </p>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <strong>Attribution:</strong> You must give credit to the original author(s), provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
        </li>
        <li style={listItemStyle}>
          <strong>NoDerivatives:</strong> If you remix, transform, or build upon the material, you may not distribute the modified material.
        </li>
      </ul>
      <h2 style={subheadingStyle}>Copyright Transfers</h2>
      <p style={paragraphStyle}>
        Any usage rights are regulated through the Creative Commons Attribution-NoDerivatives 4.0 (CC BY-ND 4.0). For any purposes, anyone is free to copy and distribute the article as long as the original author is credited and provided that the article is not altered or modified (see above).
      </p>

      <h2 style={subheadingStyle}>Publication Fees</h2>
      <p style={paragraphStyle}>
        The Polymathia, Multidisciplinary Journal follows a free-of-charge policy for both authors and readers. The Polymathia, Multidisciplinary Journal occasionally publishes special issues, edited by Guest Editors and the Editorial Office.
      </p>
    </div>
  );
};

export default JournalGuidelines;
