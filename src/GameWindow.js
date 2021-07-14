import React, { useState } from 'react'
import './GameWindow.css'
import Fuse from 'fuse.js'

export default function GameWindow({track, setAnswerCorrect, totalCorrect, numberOfTracks}) {
    const [result, setResult] = useState("")

    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPressTitle = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswerTitle").value;
            let trackNameList = [track.name]

            if (fuzzySearch(answer, trackNameList).length > 0) {
                console.log("Correct! Result is ")
                console.log(result)
                setResult("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong! The correct answer is " + track.name)
                setAnswerCorrect(false);
            }

            document.getElementById("inputAnswerTitle").value = ""
        }
    }

    const handleKeyPressArtist = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            let answer = document.getElementById("inputAnswerArtist").value;
            let artistNames = track.artists.map(a => a.name.toLowerCase())
            
            if (fuzzySearch(answer, artistNames).length > 0) {
                console.log("Correct!")
                setResult("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong! The correct artist name(s) are: " + track.artists.map(artist => artist.name).join(", "))
                setAnswerCorrect(false);
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
            <input 
                className="field"
                id="inputAnswerTitle"
                onKeyPress={handleKeyPressTitle}
                placeholder="Guess the title!"
                autoComplete="off">
            </input>
            <br></br>
            <input 
                className="artistName"
                id="inputAnswerArtist"
                onKeyPress={handleKeyPressArtist}
                placeholder="Guess the artist!"
                autoComplete="off">
            </input>
            <h2>{result}</h2>
            <h2>{totalCorrect} of {numberOfTracks} correct!</h2>
        </div>
    )
}
