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
            let artistNames = track.artists.map(artist => artist.name).join(", ")

            if (fuzzySearch(answer, trackNameList).length > 0) {
                console.log("Correct! Result is ")
                console.log(result)
                setResult("Correct! The answer is " + track.name + " by " + artistNames)
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong! The answer is " + track.name + " by " + artistNames)
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
                console.log("Correct! The answer is " + track.name + " by " + artistNames.join(", "))
                setResult("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong! The answer is " + track.name + " by " + artistNames.join(", "))
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
