import React from 'react'
import Video from '../components/Video'
import LyricBox from '../components/LyricBox'
// import SearchContainer from './SearchContainer'
// import FavoritesContainer from './FavoritesContainer'

class Room extends React.Component {

    state = {
        //use this to find artist or song name inside the video's description property
        //the artist and song name must both be obtained in order to make a call to the api
        artist: "",
        title: "",
        lyrics: ""
    }

    getArtistSongTitle = (details) => {
        // const details = this.state.searchQuery
        fetch(`https://api.canarado.xyz/lyrics/${details}`)
        .then(response => response.json())
        .then(results => {
            this.setState(()=>({
                artist: results.content[0].artist,
                title: results.content[0].title
            }), ()=>{
                console.log("Got artist and title: ", this.state)
                // this.getLyrics()
            })
        })
        return { artist: this.state.artist, title: this.state.title } 
      }
  
      getLyrics = () => {
        const { artist, title } = this.getArtistSongTitle(this.props.searchQuery)

        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(response => {
            if(response.lyrics === ""){
                this.setState(()=>({
                    lyrics: "Could Not Find Lyrics for This Song"
                }))
            } else {
                console.log(response)
                this.setState(()=>({
                    lyrics: response.lyrics
                }), ()=>console.log("Got lyrics: ", this.state))
            }
        })
        .catch(console.log)

        return this.state.lyrics
    }

    // findAPIParams = (parseTerm) => {
    //     const artistKey = "artist"
    //     const songKey = "song"
    //     //need to have room video persisted on backend to get all details from backend
        
    // }

    render(){
        return(
            <>
            <div className='box room'>
                <Video videoId={this.props.roomId} />
                <button className= 'pause'>Pause</button>
                <button className= 'addVideo' onClick={this.props.addToFavs}>Add to Favs</button>
            </div>
            <div className='box lyrics'>
                <LyricBox lyrics={this.getLyrics()} />
                {/* 
                <SearchContainer />
                <FavoritesContainer /> */}
            </div>
            </>
        )

    }
}

export default Room



/* Sample response from camarodo:

artist: "Ludacris"
lyrics: ""
title: "Money Maker by..."

*/