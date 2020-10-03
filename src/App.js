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

const API_URL = 'https://ktv-backend.herokuapp.com'

class App extends React.Component {
  
  state = {
    searchQuery: '',
    searchResults: ["jo505ZyaCbA","JDb3ZZD4bA0"],
    favorites: ["x3bDhtuC5yk","caITRQWpBHs"],
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
        this.setState({ user: data.user, favorites: data.user.videos ? data.user.videos.map(el=>el.youTubeId) : null}, ()=> {
          console.log(data)
          this.props.history.push("/room")
        })
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
    // debugger
    let videoID = this.youtube_parser(this.state.addFav)
    this.setState(()=>({ currentVideo: videoID }))

    console.log(!this.state.favorites.includes(videoID))

    if (!this.state.favorites.includes(videoID)){

      const favObj = {
        user_id: this.state.user, //We are sending the entire user to our back end. Our backend is going to take the email information for this object.
        video_id: videoID         // We are then going to use the email to find the user in the back end. We are also creating a Video record with this video ID(string)
      }                           // With our user ID and video ID finally created, we will create the favorite user instance. 
      
      //Rendering optimistically and posting the new video's id to the backend
      let newArray = [videoID, ...this.state.favorites]
      this.setState(()=>({
        favorites: newArray
      }))

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
      .then(video=>{
        console.log(video)
        this.setState(()=>({
          lyrics: video.lyrics
        }))
        console.log("you reach the end", video.lyrics)
        // let newObj = data.videos[data.videos.length-1].youTubeId
        // // let newArray = data.videos.map(vid => vid.youTubeId)
        // let newArray= [newObj, ...this.state.favorites]
        // this.setState(()=>({
        //   favorites: newArray
        // }))
      })
    }
    // console.log("this is my add handler",videoID)
  }

    youtube_parser=(url)=>{
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = url.match(regExp);
      return (match&&match[7].length===11)? match[7] : false;
    }

    addToFavs=()=>{ //should we change favs into a quene in the front end
      let videoID= this.state.currentVideo
      let filtered = this.state.favorites.filter(el=>el === videoID)
      console.log("this is my add to favs",this.state.currentVideo,this.state.favorites,!this.state.favorites.includes(videoID))
      console.log("this is my filter",filtered.length===0)
      if (filtered.length===0){
        console.log("this song will be sent to the back")
        
        const favorite = {
          user_id: this.state.user,
          video_id: videoID,
        }

        let newArray = [videoID, ...this.state.favorites]
        this.setState(()=>({favorites:newArray}))
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
        //   let newObj = data.videos[data.videos.length-1].youTubeId
        //   let newArray= [newObj, ...this.state.favorites]
        //   this.setState(()=>({
        //     favorites: newArray
        // }))
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
    event.persist()
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
        this.setState({ 
          user: data.user,
          name: "",
          email: "",
          password: ""
        }, this.props.history.push("/room"))
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
        this.setState({ 
          user: data.user,
          favorites: data.user.videos ? data.user.videos.map(el=>el.youTubeId) : null,
          email: "",
          password: ""
        }, this.props.history.push("/room"))
      })
  }

  logout =()=>{
    console.log("this is my logout")
    localStorage.clear("token")
    this.setState(()=>({
      searchQuery: '',
      user: false,
      favorites: ["x3bDhtuC5yk","caITRQWpBHs"]
    }))
  }

  delete=(videoId)=>{
    console.log("This is delete, buddy!", videoId)

    // optimistic delete from favorites container
    let newArray = this.state.favorites.filter(el=> el !== videoId)
    this.setState(()=>({
      favorites: newArray
    }))

    // api post to /favorites/delete with obj containing user_id and video_id
    fetch(`${API_URL}/favorites/delete`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        video_id: videoId
      })
    })
      .then(r=> r.json())
      .then(console.log)
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
                      delete={this.delete}

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