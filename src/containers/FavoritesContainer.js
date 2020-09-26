import React from 'react'
import Favorite from '../components/Favorite'
import Result from '../components/Result'
import Add from '../components/Add'

const FavoritesContainer = (props) => {

    let videos = props.favs.map((el,index)=><Result key={index} el={el} appRoomMaker={props.appRoomMaker}/>)
    return(
        <div className='box favorites'>
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