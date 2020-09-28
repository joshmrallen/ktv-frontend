import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {

    return(
        <div style={{border: 'solid', textAlign: 'center'}}>
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/search">Search Songs</NavLink>
            </div>
            <div>
                { props.roomId ? <NavLink to="/room">Room</NavLink> : null }
            </div>
        </div>
    )
}

export default NavBar