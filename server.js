const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, 'public');

app.use(cors());
app.use(express.static(publicPath));

// Explicitly serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

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

app.listen(port, () => {
  console.log(`✅ Backend server is live and listening on port ${port}`);
});
