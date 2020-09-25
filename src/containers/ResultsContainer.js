import React from 'react'
import Result from '../components/Result'

const ResultsContainer = (props) => {

    console.log(props.searchResults)
    console.log(props)
    let videos = props.searchResults.map((el,index)=><Result key={index} el={el} next={props.next}/>)
    return(
        <div>
            {videos}
            {props.prevToken ? <button onClick={()=>{props.prev()}}>Prev 10</button> : null}
            {props.nextToken ? <button onClick={()=>{props.next()}} >Next 10</button> : null}
        </div>
    )
}

export default ResultsContainer