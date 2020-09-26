import React from 'react'
import Video from '../components/Video'
import LyricBox from '../components/LyricBox'
import SearchContainer from './SearchContainer'
import FavoritesContainer from './FavoritesContainer'

const Room = (props) => {



    return(
        <div className='box room'>
            <Video videoId={props.roomId} />
            <button className= 'pause'>Pause</button>
            <button className= 'addVideo' onClick={props.addToFavs}>Add to Favs</button>
            {/* <LyricBox />
            <SearchContainer />
            <FavoritesContainer /> */}
        </div>
    )
}

export default Room
