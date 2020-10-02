import React from 'react'

const Favorite = (props) => {
        console.log(props)

        const createRoom = () => {
            props.appVideoPlayer(props.el)
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

export default Favorite