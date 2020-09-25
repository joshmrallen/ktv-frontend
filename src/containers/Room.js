import React from 'react'
import Video from '../components/Video'
import LyricBox from '../components/LyricBox'
import SearchContainer from './SearchContainer'
import FavoritesContainer from './FavoritesContainer'

const Room = (props) => {



    return(
        <div>
            <Video />
            <LyricBox />
            <SearchContainer />
            <FavoritesContainer />
        </div>
    )
}

export default Room
