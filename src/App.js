import './App.css';
import Header from './Components/Header'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Components/Home';
import AddBook from './Components/AddBook';
import Books from './Components/Book/Books';
import About from './Components/About';
import BookDetail from './Components/Book/BookDetail'
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {

  return (
    <div className = "App">

      <Header />
      <main>
        <Routes>
        <Route path="/" exact element={<Navigate replace to="/signup" />} />

          <Route exact path = '/add_book' element = {<AddBook />} />
          <Route exact path = '/books' element = {<Books />} />
         
          <Route exact path = '/books/:id' element = {<BookDetail />} />

          <Route exact path = '/signup' element = {<Signup />} />
          <Route exact path = '/login' element = {<Login />} />
          


        </Routes>
      </main>
    </div>
  );
}

export default App;
