require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware Setup============================================================
app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
// app.use(express.static('uploads')); 

// MySQL Database Connection===================================================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware for Token Verification===========================================
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(403).json({ message: 'Access Denied: No Token Provided!' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Unauthorized: Invalid Token!' });

//     req.user = decoded;
//     next();
//   });
// };

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized: No token provided" });

  const token = authHeader.split(" ")[1]; // 

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });

    req.user = decoded; // 
    next();
  });
};


// Registration API============================================================1111111111111111111111
app.post('/register', async (req, res) => {
  const { title, firstName, lastName, username, email, password, country } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const sql = 'INSERT INTO users (title, firstName, lastName, username, email, password, country) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, firstName, lastName, username, email, hashedPassword, country], (err, result) => {
      if (err) return res.status(500).json({ error: 'Registration failed', details: err.message });
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login API===================================================================22222222222222222222222222222

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';

  // Pehle users table check hoga
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length > 0) {
      // User found in users table
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
          message: 'Login successful',
          token,
          user: { fullName: `${user.firstName} ${user.lastName}`, username: user.username, isAdmin: false },
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      // Agar user table me nahi mila toh admin table check hoga=============================================
      
      const adminSql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
db.query(adminSql, [username, password], (err, adminResult) => {
  if (err) return res.status(500).json({ error: err.message });

  if (adminResult.length > 0) {
    const admin = adminResult[0];

    // JWT Token Generate karega jo sirf is admin ke liye hoga
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: { id: admin.id, username: admin.username, isAdmin: true },
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

    }
  });
});



