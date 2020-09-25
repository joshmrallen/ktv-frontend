import React from 'react'

const Result=(props)=>{
    console.log(props)
    return(
        <div>
            <iframe 
            width="200" 
            title={props.el} 
            src={`https://www.youtube.com/embed/${props.el}`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
            </iframe>
            <button >Add to Favs</button>
        </div>
    )
}

export default Result

