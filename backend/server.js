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
app.use(bodyParser.json());
app.use(express.static('uploads')); // Serve static files like uploaded images

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
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'Access Denied: No Token Provided!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized: Invalid Token!' });
    req.user = decoded;
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
          // Admin found
          const admin = adminResult[0];
          const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({
            message: 'Admin login successful',
            token,
            user: { username: admin.username, isAdmin: true },
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

// Submit Research Paper=======================================================================================
app.post('/submit-paper', upload.single('attachment'), (req, res) => {
  const { title, msccode, suggestedEditors, message } = req.body;
  const attachmentPath = req.file ? req.file.path : null;

  if (!title || !msccode) {
    return res.status(400).json({ error: 'Title and MSC Code are required!' });
  }

  const sql = `INSERT INTO ResearchPapers (title, attachmentPath, msccode, suggestedEditors, message) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [title, attachmentPath, msccode, suggestedEditors, message], (err, result) => {
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

// Add Authors==========================================================
app.post('/add-authors', (req, res) => {
  const { authors, paperId } = req.body;

  if (!authors || !paperId) {
    return res.status(400).json({ error: "Missing authors data or paperId" });
  }

  const values = authors.map(a => [
    paperId, a.title, a.firstName, a.middleName, a.lastName, a.gender, 
    a.correspondingAuthor, a.institution, a.email, a.orcid, a.address, a.country
  ]);

  const sql = `INSERT INTO Authors (researchPaperId, title, firstName, middleName, lastName, gender, correspondingAuthor, institution, email, orcid, address, country) VALUES ?`;

  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Authors added successfully', affectedRows: result.affectedRows });
  });
});

// Get all research papers=======================================================================
app.get('/get-papers', (req, res) => {
  const sql = `SELECT id, title, msccode, suggestedEditors, created_at as submission_time FROM ResearchPapers ORDER BY created_at DESC`;
  
  db.query(sql, (err, results) => {
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



// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// Database Connection======================================================================
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL');
// });

// Middleware for Token Verification=======================================================
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(403).json({ message: 'Access Denied: No Token Provided!' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Unauthorized: Invalid Token!' });
//     req.user = decoded;
//     next();
//   });
// };

// Registration API======================================================================
// app.post('/register', async (req, res) => {
//   const { title, firstName, lastName, username, email, password, country } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const sql = 'INSERT INTO users (title, firstName, lastName, username, email, password, country) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     db.query(sql, [title, firstName, lastName, username, email, hashedPassword, country], (err, result) => {
//       if (err) return res.status(500).json({ error: 'Registration failed', details: err.message });
//       res.status(201).json({ message: 'User registered successfully!' });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Login API=============================================================================
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const sql = 'SELECT * FROM users WHERE username = ?';
//   db.query(sql, [username], async (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.length > 0) {
//       const user = result[0];
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({
//           message: 'Login successful',
//           token,
//           user: { fullName: `${user.firstName} ${user.lastName}`, username: user.username },
//         });
//       } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//       }
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   });
// });

// Fetch Profile API====================================================================
// app.get('/profile', verifyToken, (req, res) => {
//   const sql = 'SELECT id, title, firstName, lastName, username, email, country FROM users WHERE id = ?';
//   db.query(sql, [req.user.id], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.length > 0) {
//       res.status(200).json(result[0]);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
// });

// Update Profile API====================================================================
// app.put('/edit-profile', verifyToken, (req, res) => {
//   const { title, firstName, lastName, username, email, country, password } = req.body;
//   const sql = 'SELECT * FROM users WHERE id = ?';
  
//   db.query(sql, [req.user.id], async (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });

//     if (result.length > 0) {
//       let updateSql = 'UPDATE users SET title = ?, firstName = ?, lastName = ?, username = ?, email = ?, country = ?';
//       let values = [title, firstName, lastName, username, email, country];

//       if (password) {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         updateSql += ', password = ?';
//         values.push(hashedPassword);
//       }

//       updateSql += ' WHERE id = ?';
//       values.push(req.user.id);

//       db.query(updateSql, values, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(200).json({ message: 'Profile updated successfully!' });
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
// });

// Start Server==========================================================================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], async (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (result.length > 0) {
//         const isMatch = await bcrypt.compare(password, result[0].password);
//         if (isMatch) {
//           res.status(200).json({ message: 'Login successful', user: result[0] });
//         } else {
//           res.status(401).json({ message: 'Invalid credentials' });
//         }
//       } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//       }
//     });
//   });


// Login API (Updated with JWT)
