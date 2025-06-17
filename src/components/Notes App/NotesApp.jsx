import React, { useEffect, useState } from 'react'
import NotesInput from './NotesInput'
import NotesList from './NotesList'
import './NotesApp.css';

const NotesApp = () => {

  const [allNotes, setAllNotes] = useState([])
  const [notesTitle, setNotesTitle] = useState("")
  const [notesContent, setNotesContent] = useState("")
  const [isEditing, setIsEditing] = useState(null)


  useEffect(() =>{
    const saved = localStorage.getItem("savedNotes")
    if(saved && saved !== "undefined"){
      try {
        setAllNotes(JSON.parse(saved))
      } catch (error) {
        console.error("error occured, failed to parse saved notes")
        setAllNotes([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(allNotes))
  }, [allNotes])
  function addNotes() {
    if (notesTitle.trim() === "" || notesContent.trim() === "") {
      alert("can't add empty Notes")
      return;
    }

    const newNote = {
      id: Date.now(), 
      title: notesTitle, 
      content: notesContent,
      liked: false
    }

    setAllNotes([...allNotes, newNote])
    setAllNotes("")
    setNotesContent("")
  }


  function deleteNote(index) {
    const updatedNotes = allNotes.filter((_, i) => i !== index);
    setAllNotes(updatedNotes)
  }

function handleLikeNotes(index) {
  const updatedNotes = allNotes.map((note, i) => {
    if (i === index){
      return{...note, liked: !note.liked}
    }
    return note;
  });

  setAllNotes(updatedNotes)
}

function startEditing(note){
  setIsEditing(note.id)
  setNotesContent(note.content)
  setNotesTitle(note.title)
}

function saveEditedNote() {
  const updatedNotes = allNotes.map((note, i) => {
    if (note.id === isEditing) {
      return{...note, title: notesTitle, content: notesContent}
    }
    return note;
  })
  setAllNotes(updatedNotes)
  setNotesTitle("")
  setNotesContent("")
  setIsEditing(null)
}

function cancelEdit() {
  setNotesContent("")
  setNotesTitle("")
  setIsEditing(null)
}
  return (
    <div className='notes-app'>
      <h1 className='main-heading'>Personal Notes</h1>
      <NotesInput 
      notesTitle={notesTitle}
      setNotesTitle={setNotesTitle}
      notesContent={notesContent}
      setNotesContent={setNotesContent}
      addNotes={addNotes}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      saveEditedNote={saveEditedNote}
      cancelEdit={cancelEdit}
      />
      <ul>
        <h2>Your Notes:</h2>
        <NotesList 
        allNotes={allNotes}
        deleteNote={deleteNote}
        handleLikedNotes={handleLikeNotes}
        startEditing={startEditing}
        />

        
      </ul>
    </div>
  )
}

export default NotesApp
