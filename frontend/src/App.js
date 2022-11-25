import React from "react";
import './App.css';
import AuthorList from "./components/Author";
import BookList from "./components/Books";
import NotFound404 from "./components/NotFound404";
import BooksAuthor from "./components/BooksAuthor";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'authors': [],
      'books': [],
    }
  }

  componentDidMount() {
    // this.load_data()

    axios.get('http://127.0.0.1:8001/api/authors/').then(response => {

      this.setState(
        {
          'authors': response.data
        }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8001/api/books/').then(response => {

      this.setState(
        {
          'books': response.data
        }
      )
    }).catch(error => console.log(error))
  }


  render () {
    return (
      <div className={'App'}>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Authors</Link>
              </li>
              <li>
                <Link to={'/books'}>Books</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path={'/'} element={<Navigate to={'/authors'}/>}/>
            <Route path={'/authors'} >
              <Route index element={<AuthorList authors={this.state.authors}/>}/>
              <Route path={':authorId'} element={<BooksAuthor books={this.state.books}/>}/>
            </Route>
            <Route exact path={'/books'} element={<BookList books={this.state.books}/>}/>

            <Route path={'*'} element={<NotFound404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
