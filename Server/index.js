const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load .env file

// 🔍 Debug: Print MONGO_URI to verify it's loaded
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

app.use('/api/notes', require('./routes/notes'));

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
