import React from 'react'
import Video from '../components/Video'
import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'

class Room extends React.Component {

    


    render(){
        return(
            <>
                <div className='room'>
                    <ResultsContainer 
                        searchResults={this.props.searchResults} 
                        next={this.props.next} 
                        prev={this.prev}
                        prevToken={this.state.prevToken} 
                        nextToken={this.state.nextToken} 
                        appVideoPlayer={this.appVideoPlayer}
                        searchHandler={this.changeHandler} 
                        searchQuery={this.state.searchQuery} 
                        appSubmitHandler={this.appSubmitHandler} 
                    />
                    <Video videoId={this.props.roomId} addToFavs={this.props.addToFavs} />
                    <FavoritesContainer />
                </div>
            </>
        )

    }
}

export default Room

/* 
<FavoritesContainer 
                    favs={this.state.favorites} 
                    appVideoPlayer={this.appVideoPlayer}
                    addChanger={this.changeHandler}
                    addhandler={this.addhandler}
                    addFav={this.state.addFav}
                  />

<ResultsContainer 
                  searchResults={this.state.searchResults} 
                  next={this.next} 
                  prev={this.prev}
                  prevToken={this.state.prevToken} 
                  nextToken={this.state.nextToken} 
                  appVideoPlayer={this.appVideoPlayer}
                  searchHandler={this.changeHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />
*/

/* 
1. Add search and favorite components to Room render so they appear when the room is rendered
2. Video component is rendered when a user clicks on a thumbnail from either search or favorites
        When a thumbnail is clicked, a request is sent to backend for details
            Backend finds the video record if it already exists or creates a new one
                response back is the video's details
                    video details get saved into App state
                        video details get passed back down through Room props
                            Room passes Video detail props to Lyric box, etc













Sample response from camarodo:

artist: "Ludacris"
lyrics: ""
title: "Money Maker by..."












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




*/



