import React from 'react'

const Search = (props) => {

    console.log(props)

    return(
            <div>
                <input type='text' name="search" placeholder="Search for a Song" value={props.searchQuery} onChange={props.searchHandler} />
                <input type='submit' value='Search' onSubmit={props.appSubmitHandler} />
            </div>
        )
}

export default Search