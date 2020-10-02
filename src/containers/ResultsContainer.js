import React from 'react'
import Result from '../components/Result'
import Search from '../components/Search'

const ResultsContainer = (props) => {

    let videos = props.searchResults?.map((el,index)=><Result key={index} el={el} next={props.next} appVideoPlayer={props.appVideoPlayer}/>)
    // console.log(props)
    return(
        <div className='results'>
            <Search 
                changeHandler={props.changeHandler} 
                searchQuery={props.searchQuery} 
                appSubmitHandler={props.appSubmitHandler} 
            />
            {videos}
            {props.prevToken ? <button onClick={()=>{props.prev()}}>Prev 10</button> : null}
            {props.nextToken ? <button onClick={()=>{props.next()}} >Next 10</button> : null}
        </div>
    )
}

export default ResultsContainer