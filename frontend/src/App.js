import React from "react";
import logo from './logo.svg';
import './App.css';
import AuthorList from "./components/Author";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'authors': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8001/api/authors/').then(response => {

      this.setState(
        {
          'authors': response.data
        }
      )
    }).catch(error => console.log(error))

    // const authors = [
    //   {
    //     'first_name': 'Фёдор',
    //     'last_name': 'Достоевский',
    //     'birthday_year': 1821
    //   },
    //   {
    //     'first_name': 'Александр',
    //     'last_name': 'Грин',
    //     'birthday_year': 1880
    //   },
    // ]
  }


  render () {
    return (
      <div>
        <AuthorList authors={this.state.authors}/>
      </div>
    )
  }
}

export default App;
