import React from 'react'

const Video = (props) => {


    return(
        <div className ='room'>
            <iframe className= 'main-video' 
                // width="500" 
                // height='auto'
                //width="100%" scrolling="yes"
                title={props.el} 
                src={`https://www.youtube.com/embed/${props.videoId}?cc_load_policy=1`}
                //frameBorder="0" 
                //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                //allowFullScreen 
                >
            </iframe>
        </div>
    )
}

export default Video