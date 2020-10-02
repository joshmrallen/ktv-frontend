import React from 'react';
import './App.css';
import ResultsContainer from './containers/ResultsContainer'
import NavBar from './components/NavBar';
import {Route, Switch, withRouter, NavLink} from 'react-router-dom'
import Room from './containers/Room'
import FavoritesContainer from './containers/FavoritesContainer'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'

const API_URL = 'http://localhost:3000'

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: ["jo505ZyaCbA","Wc5IbN4xw70","JDb3ZZD4bA0"],
    favorites:["x3bDhtuC5yk","caITRQWpBHs"],
    nextToken: false,
    prevToken: false,
    currentVideo: false,
    lyrics:"",
    vidObj: false,
    addFav: "",
    name: "",
    email: "",
    password: "",
    user: false,
  }

  componentDidMount=()=>{
    const token = localStorage.getItem("token")
    console.log("This is ya user, you fool")
    if (token){
      fetch('http://localhost:3000/profile',{
        method:"GET",
        headers:{Authorization:`bearer ${token}`},
      }).then(r=>r.json())
      .then(data=>{
        console.log(data)
        this.setState({ user: data.user, favorites: data.user?.videos.map(el=>el.youTubeId)}, this.props.history.push("/room"))
      })
    }else {
      this.props.history.push("/")
    }
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

  appVideoPlayer = (videoId) => {
    console.log('This is our video player. currentVideo is currently: ', this.state.currentVideo)
    
    this.setState(()=>({ currentVideo: videoId }))
    console.log('Current Video is now: ', this.state.currentVideo)

    fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ youTubeId: videoId})
    })
      .then(r => r.json())
      .then(data=>{
        console.log(data)
        this.setState(()=>({
          lyrics: data.lyrics
        }))
        
      }) //see if works -- then setState in vidObj
  }

  /* 
  room model: user_id, videoId (string from youtube url)

  1. post request: 
          route: send to RoomController create action
                post '/rooms', to: 'rooms#create'
          send user_id and videoId (the string from youtube search result)
  
      1. Video.create_or_find_by(youTubeId: videoId)
              videoId is the youtube id found in the url or our search results which is a string
              when do we get the data for the other columns for this record?
                  
      2. Room.create(user_id, video_id)

  */



  addhandler=(event)=>{
    event.persist()
    event.preventDefault()
    console.log("this is my add", this.state.addFav)
    let videoID=this.youtube_parser(this.state.addFav)
    if (!this.state.favorites.includes(videoID)){
      const favObj = {
        user_id: this.state.user, //We are sending the entire user to our back end. Our backend is going to take the email information for this object.
        video_id: videoID         // We are then going to use the email to find the user in the back end. We are also creating a Video record with this video ID(string)
      }                           // With our user ID and video ID finally created, we will create the favorite user instance. 
      fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(
          favObj
        )
      })
      .then(r=>r.json())
      .then(data=>{
          let newArray= [data.youTubeId, ...this.state.favorites]
          this.setState(()=>({
            favorites: newArray
        }))
      })
    }
    console.log("this is my add handler",videoID)
  }

    youtube_parser=(url)=>{
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = url.match(regExp);
      return (match&&match[7].length===11)? match[7] : false;
    }

    addToFavs=()=>{ //should we change favs into a quene in the front end
      console.log("this is my add to favs",this.state.currentVideo,this.state.user)
      let videoID= this.state.currentVideo
      if (!this.state.favorites.includes(videoID)){
        // let newArray= [videoID, ...this.state.favorites]
        const favorite = {
          user_id: this.state.user,
          video_id: videoID,
        }
        fetch(`${API_URL}/favorites`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(
            favorite
          )
        })
        .then(r => r.json())
        .then(data=>{
          console.log(data)
          let newArray= [data.videos]
          this.setState(()=>({
            favorites: newArray
          }))
        })
      }
    }

  changeHandler = (event) => {
    // console.log(`${event.target.name}: ${event.target.value}`)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupSubmitHandler = (event) => {
    event.preventDefault()
    console.log("Signup happening!")
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        localStorage.setItem("token",data.jwt)
        this.setState({ user: data.user}, this.props.history.push("/room"))
      })
  }

  loginSubmitHandler = (event) => {
    event.preventDefault()
    console.log("Getting Logins from my cousin Greg",)
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        localStorage.setItem("token",data.jwt)
        this.setState({ user: data.user}, this.props.history.push("/room"))
      })
  }

  logout =()=>{
    console.log("this is my logout")
    localStorage.clear("token")
    this.setState(()=>({
      user:false,
      favorites: []
    }))
  }
  
  render(){
    // console.log(this.state.user)
    return (

      <div className='wrapper'>
        <NavBar user={this.state.user} logout={this.logout}/>
        <Switch>
        <Route path="/signup" render={()=> {
            return(
              <Switch>
                <SignUp changeHandler={this.changeHandler} submitHandler={this.signupSubmitHandler} name={this.state.name} email={this.state.email} password={this.state.password} />
              </Switch>
            )
          }} />
          <Route path="/login" render={()=> {
            return(
              <>
                <Login changeHandler={this.changeHandler} submitHandler={this.loginSubmitHandler} email={this.state.email} password={this.state.password} />
              </>
            )
          }} />
          {this.state.user === false ? null :
        
              <Route path="/room" render={()=> {
                return(
                  <>
                    <Room state={this.state}
                    //for results container and not in this.state
                      next={this.next}
                      prev={this.prev} 
                      changeHandler={this.changeHandler}
                      appSubmitHandler={this.appSubmitHandler}
                      appVideoPlayer={this.appVideoPlayer}
                    //for favorites container
                      addhandler={this.addhandler}

                      currentVideo={this.state.currentVideo} 
                      addToFavs={this.addToFavs} 
                      lyrics={this.state.lyrics} 
                      searchQuery={this.state.searchQuery} />
                  </>
                )    
              }} />
      
          }
            <Route path="/" render={()=> {
            return(
              <>
                <Home user={this.state.user} />
              </>
            )
          }} />
          </Switch>
        
        

        

      </div> 
    )
  }
}

export default withRouter(App);

/* 10/1 Todo:
11:59am: see appRoomMaker for comments for next steps

1. make search and "favorites" hideable
      have them show up in the same spot
          change route landing after login:
              currently goes to search
              change to generic room with no iframe
              add "Search" and "Favorites or Queue" button
              Add toggle of display: 'hidden' / display: 'bloc' 
2. CSS
      change to flex?
      background pattern change?
      change 'go sing!' text on 'home' page

*/





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