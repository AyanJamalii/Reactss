import React, { useState } from 'react'
import MoviesFetcher from './MoviesFetcher.jsx'
import './movies.css'
const MoviesApp = ({thme}) => {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
        if (theme === "light") {
            document.body.style.background = 'black'

            setTheme('dark')
        } else if (theme === "dark") {
            document.body.style.background = 'linear-gradient(to right, #0dd8df, #243450)';
            setTheme('light')
        }
    }
  return (
    <div className='moviesApp'>
      <h1 style={{textAlign: 'center', marginTop: '20px', color: theme === 'dark' ? 'white' : 'black'}}>Movies Explorer 🎬</h1>
      <MoviesFetcher theme={theme} toggleTheme={toggleTheme}/>
    </div>
  )
}

export default MoviesApp
