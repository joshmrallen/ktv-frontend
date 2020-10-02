import React from 'react'
import Video from '../components/Video'
import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'

class Room extends React.Component {

    render(){
        // console.log(this.props)
        const {prevToken, nextToken,searchQuery,addFav,favorites,searchResults, currentVideo,lyrics} = this.props.state
        // console.log(prevToken, nextToken,searchQuery,addFav,favorites,searchResults, currentVideo,lyrics)
        // console.log(favorites)
        
        return(
            <>
                <p className='navfiller'></p>
                <div className='mainroom'>
                    <ResultsContainer 
                        searchResults={searchResults} 
                        next={this.props.next} 
                        prev={this.props.prev}
                        prevToken={prevToken} 
                        nextToken={nextToken} 
                        appVideoPlayer={this.props.appVideoPlayer}
                        changeHandler={this.props.changeHandler} 
                        searchQuery={searchQuery} 
                        appSubmitHandler={this.props.appSubmitHandler} 
                    />
                    <span className="filler"></span>
                    <Video video={currentVideo} addToFavs={this.props.addToFavs} lyrics={lyrics}/>
                    <span className="filler"></span>
                    <FavoritesContainer 
                        favs={favorites} 
                        appVideoPlayer={this.props.appVideoPlayer}
                        addChanger={this.props.changeHandler}
                        addhandler={this.props.addhandler}
                        addFav={addFav}
                  />
                </div>
            </>
        )

    }
}

export default Room


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



