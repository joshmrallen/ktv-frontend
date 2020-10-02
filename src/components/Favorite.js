import React from 'react'

const Favorite = (props) => {
        // console.log(props.delete)

        const createRoom = () => {
            props.appVideoPlayer(props.el)
        }
        
    
        return(
            <div className='favpic'>
                <img className='display'
                    alt={props.el} 
                    src={`https://img.youtube.com/vi/${props.el}/mqdefault.jpg`} 
                    onClick={createRoom}
                />
                <span className='delete' onClick={()=>props.delete(props.el)}>x</span>
            </div>
        )
}

export default Favorite