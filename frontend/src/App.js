import React from "react";
import './App.css';
import AuthorList from "./components/Author";
import BookList from "./components/Books";
import BooksAuthor from "./components/BooksAuthor";
import LoginForm from "./components/Auth";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from "react-router-dom";
import Cookies from "universal-cookie";


const NotFound404 = () => {
    let {pathname} = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': [],
            'books': [],
            'token': '',
        }
    }

    logout() {
        this.set_token('')
        this.setState({'authors':[]})
        this.setState({'books':[]})
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8001/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8001/api/authors/', {headers}).then(response => {

            this.setState(
                {
                    'authors': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8001/api/books/', {headers}).then(response => {

            this.setState(
                {
                    'books': response.data
                }
            )
        }).catch(error => console.log(error))

    }

    componentDidMount() {
        this.get_token_storage()
    }


    render() {
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
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to={'/login'}>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path={'/'} element={<Navigate to={'/authors'}/>}/>
                        <Route exact path={'/login'} element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route exact path={'/books'} element={<BookList books={this.state.books}/>}/>
                        <Route path={'/authors'}>
                            <Route index element={<AuthorList authors={this.state.authors}/>}/>
                            <Route path={':authorId'} element={<BooksAuthor books={this.state.books}/>}/>
                        </Route>

                        <Route path={'*'} element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
