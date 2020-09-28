import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {

    return(
        <div className="home">
            <h1>Welcome to Wu KTV! <NavLink className="link" to="/search">Sing!</NavLink></h1>
            

            <div className="bottom-image">
                <h1 style={{visibility: 'hidden'}}>stuff</h1>
                
            </div>
        </div>
    )
}

export default Home