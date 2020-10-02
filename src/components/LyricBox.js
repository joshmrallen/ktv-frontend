import React from 'react'

const LyricBox = (props) => {

    const splitLines = (string) => string?.split(/\r?\n/)

    const lyricsArray = splitLines(props.lyrics)

    const lines = lyricsArray?.map(line => <p>{line}</p>)

    return(
        <>
        {lines}
        </>
    )
}

export default LyricBox