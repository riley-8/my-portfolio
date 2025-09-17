const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// Use the port Azure provides, or 3000 for local development
const port = process.env.PORT || 3000;

// In the Azure environment, the 'frontend' directory will be at the root level.
const frontendPath = path.join(__dirname, 'frontend');

// --- Middleware ---
// 1. CORS for allowing cross-origin requests
app.use(cors());

// 2. Serve static files (CSS, JS, images) from the 'frontend' directory
app.use(express.static(frontendPath));

// --- API Routes ---
// API endpoint to get project data
// projects.json will be at the root level with the server.js file
app.get('/projects', (req, res) => {
  const projectsPath = path.join(__dirname, 'projects.json');
  fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading projects.json:", err);
      // In a production environment, you might want to send a more generic error message
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
// For any other route, serve the main index.html file.
// This is crucial for single-page applications.
// This should be the LAST route defined.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'html', 'index.html'));
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Backend server is live and listening on port ${port}`);
  console.log(`Serving static files from: ${frontendPath}`);
});
