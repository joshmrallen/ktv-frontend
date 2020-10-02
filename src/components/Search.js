import React from 'react'

const Search =(props)=>{
    // console.log(props)
        return(
                <div className='search'>
                    <form onSubmit={props.appSubmitHandler}>
                        <input 
                            className='text'
                            type='text' 
                            name="searchQuery" 
                            placeholder="Search for Song" 
                            value={props.searchQuery} 
                            onChange={props.searchHandler} 
                        />
                        <input 
                            className='submit'
                            type='submit' 
                            value='Search' 
                        />
                    </form>
                    <br/>
                </div>
            )
    
}

export default Search