import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput';
import MovieSorting from './MovieSorting';
import MovieMap from './MovieMap';

const TodoList = () => {

  const [favMovies, setFavMovies] = useState("");
    const [favMoviesList, setFavMoviesList] = useState([]);
    const [sorting, setSorting] = useState("all");
    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle ] = useState("")
  
    useEffect(() => {
      const saved = localStorage.getItem("savedMovies");
      if (saved) setFavMoviesList(JSON.parse(saved));
    }, []);
  
    useEffect(() => {
      console.log("savings: ", favMoviesList)
      localStorage.setItem("savedMovies", JSON.stringify(favMoviesList));
    }, [favMoviesList]);
  
    function addMovies() {
      if (favMovies.trim() === "") {
        alert("Input field is empty");
        return;
      }
      setFavMoviesList([
        ...favMoviesList,
        { id: Date.now(), title: favMovies, liked: false }
      ]);
      setFavMovies("");
    }
  
    function removeMovies(id) {
      const updated = favMoviesList.filter(movie => movie.id !== id);
      setFavMoviesList(updated);
    }
  
    function toggleLike(id) {
      const updated = favMoviesList.map(movie =>
        movie.id === id ? { ...movie, liked: !movie.liked } : movie
      );
      setFavMoviesList(updated);
    }

    function listEdit(id) {
      const updated = favMoviesList.map(movie => movie.id === editId ? {...movie, title: editTitle} : movie)
      setFavMoviesList(updated)
      setEditId(null)
      setEditTitle("")
    }
  
    const filterMovies = favMoviesList.filter((movie) => {
      if (sorting === "liked") return movie.liked;
      if (sorting === "unliked") return !movie.liked;
      return true;
    });


  return (
     <div style={{ padding: "20px" }}>
      <TodoInput favMovies={favMovies} setFavMovies={setFavMovies} addMovies={addMovies}/>

      <MovieSorting setSorting={setSorting} sorting={sorting}/>

      <ul>
        <MovieMap
         filterMovies={filterMovies} 
         toggleLike={toggleLike}
         removeMovies={removeMovies}
         editId={editId} 
         setEditId={setEditId}
         editTitle={editTitle}
         setEditTitle={setEditTitle}
         listEdit={listEdit}
          />
      </ul>
    </div>
  )
}

export default TodoList;
