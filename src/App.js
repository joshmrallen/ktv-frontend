import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import Search from './components/Search'

const API_URL = 'http://localhost:3000'

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: ''
  }

  appSearchHandler = (event) => {
    //setState here to change searchQuery to value received from Search
    event.persist()
    this.setState(()=>({
      searchQuery: event.target.value
    }))
    console.log("This is our change handler. Here's the query:", event.target.value)
  }

  appSubmitHandler = (event) => {
    event.persist()
    event.preventDefault()
    // debugger
    console.log("Search Submit in app now!")
    const query = {
      query: this.state.searchQuery,
      results: ''
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(query)
    }
    fetch(`${API_URL}/searches`, options)
      .then(response => response.json())
      .then(console.log)

      this.setState(()=>({
        searchQuery: ''
      }))
  }

  resultsGetter = () => {

  }
  
  render(){
    return (
      <div>
        <h1>OMG KTV Let's Sing!</h1>
        <Search searchHandler={this.appSearchHandler} searchQuery={this.state.searchQuery} appSubmitHandler={this.appSubmitHandler} />
        <ResultsContainer />

      </div> 
    )
  }
}

export default App;
