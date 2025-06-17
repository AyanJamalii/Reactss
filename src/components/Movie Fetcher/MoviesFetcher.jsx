// https://www.omdbapi.com/?apikey=e99d6d86&s=${query}

import React, { useEffect, useState } from 'react'

const MoviesFetcher = ({theme, toggleTheme}) => {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([]);
    const [error, SetError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedMovies, setSelectedMovies] = useState('')
    
    const categoryMap = {
        Trending: 'trending',
        Horror: 'horror',
        Comedy: 'comedy',
        Action: 'Action',
        "Sci-Fi": 'sci-fi'
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim() !== '') {
                fetchMore(query, 3)
            }else{
                setMovies([])
                SetError(null)
            }
        }, 500);
        return () => clearTimeout(delay);
        // eslint-disable-next-line
    }, [query]);


    useEffect(() => {
        if (selectedMovies) {
            fetchCategory(categoryMap[selectedMovies])
        }
        // eslint-disable-next-line
    }, [selectedMovies]);



    const fetchCategory = async (category, Pages = 3) => {
        try {
            setLoading(true)
            let allResults = []

            for (let i = 1; i <= Pages; i++) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=e99d6d86&s=${category}&page=${i}`)   
            const data = await res.json()             

            if (data.Response === "True") {
                allResults = [...allResults, ...data.Search]
            }
             }
             setMovies(allResults)
             SetError(null)
        } catch (err) {
            SetError('Something went wrong, Please Try again later.')
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    const fetchMore = async (moreResults, Pages = 3) => {
        setLoading(true)
        let allResults = [];
        for (let i = 1; i <= Pages; i++) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=e99d6d86&s=${moreResults}&page=${i}`);
            const data = await res.json()

            if (data.Response === 'True') {
                allResults = [...allResults, ...data.Search]
            }
            setMovies(allResults)
            SetError(null);
            setLoading(false);
        }
    }

  return (
    <div className='fetcher'>
      <div className="input-box">
        <input type="text" placeholder='Search Movie....' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={toggleTheme} className='theme-btn'>{theme === 'light' ? '☀️' : '🌙'}</button>
      </div>
      <div className="category-btns">
        <button className='cat-btn' onClick={() => setSelectedMovies('Trending')}>Trending</button>
        <button className='cat-btn' onClick={() => setSelectedMovies('Horror')}>Horror</button>
        <button className='cat-btn' onClick={() => setSelectedMovies('Comedy')}>Comedy</button>
        <button className='cat-btn' onClick={() => setSelectedMovies('Action')}>Action</button>
        <button className='cat-btn' onClick={() => setSelectedMovies('Sci-Fi')}>Sci-Fi</button>
      </div>
        {loading && <div className='loader'></div>}
        {error && <p className='error-msg'>{error}</p>}
    <div className="movies-grid">
        {movies.map((movie) => (
            <a key={movie.imdbID} className="movie-card" href={`https://www.imdb.com/title/${movie.imdbID}`}  target="_blank" rel="noopener noreferrer">
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </a>
        ))}
    </div>

    </div>
  )
}

export default MoviesFetcher
