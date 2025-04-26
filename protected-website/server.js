require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

// Initialize app
const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ddos-protection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Rate limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Behavior analysis middleware
app.use((req, res, next) => {
  req.behaviorScore = calculateBehaviorScore(req);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  if (req.behaviorScore < 70) {
    return res.status(403).sendFile(path.join(__dirname, 'public', 'suspicious.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🛡️ Protected site running on port ${PORT}`);
});

// Helper function for behavior analysis
function calculateBehaviorScore(req) {
  // Implement your behavior analysis logic here
  // Example: Check request timing, headers, etc.
  return Math.floor(Math.random() * 40) + 60; // Demo: Returns 60-100
}