// Fetch Profile API===========================================================333333333333333333333333
app.get('/profile', verifyToken, (req, res) => {
  // req.user.id is populated by the verifyToken middleware
  console.log(req.user.id); // Debug: log the user id

  const sql = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (result.length > 0) {
      const { firstName, lastName, email } = result[0];  // Destructure the result
      res.status(200).json({
        fullName: `${firstName} ${lastName}`,
        email: email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});



// Update Profile API==========================================================44444444444444444444444444444
app.put('/edit-profile', verifyToken, (req, res) => {
  const { title, firstName, lastName, username, email, country, password } = req.body;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [req.user.id], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      let updateSql = 'UPDATE users SET title = ?, firstName = ?, lastName = ?, username = ?, email = ?, country = ?';
      let values = [title, firstName, lastName, username, email, country];

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateSql += ', password = ?';
        values.push(hashedPassword);
      }

      updateSql += ' WHERE id = ?';
      values.push(req.user.id);

      db.query(updateSql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Profile updated successfully!' });
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// research papers submiyt hgereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create Tables if not exist====================================================
db.query(`
  CREATE TABLE IF NOT EXISTS ResearchPapers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    attachmentPath VARCHAR(255),
    msccode VARCHAR(100),
    suggestedEditors VARCHAR(255),
    message TEXT
  )
`);

db.query(`
  CREATE TABLE IF NOT EXISTS Authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    researchPaperId INT,
    title VARCHAR(50),
    firstName VARCHAR(100) NOT NULL,
    middleName VARCHAR(100),
    lastName VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    correspondingAuthor VARCHAR(100),
    institution VARCHAR(255),
    email VARCHAR(150) NOT NULL,
    orcid VARCHAR(100),
    address TEXT,
    country VARCHAR(100),
    FOREIGN KEY (researchPaperId) REFERENCES ResearchPapers(id) ON DELETE CASCADE
  )
`);

// API Endpoints
app.post('/submit-paper', verifyToken, upload.single('attachment'), (req, res) => {
  console.log("Decoded User:", req.user); 

  const { title, msccode, suggestedEditors, message } = req.body;
  const attachmentPath = req.file?.path;
  const userId = req.user.id; 

  if (!title || !msccode) {
    return res.status(400).json({ error: 'Title and MSC Code are required!' });
  }

  // ✅ Ensure Suggested Editors are Trimmed
  const parsedEditors = JSON.parse(suggestedEditors).map(name => name.trim());

  const sql = `INSERT INTO ResearchPapers (title, attachmentPath, msccode, suggestedEditors, message, userId) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, attachmentPath, msccode, JSON.stringify(parsedEditors), message, userId], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error! Please try again later.' });
    }
    res.status(201).json({ 
      message: 'Paper submitted successfully', 
      paperId: result.insertId 
    });
  });
});



// app.post('/submit-paper', verifyToken, upload.single('attachment'), (req, res) => {
//   console.log("Decoded User:", req.user); 

//   const { title, msccode, suggestedEditors, message } = req.body;
//   const attachmentPath = req.file?.path;
//   const userId = req.user.id; 

//   if (!title || !msccode) {
//     return res.status(400).json({ error: 'Title and MSC Code are required!' });
//   }

//   const sql = `INSERT INTO ResearchPapers (title, attachmentPath, msccode, suggestedEditors, message, userId) 
//                VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [title, attachmentPath, msccode, suggestedEditors, message, userId], (err, result) => {
//     if (err) {
//       console.error('Database Error:', err);
//       return res.status(500).json({ error: 'Database error! Please try again later.' });
//     }
//     res.status(201).json({ 
//       message: 'Paper submitted successfully', 
//       paperId: result.insertId 
//     });
//   });
// });

// get paper in admin==========================================================
app.get('/get-paperss', verifyToken, (req, res) => {
  console.log("Decoded User:", req.user);

  // ✅ Mapping: Username -> Full Name
  const editorMapping = {
    "DiveshSrivastava": "Dr. Divesh Srivastava",
    "WaseemAKhan": "Dr. Waseem A Khan",
    "AnubhavSony": "Dr. Anubhav Sony",
    "MohdShuaibSiddiqui": "Dr. Mohd Shuaib Siddiqui",
    "RameshSinghGautam": "Dr. Ramesh Singh Gautam",
    "BeenooSingh": "Mr. Beenoo Singh",
    "MohdGhayasuddin": "Dr. Mohd Ghayasuddin",
    "HibaHaroon": "Dr. Hiba Haroon",
    "KGChaubey": "Dr. KG Chaubey",
    "RahulRanjanTiwari": "Dr. Rahul Ranjan Tiwari",
    "ToukeerKhan": "Dr. Taueer Khan",
    "MohdRashid": "Dr. Mohd Rashid",
    "FarhadIlahiBakhsh": "Dr. Farhad Ilahi Bakshi",
    "TouheedKhan": "Mr. Touheed Khan"
};

  const editorFullName = editorMapping[req.user.username] || req.user.username;
  console.log("Mapped Editor Name for Query:", editorFullName);

  const sql = `SELECT * FROM ResearchPapers WHERE JSON_CONTAINS(suggestedEditors, JSON_QUOTE(?), '$')`;

  db.query(sql, [editorFullName], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error! Please try again later.' });
    }

    console.log("Fetched Papers from DB:", results);
    res.status(200).json(results);
  });
});



// add auhtor paper ==============================================================================================
app.post('/add-authors', verifyToken, (req, res) => {
  const { authors, paperId } = req.body;
  const userId = req.user.id;

  // First, check if the paper belongs to the user========================================
  db.query(
    'SELECT userId FROM ResearchPapers WHERE id = ?', 
    [paperId], 
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0 || results[0].userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to modify this paper' });
      }

      // Proceed to add authors if authorized
      const values = authors.map(a => [
        paperId, a.title, a.firstName, a.middleName, a.lastName, a.gender, 
        a.correspondingAuthor, a.institution, a.email, a.orcid, a.address, a.country
      ]);

      const sql = `INSERT INTO Authors (researchPaperId, title, firstName, middleName, lastName, gender, correspondingAuthor, institution, email, orcid, address, country) 
                   VALUES ?`;

      db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Authors added successfully', affectedRows: result.affectedRows });
      });
  });
});
// app.post('/add-authors', (req, res) => {
//   const { authors, paperId } = req.body;

//   if (!authors || !paperId) {
//     return res.status(400).json({ error: "Missing authors data or paperId" });
//   }

//   const values = authors.map(a => [
//     paperId, a.title, a.firstName, a.middleName, a.lastName, a.gender, 
//     a.correspondingAuthor, a.institution, a.email, a.orcid, a.address, a.country
//   ]);

//   const sql = `INSERT INTO Authors (researchPaperId, title, firstName, middleName, lastName, gender, correspondingAuthor, institution, email, orcid, address, country) VALUES ?`;

//   db.query(sql, [values], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ message: 'Authors added successfully', affectedRows: result.affectedRows });
//   });
// });

// Get all research papers=======================================================================
// app.get('/get-papers', (req, res) => {
//   const sql = `SELECT id, title, msccode, suggestedEditors, created_at as submission_time FROM ResearchPapers ORDER BY created_at DESC`;
  
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ error: 'Database error!' });
//     }
//     res.json(results);
//   });
// });

