import React from 'react'

const MovieMap = ({filterMovies, toggleLike, removeMovies, editId, editTitle, setEditId, setEditTitle, listEdit}) => {
  return (
    <div>
      {filterMovies.map((movie) => (
          <li key={movie.id}>
            {editId === movie.id ? (
                <>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <button onClick={() => listEdit()}>Save</button>
                <button onClick={() => setEditId(null)}>cancel</button>
                </>
            ) : (
                
            
            <>
            
            {movie.title}
            <button onClick={() => toggleLike(movie.id)}>
              {movie.liked ? "❤️" : "🤍"}
            </button>
            <button onClick={() => removeMovies(movie.id)}>X</button>
            <button onClick={() => {
                setEditId(movie.id)
                setEditTitle(movie.title)
            }}>Edit</button>
            </>
            )}
          </li>
        ))}
    </div>
  )
}

export default MovieMap
