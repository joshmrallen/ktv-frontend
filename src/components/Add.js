import React from 'react'

const Add =(props)=>{

        return(
                <div>
                    <form onSubmit={props.addHandler}>
                        <input
                            className=' text'
                            type='text' 
                            name="add" 
                            placeholder="Add A Song" 
                            value={props.add} 
                            onChange={props.addChanger} 
                        />
                        <input 
                            className='submit'
                            type='submit' 
                            value='Add A Song' 
                        />
                    </form>
                </div>
            )
    
}

export default Add