import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = (props) => {

    return(
        <div className="box home">
            <span>
                <h1>Welcome to Wu KTV!</h1>
            </span>
            <h1 style={{visibility: 'hidden'}}>stuff</h1>
            {props.user ? null : <NavLink to="/signup">SignUp and Sing!</NavLink>}
            {props.user ? null : <NavLink to="/login">Login and Sing!</NavLink>}
        </div>
    )
}

export default Home