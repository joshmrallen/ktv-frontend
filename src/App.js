import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import NavBar from './components/NavBar';
import {Route, Switch, withRouter, NavLink} from 'react-router-dom'
import Room from './containers/Room'
import FavoritesContainer from './containers/FavoritesContainer'
import Home from './components/Home'

const API_URL = 'http://localhost:3000'
const K = {
  name: 'Kanye%20West',
  song: 'Jesus%20Walks'
}
const C = {
  name: 'Coldplay',
  song: 'Yellow'
}


class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: ["x3bDhtuC5yk","caITRQWpBHs"],
    favorites:["x3bDhtuC5yk","caITRQWpBHs"],
    nextToken: false,
    prevToken: false,
    roomId: false,
    addFav: "",
    lyrics: ""
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
          searchResults: res.search.results, 
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
          searchResults: res.search.results,
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
          searchResults: res.search.results,
          nextToken: res.next_token,
          prevToken: res.prev_token
        }))
      })
  }

  appRoomMaker = (videoId) => {
    console.log('This is our room maker. RoomId is currently: ', this.state.roomId)
    this.getLyrics()
    this.setState(()=>({ roomId: videoId }), ()=>{
      this.props.history.push('/room')
    })
    console.log('RoomId is now: ', this.state.roomId)
    /* put this.props.history.push('/room') in callback function of this.setState
    to redirect to the new room after the thumbnail is clicked */
  }


  //This is functions for the add favs piece
  addChanger=(event)=>{
    console.log("this is my add changer",event.target.value)
    event.persist()
    this.setState(()=>({
      addFav: event.target.value
  }))
}

  addhandler=(event)=>{
    event.persist()
    event.preventDefault()
    let videoID=this.youtube_parser(this.state.addFav)
    if (!this.state.favorites.includes(videoID)){
      let newArray= [videoID, ...this.state.favorites]
      this.setState(()=>({
        favorites: newArray
    }))
    }
    console.log("this is my add handler",videoID)
  }

    youtube_parser=(url)=>{
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = url.match(regExp);
      return (match&&match[7].length===11)? match[7] : false;
    }

    addToFavs=()=>{
      console.log("this is my add to favs")
      let videoID= this.state.roomId
      if (!this.state.favorites.includes(videoID)){
        let newArray= [videoID, ...this.state.favorites]
        this.setState(()=>({
          favorites: newArray
        }))
      }
    }

    getLyrics = () => {
      fetch(`https://api.lyrics.ovh/v1/${C.name}/${C.song}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState(()=>({
          lyrics: response.lyrics
        }))
      })
    }   
  
  render(){
    // console.log(this.state)
    return (
      <div className='wrapper'>
        <NavBar roomId={this.state.roomId} />

        <Switch>
          <Route path="/search" render={()=> {
            return(
              <>
                <ResultsContainer 
                  searchResults={this.state.searchResults} 
                  next={this.next} 
                  prev={this.prev}
                  prevToken={this.state.prevToken} 
                  nextToken={this.state.nextToken} 
                  appRoomMaker={this.appRoomMaker}
                  searchHandler={this.appSearchHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />
              </>
            )
          }} />
          <Route path="/room" render={()=> {
            return(
              <>
                { this.state.roomId ? <Room roomId={this.state.roomId} addToFavs={this.addToFavs} lyrics={this.state.lyrics} /> : null}
                <ResultsContainer 
                  searchResults={this.state.searchResults} 
                  next={this.next} 
                  prev={this.prev}
                  prevToken={this.state.prevToken} 
                  nextToken={this.state.nextToken} 
                  appRoomMaker={this.appRoomMaker}
                  searchHandler={this.appSearchHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />
                {
                this.state.favorites ? 
                  <FavoritesContainer 
                    favs={this.state.favorites} 
                    appRoomMaker={this.appRoomMaker}
                    addChanger={this.addChanger}
                    addhandler={this.addhandler}
                    addFav={this.state.addFav}
                  />
                :
                null
                }
              </>
            )    
          }} />
          <Route path="/" render={()=> {
            return(
              <>
                <Home />
              </>
            )
          }} />
        </Switch>
        

        

      </div> 
    )
  }
}

export default withRouter(App);

/* TODO 9/28
1. for lyrics:
      in getLyrics, make call to youtube video api
          get artist name and song name from the videoId
      Interpolate the artist name and song name in the lyrics api call
2. Add design to LyricsBox
      fix width and height
      add scroll
3. Research sign up/login and JWT from Tashawn's videos
      implement by tomorrow, Tuesday 7/29
4. Research for grading feature
      WebAudio library/api (see readme for links)
      how to record audio from computer audio input
      how to record audio from computer form browser audio output
      how to create waveform from recorded audio
      how to compare two waveforms

*/

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