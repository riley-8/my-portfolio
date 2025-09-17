const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Get the correct path to the frontend directory
const frontendPath = path.join(__dirname, '../frontend');

// --- Middleware ---
// 1. CORS for allowing cross-origin requests
app.use(cors());

// 2. Serve static files (CSS, JS, images) from the 'frontend' directory
app.use(express.static(frontendPath));

// --- API Routes ---
// API endpoint to get project data
app.get('/projects', (req, res) => {
  const projectsPath = path.join(__dirname, 'projects.json');
  fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading projects.json:", err);
      return res.status(500).json({ error: 'Failed to load project data' });
    }
    try {
      const projects = JSON.parse(data);
      res.json(projects);
    } catch (parseErr) {
      console.error("Error parsing projects.json:", parseErr);
      res.status(500).json({ error: 'Failed to parse project data' });
    }
  });
});

// --- Catch-all Route ---
// For any other route, serve the main index.html file
// This should be the LAST route defined
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'html', 'index.html'));
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Backend server is live and listening at http://localhost:${port}`);
  console.log(`Serving static files from: ${frontendPath}`);
});
