import React, { useState } from 'react'
import './GameWindow.css'

export default function GameWindow({track, setAnswerCorrect, totalCorrect, numberOfTracks}) {
    const [result, setResult] = useState("")

    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswer").value;

            console.log("The correct answer is " + track.name)
            if (answer.toLowerCase() === track.name.toLowerCase()) {
                console.log("Correct!")
                setResult("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong! The correct answer is " + track.name)
                setAnswerCorrect(false);
            }

            document.getElementById("inputAnswer").value = ""
        }
    }

    return (
        <div>
            <input 
                className="field"
                id="inputAnswer"
                onKeyPress={handleKeyPress}
                placeholder="Guess the title!"
                autoComplete="off">
            </input>
            <h2>{result}</h2>
            <h2>{totalCorrect} of {numberOfTracks} correct!</h2>
        </div>
    )
}
