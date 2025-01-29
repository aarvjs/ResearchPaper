import React from "react";
import ithenticate from '../images/ithenticate.png';
import { Link } from 'react-router-dom';
import ESCI from '../images/ESCI(1).jpg';
import Scopus from '../images/Scopus.png';
import SJR from '../images/SJR.png';
import AMS from '../images/AMS.png';
import ZbMATH from '../images/ZbMATH.jpg';
import EBSCO from '../images/ebsco.png';
import Google from '../images/google.jpg';
import Maths from '../images/Maths.png';

function Home() {
  return (
      <div className="content">
        <div className="main-content">
          <h2>Polymathia, Multidisciplinary Journal</h2>
          <p style={{color:'#323a3f'}}>
            <strong>Publisher:</strong> Faculty of Science, University of Kragujevac, Kragujevac, Serbia
          </p>
          <p style={{color:'#323a3f'}}>
            <strong>ISSN (Print):</strong> 1450-9628 <br />
            <strong>ISSN (Online):</strong> 2406-3045
          </p>
          <p>
            The Polymathia, Multidisciplinary Journal is an international journal
            devoted to research concerning all aspects of mathematics. The
            Journal's policy is to motivate authors to publish research papers
            that represent significant contributions and are of broad interests
            to the fields of pure and applied mathematics.
          </p>
          <p>
            From 2018 the journal appears in one volume and four issues per
            annum: in March, June, September, and December. From 2021 the
            journal appears in one volume and six issues per annum: in February,
            April, June, August, October, and December.
          </p>
          <p>
            Any paper that is submitted for publication in the journal must be
            correct, original, and nontrivial. All manuscripts with positive
            reviewers' reports will be checked by using a plagiarism detection
            service <strong>iThenticate</strong> before the decision on
            acceptance.
          </p>
          <a 
  href="https://www.ithenticate.com/" 
  target="_blank" 
  rel="noopener noreferrer"
>
<img src={ithenticate} className="App-logo" alt="logo" /></a>
          <p>
            This journal approves and supports the International Mathematical
            Union's <a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="highlighted-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Best Current Practices for Journals (2010)
        </a>.
          </p>
          <p>
            European Mathematical Society Ethics Committee -{" "}
            <a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="highlighted-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code of Practice (2012).
        </a>.
          </p>
          <h2>Indexed, abstracted, and reviewed in</h2>
          <ul>
          <li>
    <a
      href="http://ip-science.thomsonreuters.com/cgi-bin/jrnlst/jloptions.cgi?PC=EX"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Emerging Sources Citation Index (ESCI)
    </a>
  </li><br></br>
  <li>
    <a
      href="https://www.scopus.com/home.uri"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Scopus
    </a>
    </li><br></br>
  <li>
  <a
      href="https://www.scimagojr.com/journalsearch.php?q=21100199782&tip=sid&clean=0"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Scimago Journal Rank Q3
      </a>
      </li><br></br>
  <li>
  <a
      href="https://www.ams.org/mr-database"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Mathematical Reviews (MathSciNet)
      </a>
      </li><br></br>
  <li>
  <a
      href="https://zbmath.org/"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Zentralblatt für Mathematik
    </a>
    </li><br></br>
  <li>
  <a
      href="https://www.ebsco.com/"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      EBSCO
      </a>
      </li><br></br>
  <li>
  <a
      href="https://scholar.google.com/"
      style={{
        color: "green",
        textDecoration: "none",
        fontWeight: "bold",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Google Scholar
    </a>
    </li><br></br>
        </ul>
        <div className="logos">
        <a 
  href="http://ip-science.thomsonreuters.com/cgi-bin/jrnlst/jloptions.cgi?PC=EX" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img src={ESCI} alt="logo" height={70} /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a 
  href="https://www.scopus.com/home.uri" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={Scopus}  alt="logo" height={70}/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
  href="https://www.scimagojr.com/journalsearch.php?q=21100199782&tip=sid&clean=0" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={SJR}  alt="logo" height={70} width={200}/></a><br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
  href="https://www.ams.org/mr-database" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={AMS}  alt="logo" height={80} width={200}/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
  href="https://zbmath.org/" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={ZbMATH}  alt="logo" height={70}/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
  href="https://www.ebsco.com/" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={EBSCO}  alt="logo" height={100} /></a><br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
  href="https://scholar.google.com/" 
  target="_blank" 
  rel="noopener noreferrer"
>
        <img src={Google}  alt="logo" height={120} /></a><br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <a href="https://wos-journal.info/journalid/7758#google_vignette"style={{cursor:'pointer'}}>
        <div className="quartile-info">
         
          <img
          
            src={Maths}
            alt="Kragujevac Journal Quartile"
            className="quartile-img"
          
          />
         
         
        </div>
        </a>
        <div className="announcement">
          <h2>
          <a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="highlighted-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          New issue of Polymathia, Multidisciplinary Journal launched!
        </a></h2>
          <p className="info-text">
        It is our pleasure to inform you that we have launched the latest issue
        of <strong>Polymathia, Multidisciplinary Journal Vol. 48 No.6 (2024)</strong>,
        exclusively on this website.{" "}
        <a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="highlighted-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Proceed to journal content and articles.
        </a>
      </p>

      <h2 className="heading"><a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="highlighted-link"
          target="_blank"
          rel="noopener noreferrer"
        >
        Submit your research papers
        </a></h2>

      <p className="instructions">
        To submit your paper, please{" "}
        <a
          href="#"
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="regular-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          create your website account
        </a>{" "}
        first - the Registration box on the right side of this page. If you
        already own an account, please log in with that account and submit your
        article from the options in the main menu.
      </p>

      <p className="instructions">Thank you for your interest in our Journal.</p>
    </div>
        </div>
        </div>
  );
}

export default Home;
