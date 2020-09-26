import React from 'react'

const Add =(props)=>{

        return(
                <div>
                    <form onSubmit={props.addHandler}>
                        <input type='text' name="add" placeholder="Add A Song" value={props.add} onChange={props.addChanger} />
                        <input type='submit' value='Add A Song' />
                    </form>
                </div>
            )
    
}

export default Add