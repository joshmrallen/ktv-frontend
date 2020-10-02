import React from 'react'

const Login = (props) => {

    return(
        <div className='loadPage'>
            <form onSubmit={props.submitHandler}>
                <input type='email' className='email' name='email' placeholder='Email' onChange={props.changeHandler} value={props.email} />
                <input type='password' className='password' name='password' placeholder='Password' onChange={props.changeHandler} value={props.password} />
                <input type='submit' className='submit' value='Login!' />
            </form>
        </div>
    )
}

export default Login