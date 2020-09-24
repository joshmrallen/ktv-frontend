import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import Search from './components/Search'

const API_URL = ''

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: []
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
    event.preventDefault()
    const query = this.state.searchQuery
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(query)
    }
    fetch(API_URL, options)
      .then(response => response.json())
      .then(console.log)
  }

  resultsGetter = () => {

  }
  
  render(){
    return (
      <div>
        <h1>OMG KTV Let's Sing!</h1>
        <Search searchHandler={this.appSearchHandler} searchQuery={this.state.searchQuery} />
        <ResultsContainer />

      </div> 
    )
  }
}

export default App;
