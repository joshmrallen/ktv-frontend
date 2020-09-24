import React from 'react'
import Result from '../components/Result'

const ResultsContainer = (props) => {

    let videos = props.searchResults.map((el,index)=><Result key={index} el={el}/>)
    console.log(props)
    return(
        <div>
            {videos}
            <button>Next</button>
        </div>
    )
}

export default ResultsContainer