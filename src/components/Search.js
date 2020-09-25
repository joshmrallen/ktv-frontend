import React from 'react'

const Search =(props)=>{

        return(
                <div>
                    <form onSubmit={props.appSubmitHandler}>
                        <input type='text' name="search" placeholder="Search for a Song" value={props.searchQuery} onChange={props.searchHandler} />
                        <input type='submit' value='Search' />
                    </form>
                </div>
            )
    
}

export default Search