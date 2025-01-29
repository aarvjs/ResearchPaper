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
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
          message: 'Login successful',
          token,
          user: { fullName: `${user.firstName} ${user.lastName}`, username: user.username },
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
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

// Configure Multer for File Upload============================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// API: Submit Research Paper===================================================55555555555555555555555555
app.post('/submit-paper', upload.single('attachment'), (req, res) => {
  const { title, msccode, author, additionAuthors, suggestedEditors, message } = req.body;
  const attachment = req.file ? req.file.path : null; // File path of uploaded file

  const query = 'INSERT INTO research_papers (title, msccode, attachment, author, additionAuthors, suggestedEditors, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [title, msccode, attachment, author, additionAuthors, suggestedEditors, message], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.status(201).json({ message: 'Paper submitted successfully', paperId: result.insertId });
  });
});

// API: Get Submitted Papers====================================================66666666666666666666666666
app.get('/get-papers', (req, res) => {
  const query = 'SELECT id, title, author, created_at FROM research_papers';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.status(200).json(results);
  });
});

// API: Get Authors by Paper ID
app.get('/get-authors/:paperId', (req, res) => {
  const { paperId } = req.params; // Get the paper ID from the URL parameter
  
  const query = 'SELECT * FROM authors WHERE research_paper_id = ?';
  db.query(query, [paperId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.status(200).json(results); // Return the list of authors for the paper
  });
});


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
