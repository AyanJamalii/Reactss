import './App.css';
// eslint-disable-next-line
import MoviesApp from './components/Movie Fetcher/MoviesApp';
// eslint-disable-next-line
import NotesApp from './components/Notes App/NotesApp';
// eslint-disable-next-line
import TodoList from './components/TodoList';
// eslint-disable-next-line
import QuotesApp from './components/Quotes Generator/QuotesApp';
import CartsApp from './components/Product Cart Fetcher/CartsApp';

function App() {

  return (
   <div>
    {/* <TodoList /> */}
    {/* <NotesApp /> */}
    {/* <MoviesApp/> */}
    {/* <QuotesApp /> */}
    <CartsApp />
   </div>
  );
}

export default App;
