import React from 'react'
import Favorite from '../components/Favorite'
// import Result from '../components/Result'
import Add from '../components/Add'

const FavoritesContainer = (props) => {
    console.log(props)
    let videos = props.favs?.map((el,index)=><Favorite key={index} el={el} appVideoPlayer={props.appVideoPlayer} delete={props.delete}/>)
    return(
        <div className='favoritesTile'>
            <Add
                addChanger={props.addChanger}
                addhandler={props.addhandler}
                addFav={props.addFav}
            />
            {videos}
        </div>
    )
}

export default FavoritesContainer

//<Favorite />