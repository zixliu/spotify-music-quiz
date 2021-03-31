import React, { useState } from 'react'
import './InputField.css'

export default function InputField({track, setAnswerCorrect}) {
    const [result, setResult] = useState("")

    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

            let answer = document.getElementById("inputAnswer").value;

            if (answer.toLowerCase() === track.name.toLowerCase()) {
                console.log("Correct!")
                setResult("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setResult("Wrong!")
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
                placeholder="Guess the title!">
            </input>
            <h2>{result}</h2>
        </div>
    )
}
