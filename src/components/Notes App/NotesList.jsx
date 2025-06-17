import React from 'react';

const NotesList = ({ allNotes, deleteNote, handleLikedNotes, startEditing }) => {
  return (
    <div className="notes-list">
      {allNotes.map((note, index) => (
        <div key={note.id} className="note-card">
          <strong>{note.title}</strong>
          <p>{note.content}</p>

          <button onClick={() => handleLikedNotes(index)}>
            {note.liked ? '❤️ Liked' : '🤍 Like'}
          </button>

          <button onClick={() => startEditing(note)}>✏️ Edit</button>

          <button onClick={() => deleteNote(index)}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
