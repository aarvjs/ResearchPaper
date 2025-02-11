import React from 'react';

const GuidelinesForAuthors = () => {
  return (
    <div style={{ fontFamily: "'Times New Roman', serif", margin: 0, padding: 0, backgroundColor: '#f9f9f9', color: '#333' }}>
      {/* Page Container */}
      <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          Guidelines for Authors
        </h1>

        {/* Section: Manuscript Submission Format */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#34495e' }}>
          Manuscript Submission Format
        </h2>

        {/* Subsection: Language */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          1. Language
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          The manuscript must be written in clear, concise English.
        </p>

        {/* Subsection: Document Format */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          2. Document Format
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Submit manuscripts in <em>Microsoft Word (.docx)</em> or <em>LaTeX (with .pdf)</em> formats.
        </p>

        {/* Subsection: Page Layout */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          3. Page Layout
        </h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li><strong>Page size:</strong> A4</li>
          <li><strong>Margins:</strong> 1 inch on all sides</li>
          <li><strong>Line spacing:</strong> 1.5</li>
          <li><strong>Font:</strong> Times New Roman</li>
          <li><strong>Font size:</strong>
            <ul>
              <li>Title: 14-point, bold</li>
              <li>Subheadings: 12-point, bold</li>
              <li>Body text: 12-point</li>
            </ul>
          </li>
          <li><strong>Alignment:</strong> Justified</li>
        </ul>

        {/* Subsection: Title Page */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          4. Title Page
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Include the following details:
        </p>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Title of the paper</li>
          <li>Author(s) full name(s)</li>
          <li>Affiliation(s) and designation(s)</li>
          <li>Contact details (email and phone)</li>
          <li>ORCID ID (if available)</li>
        </ul>

        {/* Subsection: Abstract */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          5. Abstract
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          <strong>Word limit:</strong> 200–250 words<br />
          Include keywords (3–6) at the end of the abstract.
        </p>

        {/* Subsection: Sections of the Paper */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          6. Sections of the Paper
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          The paper should follow this structure:
        </p>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li><strong>Introduction:</strong> Background and objectives.</li>
          <li><strong>Literature Review:</strong> Relevant studies and their findings.</li>
          <li><strong>Methodology:</strong> Details of methods, materials, and approaches.</li>
          <li><strong>Results:</strong> Findings presented clearly with tables/graphs (if any).</li>
          <li><strong>Discussion:</strong> Analysis and interpretation of results.</li>
          <li><strong>Conclusion:</strong> Summarize the key findings and implications.</li>
          <li><strong>References:</strong> List all references cited in the paper.</li>
        </ul>

        {/* Subsection: Figures and Tables */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          7. Figures and Tables
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Each figure/table should have a caption (placed below for tables and above for figures). Number them sequentially (e.g., Table 1, Figure 2). Ensure they are clear and relevant.
        </p>

        {/* Subsection: Citations and References */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          8. Citations and References
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Use <em>APA 7th edition format</em> for in-text citations and references. Include DOIs wherever available.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          <strong>Examples:</strong><br />
          - In-text citation: (Smith, 2020)<br />
          - Reference list:<br />
          Smith, J. (2020). Title of the book. Publisher. https://doi.org/xxxxxx
        </p>

        {/* Subsection: Plagiarism Policy */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          10. Plagiarism Policy
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Ensure originality; plagiarism above 10% is unacceptable.
        </p>

        {/* Subsection: Ethical Approval */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          11. Ethical Approval (if applicable)
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          For studies involving humans/animals, provide ethical approval details.
        </p>

        {/* Subsection: Declaration */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '5px', color: '#2c3e50' }}>
          12. Declaration
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Authors must include a declaration of originality and disclose any conflicts of interest.
        </p>

        {/* Section: Submission Process */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#34495e' }}>
          Submission Process
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Submit manuscripts via email to: [your journal’s email]<br />
          Include a cover letter addressing the editor, mentioning the paper’s novelty and importance.
        </p>

        {/* Section: Review Process */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#34495e' }}>
          Review Process
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Papers undergo a double-blind peer review. Feedback and decisions will be communicated within 4–6 weeks.
        </p>

        {/* Section: Copyright */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#34495e' }}>
          Copyright
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Upon acceptance, authors must transfer copyright to the journal.
        </p>

        {/* Section: Additional Requirements */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#34495e' }}>
          Additional Requirements
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>
          Ensure adherence to these guidelines; non-compliance may lead to rejection.
        </p>

        {/* Contact Information */}
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'center', marginTop: '30px', color: '#7f8c8d' }}>
          For further queries, contact the editorial team at [email/contact details].
        </p>
      </div>
    </div>
  );
};

export default GuidelinesForAuthors;