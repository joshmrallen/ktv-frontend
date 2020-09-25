import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import Search from './components/Search'
import NavBar from './components/NavBar';
import {Route} from 'react-router-dom'

const API_URL = 'http://localhost:3000'

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: [],
    nextToken: false,
    prevToken: false
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
        this.setState(()=>({
          searchResults: JSON.parse(res.search.results), 
          nextToken: res.next_token}))
      })

      // this.setState(()=>({
      //   searchQuery: ''
      // }))
  }

  resultsGetter = () => {

  }

  next = ()=>{
    console.log("this is my next")
    const query = {
      query: this.state.searchQuery,
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
        this.setState(()=>({
          searchResults: JSON.parse(res.search.results),
          nextToken: res.next_token,
          prevToken: res.prev_token
        }))
      })
  }

  prev = () => {
    console.log("Previous results please.")
    const query = {
      query: this.state.searchQuery,
      results: this.state.prevToken
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
      .then(res => {
        console.log(res)
        this.setState(()=>({
          searchResults: JSON.parse(res.search.results),
          nextToken: res.next_token,
          prevToken: res.prev_token
        }))
      })
  }
  
  render(){
    // console.log(this.state)
    return (
      <div>
        <Route path='/' component={NavBar}  />
        <h1>OMG KTV Let's Sing!</h1>
        <Search 
          searchHandler={this.appSearchHandler} 
          searchQuery={this.state.searchQuery} 
          appSubmitHandler={this.appSubmitHandler} 
        />

        <ResultsContainer 
          searchResults={this.state.searchResults} 
          next={this.next} 
          prev={this.prev}
          prevToken={this.state.prevToken} 
          nextToken={this.state.nextToken} 
        />

      </div> 
    )
  }
}

export default App;



/*
NavBar will be a Route thing that is on every page

Change Search component to SearchContainer
      Children:
          Search component
          ResultsContainer

      Design/format: same as FavoritesContainer

FavoritesContainer
      Children:
          Favorite component

      Design/format: same as SearchContainer
*/

/* When is Favoriting possible?
1. 
*/