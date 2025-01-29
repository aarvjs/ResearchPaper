import React from 'react';
import { Link } from 'react-router-dom';

const SubmissionPage = () => {
  return (
    <div style={{ padding: '20px',  maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#333' }}>
        Submit Your Manuscript
      </h2>
      
      <p style={{ fontSize: '16px', color: '#555' }}>
        Submissions to this journal are to be made exclusively online. In order to submit your paper, you need to be a registered user. Before starting a submission, please read the following to understand how the paper should be prepared. To start a submission, please login or register using the box to the right.
      </p>
      
      <p style={{ fontSize: '16px', color: '#555' }}>
        For more detailed submission instructions, templates, and other information on LaTeX, see <a href="https://link-to-instructions.com" style={{ color: '#007bff' }}>here</a>.
      </p>
      
      <h4 style={{ fontSize: '20px', color: '#333' }}>Preparation</h4>
      <p style={{ fontSize: '16px', color: '#555' }}>
        It is necessary that your manuscript is prepared in TeX or LaTeX and written in English. The system will automatically convert your files to a single PDF file, which will be used in the peer-review process.
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        You should use the KJM article class <code>kjm.cls</code> to prepare your manuscript.
      </p>

      <h4 style={{ fontSize: '20px', color: '#333' }}>Figures and Tables Embedded in Text</h4>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Please ensure that the figures and tables included in the manuscript are placed next to the relevant text. Figures need to be in EPS or PDF format and uploaded when submitting the article.
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Please note that individual figure files larger than 10 MB must be uploaded separately.
      </p>

      <h4 style={{ fontSize: '20px', color: '#333' }}>References</h4>
      <p style={{ fontSize: '16px', color: '#555' }}>
        References need to be in KJM style. Where applicable, author(s) name(s), journal title/book title, chapter title/article title, year of publication, volume number/book chapter, and the pagination must be present. The use of DOI is highly encouraged.
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Note that missing data will be highlighted at proof stage for the author to correct.
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        You are recommended to use the KJM BibTeX style to generate your bibliography.
      </p>

      <h4 style={{ fontSize: '20px', color: '#333' }}>Submission Declaration</h4>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Submission of an article implies that the work described has not been published previously (except in the form of an abstract or as part of a published lecture or academic thesis or as an electronic preprint, see KJM policy link), that it is not under consideration for publication elsewhere, that its publication is approved by all authors and tacitly or explicitly by the responsible authorities where the work was carried out, and that, if accepted, it will not be published elsewhere including electronically in the same form, in English or in any other language, without the written consent of the copyright-holder.
      </p>

      <h4 style={{ fontSize: '20px', color: '#333' }}>To Start a Submission</h4>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Please login or register using the options below.
      </p>
      
      <div style={{ textAlign: 'center' }}>
        <Link to="/login">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </Link>
        <span style={{ margin: '0 10px' }}>or</span>
        <Link to="/register">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </Link>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '16px', color: '#555' }}>
          For more detailed submission instructions, templates, and information on LaTeX, see <a href="https://link-to-instructions.com" style={{ color: '#007bff' }}>here</a>.
        </p>
      </div>
    </div>
  );
};

export default SubmissionPage;
