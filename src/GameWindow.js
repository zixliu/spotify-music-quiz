import React, { useState } from 'react'
import './GameWindow.css'

export default function GameWindow({track, setAnswerCorrectSong, setAnswerCorrectArtist, numberOfTracks, totalCorrectSongs, totalCorrectArtists, moveToNextTrack}) {
    const [result, setResult] = useState("")
    const [showSong, setShowSong] = useState(true)
    const [showArtist, setShowArtist] = useState(true)

    function resetLayout(){
        setShowSong(true)
        setShowArtist(true)
        moveToNextTrack()
    }


    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPressTitle = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswerTitle").value;
            if (answer.toLowerCase() === track.name.toLowerCase()) {
                console.log("Correct song!")
                setResult("Correct song!")
                setAnswerCorrectSong(true)
            }
            else {
                console.log("Wrong song!")
                setResult("Wrong! The correct answer is " + track.name)
                setAnswerCorrectSong(false)

            }

            setShowSong(false)

            if (! showArtist){
                resetLayout()
                
            }

            document.getElementById("inputAnswerTitle").value = ""
        }
    }

    const handleKeyPressArtist = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswerArtist").value;
            if (track.artists.map(a => a.name.toLowerCase()).includes(answer.toLowerCase())) {
                console.log("Correct artist!")
                setResult("Correct artist!");
                setAnswerCorrectArtist(true)

            }
            else {
                console.log("Wrong artist!")
                setResult("Wrong! The correct artist name(s) are: " + track.artists.map(artist => artist.name).join(", "))
                setAnswerCorrectArtist(false)
            }
            setShowArtist(false);

            if (! showSong){
                resetLayout()

            }

            document.getElementById("inputAnswerArtist").value = ""
        }
    }


    return (
        <div>
            {showSong ? 
            <input 
                className="field"
                id="inputAnswerTitle"
                onKeyPress={handleKeyPressTitle}
                placeholder="Guess the title!"
                autoComplete="off">
            </input> : null}
            <br></br>
            {showArtist ? 
            <input 
                className="artistName"
                id="inputAnswerArtist"
                onKeyPress={handleKeyPressArtist}
                placeholder="Guess the artist!"
                autoComplete="off">
            </input> : null}
            <h2>{result}</h2>
            <h2>{totalCorrectSongs} song titles of {numberOfTracks} correct!</h2>
            <h2>{totalCorrectArtists} artists of {numberOfTracks} correct!</h2>

        </div>
    )
}
