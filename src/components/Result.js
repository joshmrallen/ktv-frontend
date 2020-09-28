import React from 'react'

const Result=(props)=>{
    // console.log(props)

    const createRoom = () => {
        props.appRoomMaker(props.el)
    }

    return(
        <div>
            <img className='display'
                alt={props.el} 
                src={`https://img.youtube.com/vi/${props.el}/mqdefault.jpg`} 
                onClick={createRoom}
            />
        </div>
    )
}

export default Result
            // https://img.youtube.com/vi/x3bDhtuC5yk/mqdefault.jpg

            //<button >Add to Favs</button>
            // <iframe 
            // width="200" 
            // title={props.el} 
            // src={`https://www.youtube.com/embed/${props.el}?cc_load_policy=1`}
            // frameBorder="0" 
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            // allowFullScreen>
            // </iframe>