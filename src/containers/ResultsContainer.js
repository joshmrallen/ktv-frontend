import React from 'react'
import Result from '../components/Result'

const ResultsContainer = (props) => {

    let videos = props.searchResults.map((el,index)=><Result key={index} el={el} next={props.next}/>)
    // console.log(props.searchResults.length)
    return(
        <div>
            {videos}
            {props.searchResults.length===0 ? null : <button onClick={()=>{props.next()}} >Next 10</button>}
        </div>
    )
}

export default ResultsContainer