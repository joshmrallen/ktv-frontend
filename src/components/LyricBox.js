import React from 'react'

const LyricBox = (props) => {
    // console.log(props)
    const splitLines = (string) => string?.split(/\r?\n/)

    const lyricsArray = splitLines(props.lyrics)

    const lines = lyricsArray?.map((line,index) => <p key={index}>{line}</p>)

    return(
        <>
        {lines}
        </>
    )
}

export default LyricBox