import React from 'react'
import Search from '../components/Search'
import ResultsContainer from './ResultsContainer'


const SearchContainer = (props) => {
    return(
        <div className='searchTile'>
            <Search />
            <ResultsContainer />
        </div>
    )
}

export default SearchContainer


/* 
<ResultsContainer 
                  searchResults={this.state.searchResults} 
                  next={this.next} 
                  prev={this.prev}
                  prevToken={this.state.prevToken} 
                  nextToken={this.state.nextToken} 
                  appVideoPlayer={this.appVideoPlayer}
                  searchHandler={this.changeHandler} 
                  searchQuery={this.state.searchQuery} 
                  appSubmitHandler={this.appSubmitHandler} 
                />

*/