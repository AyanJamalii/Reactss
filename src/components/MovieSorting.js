import React from 'react'

const MovieSorting = ({setSorting, sorting}) => {
  return (
    
      <div style={{ marginTop: "10px" }}>
        <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
          <option value="all">All</option>
          <option value="liked">Liked</option>
          <option value="unliked">Unliked</option>
        </select>
      </div>
    
  )
}

export default MovieSorting
