import React from 'react'
import LyricBox from './LyricBox'

const Video = (props) => {


    return(
        <>
            <div className ='player'>
                <iframe className= 'main-video' 
                    // width="500" 
                    // height='auto'
                    //width="100%" scrolling="yes"
                    title={props.el} 
                    src={`https://www.youtube.com/embed/${props.videoId}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en`}
                    //frameBorder="0" 
                    allow="autoplay" 
                    //allowFullScreen 
                    >
                </iframe>
            </div>
            <div className="utility">
                <button className= 'addVideo' onClick={props.addToFavs}>Add to Favs</button>
            </div>
            <div className='lyrics'>
                <LyricBox />
            </div>
        </>
    )
}

export default Video