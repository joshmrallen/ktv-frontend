import React from 'react'

const Add =(props)=>{
    console.log(props)
        return(
                <div>
                    <form onSubmit={(e)=>{props.addhandler(e)}}>
                        <input
                            className=' text'
                            type='text' 
                            name="add" 
                            placeholder="Add A Song" 
                            value={props.addFav} 
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