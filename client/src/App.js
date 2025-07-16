import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from './components/Editor';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  const saveNote = async (content) => {
    await axios.post('http://localhost:5000/api/notes', { content });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes with Live LaTeX</h1>
      <Editor onSave={saveNote} />
      <h2>All Notes:</h2>
      {notes.map(note => (
        <div key={note._id}>
          <strong>{new Date(note.createdAt).toLocaleString()}</strong>
          <br />
          {note.content}
        </div>
      ))}
    </div>
  );
}

export default App;
