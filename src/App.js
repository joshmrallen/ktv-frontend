import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import Search from './components/Search'

const API_URL = 'http://localhost:3000'

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: [],
    nextToken:"",
    prevToken:""
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
      .then(res=>{
        console.log(res)
        this.setState(()=>({searchResults:res.search.results,nextToken:res.token}))
      })

      this.setState(()=>({
        searchQuery: ''
      }))
  }

  resultsGetter = () => {

  }

  next = ()=>{
    console.log("this is my next")
    const query = {
      query: "",
      results: this.state.nextToken
    }
    console.log(query)
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
      .then(res=>{
        console.log(res)
        this.setState(()=>({searchResults:res.search.results,nextToken:res.token,prevToken:res.prev}))
      })
  }
  
  render(){
    console.log(this.state)
    return (
      <div>
        <h1>OMG KTV Let's Sing!</h1>
        <Search searchHandler={this.appSearchHandler} searchQuery={this.state.searchQuery} appSubmitHandler={this.appSubmitHandler} />
        <ResultsContainer searchResults={this.state.searchResults} next={this.next}/>

      </div> 
    )
  }
}

export default App;
