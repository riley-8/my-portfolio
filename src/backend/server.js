const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Use CORS to allow requests from your frontend
app.use(cors());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint to get project data
app.get('/api/projects', (req, res) => {
  const projectsPath = path.join(__dirname, 'projects.json');
  fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading projects.json:", err);
      return res.status(500).json({ error: 'Failed to load project data' });
    }
    res.json(JSON.parse(data));
  });
});

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
