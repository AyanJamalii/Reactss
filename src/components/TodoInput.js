import React from 'react'

const TodoInput = ({favMovies, setFavMovies, addMovies}) => {
  return (
    <div>
      <h1>Your Favourite Movies:</h1>
      <input
        type="text"
        value={favMovies}
        onChange={(e) => setFavMovies(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={addMovies}>Add Movie</button>
    </div>
  )
}

export default TodoInput
