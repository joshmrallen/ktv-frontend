import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = (props) => {

    return(
        <div className="box home">
            <h1>Welcome to Wu KTV! <NavLink className="link" to="/search">Sing!</NavLink></h1>
            <h1 style={{visibility: 'hidden'}}>stuff</h1>
            {props.user ? "Go Sing!" : <NavLink to="/signup">SignUp and Sing!</NavLink>}
            {props.user ? "Go Sing!" : <NavLink to="/login">Login and Sing!</NavLink>}
        </div>
    )
}

export default Home