import React, { useState } from 'react';
import axios from 'axios';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Editor = () => {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSave = async () => {
    if (!note.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/notes', { content: note });
      setSavedNotes([...savedNotes, note]);
      setNote('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const renderLatex = (latexString) => {
    try {
      return {
        __html: katex.renderToString(latexString, {
          throwOnError: false,
        }),
      };
    } catch (err) {
      return { __html: 'Invalid LaTeX' };
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>LaTeX Notes Editor</h2>
      <textarea
        rows="4"
        cols="60"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter LaTeX here (e.g., \\frac{a}{b})"
      />
      <br />
      <button onClick={handleSave}>Save</button>

      <h3>Preview:</h3>
      <div
        style={{ border: '1px solid #ccc', padding: '10px', minHeight: '40px' }}
        dangerouslySetInnerHTML={renderLatex(note)}
      />

      <h3>Saved Notes:</h3>
      {savedNotes.map((n, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <div dangerouslySetInnerHTML={renderLatex(n)} />
        </div>
      ))}
    </div>
  );
};

export default Editor;
