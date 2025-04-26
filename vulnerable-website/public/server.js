// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simple routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('a/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Vulnerable website running on http://localhost:${PORT}`);
    console.log('This server is vulnerable to DDoS attacks like Slowloris');
});