import React, { useEffect, useState } from 'react'
import './quotes.css'

const QuotesFetcher = () => {

    const [quotes, setQuotes] = useState('')
    const [author, setAuthor] = useState('')
    const [error, setError] = useState(null)
    const [theme, setTheme] = useState('light')


    useEffect(() => {
       quotesFetcher();
    }, []);

    function toggleTheme() {
        if (theme === 'light') {
        document.body.style.background = 'black'
        document.body.style.color = 'white' 
        setTheme('dark')
        }else if(theme === 'dark'){
            document.body.style.background = 'white'
            document.body.style.color = 'black'
            setTheme('light')
        }
    }

    const quotesFetcher = async () => {
        try {
            const res = await fetch('https://random-quotes-freeapi.vercel.app/api/random')
            const data = await res.json()
            if (data.quote && data.author) {
                setQuotes(data.quote)
                setAuthor(data.author)
                setError(null)
            }else{
                setError('Quote not found.')
            }
        } catch (error) {
            setError('Something went wrong, Please try again later.')
        }
    }
  return (
    <div style={{ textAlign: 'center', marginTop: 50,}}>
      <h1>Random Quote Generator</h1><button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{
        maxWidth: 600, margin: '20px auto', padding: 20,
        border: '1px solid #ccc', borderRadius: 10, backgroundColor: 'rgb(115 197 255 / 54%)'
      }}>
        <p style={{ fontSize: '1.3rem', fontStyle: 'italic' }}>
          “{quotes || 'Loading...'}”
        </p>
        <p style={{ marginTop: 10, fontWeight: 'bold' }}>
          — {author || 'Unknown'}
        </p>
      </div>

      <button onClick={quotesFetcher} style={{ padding: '10px 20px', fontSize: '1rem' }}>
        Show Another Quote
      </button>
      
    </div>
  )
}

export default QuotesFetcher
