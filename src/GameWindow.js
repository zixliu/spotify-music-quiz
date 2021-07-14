import React, { useState } from 'react'
import './GameWindow.css'
import Fuse from 'fuse.js'

export default function GameWindow({track, setAnswerCorrectSong, setAnswerCorrectArtist, numberOfTracks, totalCorrectSongs, totalCorrectArtists, moveToNextTrack}) {
    const [result, setResult] = useState("")
    const [showSong, setShowSong] = useState(true)
    const [showArtist, setShowArtist] = useState(true)

    function resetLayout() {
        setShowSong(true)
        setShowArtist(true)
        moveToNextTrack()
    }


    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPressTitle = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswerTitle").value;
            let trackNameList = [track.name]

            if (fuzzySearch(answer, trackNameList).length > 0) {
                setResult("Correct! The answer is " + track.name)
                setAnswerCorrectSong(true);
            } else {
                setResult("Wrong! The answer is " + track.name)
                setAnswerCorrectSong(false);
            }

            setShowSong(false)

            if (!showArtist) {
                resetLayout()
            }

            document.getElementById("inputAnswerTitle").value = ""
        }
    }

    const handleKeyPressArtist = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            let answer = document.getElementById("inputAnswerArtist").value;
            let artistNames = track.artists.map(a => a.name)

            if (fuzzySearch(answer, artistNames).length > 0) {
                setResult("Correct! The answer is " + artistNames.join(", "))
                setAnswerCorrectArtist(true);
            } else {
                setResult("Wrong! The answer is " + artistNames.join(", "))
                setAnswerCorrectArtist(false)
            }
          
            setShowArtist(false);

            if (!showSong) {
                resetLayout()
            }

            document.getElementById("inputAnswerArtist").value = ""
        }
    }

    function fuzzySearch(userInput, answerList) {
        const options = {
            includeScore: true,
            threshold: 0.3
        }
        const fuse = new Fuse(answerList, options)
        return fuse.search(userInput)
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
