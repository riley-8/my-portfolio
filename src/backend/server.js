const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// Use the port Azure provides, or 3000 for local development
const port = process.env.PORT || 3000;

const backendPath = __dirname;
const frontendPath = path.join(backendPath, 'frontend');
const frontendHtmlPath = path.join(frontendPath, 'html');

app.use(cors());

// --- Static Files Middleware ---
// Serve files from the /frontend/html directory as the main static root.
// This makes Express serve index.html by default for the root URL '/'.
app.use(express.static(frontendHtmlPath));

// Serve files from /frontend/css and /frontend/js with URL prefixes
app.use('/css', express.static(path.join(frontendPath, 'css')));
app.use('/js', express.static(path.join(frontendPath, 'js')));
app.use('/images', express.static(path.join(frontendPath, 'images')));


// --- API Routes ---
// API endpoint to get project data
app.get('/projects', (req, res) => {
  const projectsPath = path.join(backendPath, 'projects.json');
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

// --- Catch-all Route for SPA ---
// This will serve the index.html for any path that is not an API route or a known static file.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendHtmlPath, 'index.html'));
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Backend server is live and listening on port ${port}`);
});
