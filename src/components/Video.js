import React from 'react'
import LyricBox from './LyricBox'

const Video = (props) => {
    console.log(props)
    
    return(
        <div className='mvp'>
            <div className ='player'>
                
                <iframe className= 'main-video' 
                // width="500" 
                // height='auto'
                //width="100%" scrolling="yes"
                title={props.el} 
                src={props.video ? `https://www.youtube.com/embed/${props.video}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en` : `https://www.youtube.com/embed/h-0G_FI61a8?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en`}
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
                <LyricBox lyrics={props.lyrics}/>
            </div>
        </div>
    )
}

export default Video