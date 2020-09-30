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
    lyrics: "",
    signup_name: "",
    signup_email: "",
    signup_password: "",
    user: false,
    login_email: "",
    login_password: ""
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
        this.setState({ user: data.user}, this.props.history.push("/search"))
      })
    }else {
      this.props.history.push("/")
    }
  }

  // appSearchHandler = (event) => {
  //   //setState here to change searchQuery to value received from Search
  //   event.persist()
  //   this.setState(()=>({
  //     searchQuery: event.target.value
  //   }))
  //   console.log("This is our change handler. Here's the query:", event.target.value)
  // }

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

  // resultsGetter = () => {

  // }

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


  //This is functions for the add favs piece
//   addChanger=(event)=>{
//     console.log("this is my add changer",event.target.value)
//     event.persist()
//     this.setState(()=>({
//       addFav: event.target.value
//   }))
// }

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
          name: this.state.signup_name,
          email: this.state.signup_email,
          password: this.state.signup_password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        localStorage.setItem("token",data.jwt)
        this.setState({ user: data.user}, this.props.history.push("/search"))
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
          email: this.state.login_email,
          password: this.state.login_password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        //Building Local Storage here, Joshie, boi
        localStorage.setItem("token",data.jwt)
        this.setState({ user: data.user}, this.props.history.push("/search"))
      })
  }

  logout =()=>{
    console.log("this is my logout")
    localStorage.clear("token")
    this.setState(()=>({user:false}))
  }
  
  render(){
    // console.log(this.state.user)
    return (

      <div className='wrapper'>
        <NavBar roomId={this.state.roomId} user={this.state.user} logout={this.logout}/>
        <Route path="/signup" render={()=> {
            return(
              <>
                <SignUp changeHandler={this.changeHandler} submitHandler={this.signupSubmitHandler} name={this.state.signup_name} email={this.state.signup_email} password={this.state.signup_password} />
              </>
            )
          }} />
          <Route path="/login" render={()=> {
            return(
              <>
                <Login changeHandler={this.changeHandler} submitHandler={this.loginSubmitHandler} email={this.state.login_email} password={this.state.login_password} />
              </>
            )
          }} />
            <Route path="/" render={()=> {
            return(
              <>
                <Home user={this.state.user} />
              </>
            )
          }} />
        {this.state.user === false ? null :
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
                  searchHandler={this.changeHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />
              </>
            )
          }} />
          <Route path="/room" render={()=> {
            return(
              <>
                { this.state.roomId && this.state.user ? <Room roomId={this.state.roomId} addToFavs={this.addToFavs} lyrics={this.state.lyrics} /> : null}
                <ResultsContainer 
                  searchResults={this.state.searchResults} 
                  next={this.next} 
                  prev={this.prev}
                  prevToken={this.state.prevToken} 
                  nextToken={this.state.nextToken} 
                  appRoomMaker={this.appRoomMaker}
                  searchHandler={this.changeHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />
                {
                this.state.favorites && this.state.user ? 
                  <FavoritesContainer 
                    favs={this.state.favorites} 
                    appRoomMaker={this.appRoomMaker}
                    addChanger={this.changeHandler}
                    addhandler={this.addhandler}
                    addFav={this.state.addFav}
                  />
                :
                null
                }
              </>
            )    
          }} />
        </Switch>
    }
        

        

      </div> 
    )
  }
}

export default withRouter(App);



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