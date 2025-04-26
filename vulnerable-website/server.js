const express = require('express');
const path = require('path');

// Initialize vulnerable app
const app = express();

// No security middleware intentionally
app.use(express.static(path.join(__dirname, 'public')));

// Vulnerable routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Simulate vulnerable endpoints
app.get('/api/users', (req, res) => {
  // No rate limiting or input sanitization
  res.json([{id: 1, username: 'admin'}, {id: 2, username: 'test'}]);
});

// Start vulnerable server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`💀 Vulnerable site running on port ${PORT}`);
  console.log('⚠️ Intentionally vulnerable to DDoS attacks');
});