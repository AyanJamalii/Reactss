import React from 'react';

const NotesInput = ({
  notesTitle,
  setNotesTitle,
  notesContent,
  setNotesContent,
  addNotes,
  isEditing,
  saveEditedNote,
  cancelEdit
}) => {
  return (
    <div className="notes-input">
      <input
        type="text"
        placeholder="Notes Title"
        value={notesTitle}
        onChange={(e) => setNotesTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Notes Content"
        value={notesContent}
        onChange={(e) => setNotesContent(e.target.value)}
      />
      <br />
      {isEditing ? (
        <>
          <button onClick={saveEditedNote}>💾 Save</button>
          <button onClick={cancelEdit}>❌ Cancel</button>
        </>
      ) : (
        <button onClick={addNotes}>Add Notes</button>
      )}
    </div>
  );
};

export default NotesInput;