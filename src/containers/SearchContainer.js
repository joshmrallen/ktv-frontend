import React from 'react'
import Search from '../components/Search'
import ResultsContainer from './ResultsContainer'


const SearchContainer = (props) => {
    return(
        <div>
            <Search />
            <ResultsContainer />
        </div>
    )
}

export default SearchContainer