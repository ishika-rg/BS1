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
import Email from './Components/forgetPassword/Email';
import VerifyOtp from './Components/forgetPassword/VerifyOtp';
import PasswordReset from './Components/forgetPassword/PasswordReset';



function App() {

  return (
    <div className = "App">

      <Header />
      <main>
        <Routes>
        {/* <Route path="/" exact element={<Navigate replace to="/signup" />} /> */}
        <Route exact path = '/' element = {<Home />} />

          <Route exact path = '/add_book' element = {<AddBook />} />
          <Route exact path = '/books' element = {<Books />} />
         
          <Route exact path = '/books/:id' element = {<BookDetail />} />

          <Route exact path = '/signup' element = {<Signup />} />
          <Route exact path = '/login' element = {<Login />} />
          <Route exact path = '/forget_password' element = {<Email />} />
          {/* <Route exact path = '/verifyotp' element = {<VerifyOtp />} /> */}
          <Route exact path = '/resetpassword' element = {<PasswordReset /> } />


          


        </Routes>
      </main>
    </div>
  );
}

export default App;