app.get('/get-papers', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT id, title, msccode, suggestedEditors, created_at as submission_time 
    FROM ResearchPapers 
    WHERE userId = ? 
    ORDER BY created_at DESC
  `;
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error!' });
    }
    res.json(results);
  });
});

// app.get('/get-papers', (req, res) => {
//   const userId = req.user.id; // Token se user ka ID le rahe hain

//   const sql = `SELECT id, title, msccode, suggestedEditors, created_at as submission_time 
//                FROM ResearchPapers WHERE user_id = ? ORDER BY created_at DESC`;

//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ error: 'Database error!' });
//     }
//     res.json(results); 
//   });
// });


// get athors===========================================================================

app.get('/get-authors/:paperId', (req, res) => {
  const { paperId } = req.params;
  const sql = 'SELECT * FROM Authors WHERE researchPaperId = ?';
  
  db.query(sql, [paperId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// get title ====================================================================================
app.get('/get-paper/:paperId', (req, res) => {
  const { paperId } = req.params;
  const sql = 'SELECT title FROM ResearchPapers WHERE id = ?';
  
  db.query(sql, [paperId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Paper not found' });
    res.json(results[0]);
  });
});


// attehcment here=======================================================================
app.get('/download-attachment/:paperId', (req, res) => {
  const { paperId } = req.params;
  const sql = `SELECT attachmentPath FROM ResearchPapers WHERE id = ?`;

  db.query(sql, [paperId], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error! Please try again later.' });
    }

    if (result.length === 0 || !result[0].attachmentPath) {
      return res.status(404).json({ error: 'Attachment not found!' });
    }

    const filePath = result[0].attachmentPath;

    // MIME Type set karna (PDF ke liye "application/pdf")
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filePath.split('/uploads').pop()}"`);
    
    res.download(filePath, (err) => {
      if (err) {
        console.error("File Download Error:", err);
        res.status(500).json({ error: "File download failed!" });
      }
    });
  });
});



// app.get('/get-paper-details/:paperId', (req, res) => {
//   const { paperId } = req.params;

//   const sql = `SELECT suggestedEditors, submissionTime FROM ResearchPapers WHERE id = ?`;
//   db.query(sql, [paperId], (err, paperResult) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     if (!paperResult || paperResult.length === 0) {
//       return res.status(404).json({ error: "Paper not found" });
//     }

//     const attachmentSql = `SELECT name, url FROM Attachments WHERE paperId = ?`;
//     db.query(attachmentSql, [paperId], (err, attachmentResult) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }

//       res.status(200).json({
//         suggestedEditors: paperResult[0]?.suggestedEditors || "N/A", 
//         submissionTime: paperResult[0]?.submissionTime || "N/A", 
//         attachments: attachmentResult || []
//       });
//     });
//   });
// });



// Start Server==================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

