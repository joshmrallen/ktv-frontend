import React from 'react'

class Search extends React.Component {

    // console.log(props.appSubmitHandler)

    // const submitHandler = (event) => {
    //     event.preventDefault()
    //     console.log("Still inside Search component!")
    //     props.appSubmitHandler(event)
    // }

    render(){
        return(
                <div>
                    <form onSubmit={this.props.appSubmitHandler}>
                        <input type='text' name="search" placeholder="Search for a Song" value={this.props.searchQuery} onChange={this.props.searchHandler} />
                        <input type='submit' value='Search' />
                    </form>
                </div>
            )
    }
}

export default Search