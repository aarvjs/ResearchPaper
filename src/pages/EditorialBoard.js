import React from 'react';

const EditorialBoard = () => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
  };

  const sectionStyle = {
    padding: '20px',
    marginBottom: '25px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const sectionTitleStyle = {
    fontSize: '1.5em',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '15px',
    paddingBottom: '8px',
    borderBottom: '2px solid #ddd',
  };

  const paragraphStyle = {
    fontSize: '1em',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '12px',
    marginLeft: '15px',
    marginRight: '15px',
  };

  const listStyle = {
    paddingLeft: '30px',
    fontSize: '1em',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '15px',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Editor-in-Chief:</h2>
        <p style={paragraphStyle}>
          Suzana Aleksić, University of Kragujevac, Faculty of Science, Kragujevac, Serbia
        </p>

        <h2 style={sectionTitleStyle}>Associate Editors:</h2>
        <ul style={listStyle}>
          <li>Tatjana Aleksić Lampert, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Đorđe Baralić, Mathematical Institute of the Serbian Academy of Sciences and Arts, Belgrade, Serbia</li>
          <li>Dejan Bojović, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Bojana Borovićanin, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Nada Damljanović, University of Kragujevac, Faculty of Technical Sciences, Čačak, Serbia</li>
          <li>Slađana Dimitrijević, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Jelena Ignjatović, University of Niš, Faculty of Natural Sciences and Mathematics, Niš, Serbia</li>
          <li>Boško Jovanović, University of Belgrade, Faculty of Mathematics, Belgrade, Serbia</li>
          <li>Emilija Nešović, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Marko Petković, University of Niš, Faculty of Natural Sciences and Mathematics, Niš, Serbia</li>
          <li>Nenad Stojanović, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Tatjana Tomović Mladenović, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Milica Žigić, University of Novi Sad, Faculty of Science, Novi Sad, Serbia</li>
        </ul>

        <h2 style={sectionTitleStyle}>Editorial Board:</h2>
        <ul style={listStyle}>
          <li>Ravi P. Agarwal, Department of Mathematics, Texas A&M University-Kingsville, Kingsville, TX, USA</li>
          <li>Dragić Banković, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Richard A. Brualdi, University of Wisconsin–Madison, Mathematics Department, Madison, Wisconsin, USA</li>
          <li>Bang-Yen Chen, Michigan State University, Department of Mathematics, Michigan, USA</li>
          <li>Claudio Cuevas, Federal University of Pernambuco, Department of Mathematics, Recife, Brazil</li>
          <li>Miroslav Ćirić, University of Niš, Faculty of Natural Sciences and Mathematics, Niš, Serbia</li>
          <li>Sever Dragomir, Victoria University, School of Engineering & Science, Melbourne, Australia</li>
          <li>Vladimir Dragović, The University of Texas at Dallas, School of Natural Sciences and Mathematics, Dallas, Texas, USA and Mathematical Institute of the Serbian Academy of Sciences and Arts, Belgrade, Serbia</li>
          <li>Paul Embrechts, ETH Zurich, Department of Mathematics, Zurich, Switzerland</li>
          <li>Ivan Gutman, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Nebojša Ikodinović, University of Belgrade, Faculty of Mathematics, Belgrade, Serbia</li>
          <li>Mircea Ivan, Technical University of Cluj-Napoca, Department of Mathematics, Cluj-Napoca, Romania</li>
          <li>Sandi Klavžar, University of Ljubljana, Faculty of Mathematics and Physics, Ljubljana, Slovenia</li>
          <li>Giuseppe Mastroianni, University of Basilicata, Department of Mathematics, Informatics and Economics, Potenza, Italy</li>
          <li>Miodrag Mateljević, University of Belgrade, Faculty of Mathematics, Belgrade, Serbia</li>
          <li>Gradimir Milovanović, Serbian Academy of Sciences and Arts, Belgrade, Serbia</li>
          <li>Sotirios Notaris, National and Kapodistrian University of Athens, Department of Mathematics, Athens, Greece</li>
          <li>Miroslava Petrović-Torgašev, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Stevan Pilipović, University of Novi Sad, Faculty of Sciences, Novi Sad, Serbia</li>
          <li>Juan Rada, University of Antioquia, Institute of Mathematics, Medellin, Colombia</li>
          <li>Stojan Radenović, University of Belgrade, Faculty of Mechanical Engineering, Belgrade, Serbia</li>
          <li>Lothar Reichel, Kent State University, Department of Mathematical Sciences, Kent (OH), USA</li>
          <li>Miodrag Spalević, University of Belgrade, Faculty of Mechanical Engineering, Belgrade, Serbia</li>
          <li>Hari Mohan Srivastava, University of Victoria, Department of Mathematics and Statistics, Victoria, British Columbia, Canada</li>
          <li>Marija Stanić, University of Kragujevac, Faculty of Science, Kragujevac, Serbia</li>
          <li>Kostadin Trenčevski, Ss Cyril and Methodius University, Faculty of Natural Sciences and Mathematics, Skopje, Macedonia</li>
          <li>Boban Veličković, University of Paris 7, Department of Mathematics, Paris, France</li>
          <li>Leopold Verstraelen, Katholieke Universiteit Leuven, Department of Mathematics, Leuven, Belgium</li>
        </ul>

        <h2 style={sectionTitleStyle}>Technical Editor:</h2>
        <p style={paragraphStyle}>
          Tatjana Tomović Mladenović, University of Kragujevac, Faculty of Science, Kragujevac, Serbia
        </p>

        <h2 style={sectionTitleStyle}>Former Editors-in-Chief:</h2>
        <ul style={listStyle}>
          <li>Ivan Gutman, 2000</li>
          <li>Dragić Banković, 2001-2005</li>
          <li>Miodrag Spalević, 2006-2007</li>
          <li>Miroslava Petrović-Torgašev, 2008-2014</li>
          <li>Marija Stanić, 2015-2018</li>
        </ul>
      </div>
    </div>
  );
};

export default EditorialBoard;
