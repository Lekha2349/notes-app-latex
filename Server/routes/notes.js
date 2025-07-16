const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const note = new Note({ content: req.body.content });
  await note.save();
  res.json(note);
});

router.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true });
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
