const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
