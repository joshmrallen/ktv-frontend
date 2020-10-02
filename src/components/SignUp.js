import React from 'react'

const SignUp = (props) => {

    return(
        <div className='loadPage'>
            <form className='signuppage' onSubmit={props.submitHandler}>
                <input type='text' className='name' name='name' placeholder='Name' onChange={props.changeHandler} value={props.name} />
                <input type='email' className='email' name='email' placeholder='Email' onChange={props.changeHandler} value={props.email} />
                <input type='password' className='password' name='password' placeholder='Password' onChange={props.changeHandler} value={props.password} />
                <input type='submit' className='submit' value='Sign Me Up!' />
            </form>
        </div>
    )
}

export default SignUp