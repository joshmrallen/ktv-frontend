import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = (props) => {

    return(
        <div className="home">
            <span className='title'>
                <h1>Welcome to Wu KTV!</h1>
            </span>
            {props.user ? null : <NavLink className='signup' to="/signup">Sign Up and Sing!</NavLink>}
            {props.user ? null : <NavLink className='login'to="/login">Login and Sing!</NavLink>}
        </div>
    )
}

export default Home