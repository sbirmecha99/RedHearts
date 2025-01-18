const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TeamRedHearts.', // Replace with your MySQL password
  database: 'red_hearts',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// API to fetch states
app.get('/api/states', (req, res) => {
  db.query('SELECT * FROM states', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching states' });
    res.json(results);
  });
});

// API to fetch cities for a given state
app.get('/api/cities/:stateId', (req, res) => {
  const { stateId } = req.params;
  db.query('SELECT * FROM cities WHERE state_id = ?', [stateId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching cities' });
    res.json(results);
  });
});

// API to save donor data
app.post('/api/donors', (req, res) => {
  const { name, dob, gender, state, city, phone, email, blood_type, medical_history, organ_to_donate, smoke, alcohol } = req.body;

  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
  }

  const query = `
    INSERT INTO donors (name, dob, gender, state, city, phone, email, blood_type, medical_history, organ_to_donate, smoke, alcohol)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, dob, gender, state, city, phone, email, blood_type, medical_history, organ_to_donate, smoke, alcohol], (err) => {
    if (err) return res.status(500).json({ error: 'Error saving donor data' });
    res.status(200).json({ message: 'Donor registered successfully!' });
  });
});

// API to save recipient data
app.post('/api/recipients', (req, res) => {
  const { name, dob, gender, state, city, phone, email, blood_type, organ_required, medical_history } = req.body;

  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
  }

  const query = `
    INSERT INTO recipients (name, dob, gender, state, city, phone, email, blood_type, organ_required, medical_history)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, dob, gender, state, city, phone, email, blood_type, organ_required, medical_history], (err) => {
    if (err) return res.status(500).json({ error: 'Error saving recipient data' });
    res.status(200).json({ message: 'Recipient registered successfully!' });
  });
});



// API to check status (matching donors)
app.post('/api/check-status', (req, res) => {
  const { name, dob } = req.body;

  // Find recipient details
  db.query('SELECT * FROM recipients WHERE name = ? AND dob = ?', [name, dob], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'Recipient not found' });

      const recipient = results[0];

      // Find matching donors based on blood type, city, and state
      const query = `
          SELECT * FROM donors
          WHERE blood_type = ? AND (state = ? OR city = ?)
          ORDER BY city DESC, state DESC;
      `;
      db.query(query, [recipient.blood_type, recipient.state, recipient.city], (err, donors) => {
          if (err) return res.status(500).json({ error: 'Error fetching donor data' });

          if (donors.length === 0) {
              return res.status(200).json({ message: 'No matching donors found' });
          }

          res.status(200).json({ match: donors });
      });
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});