import React from 'react'
import './InputField.css'

export default function InputField({track, setAnswerCorrect}) {

    // check user has guessed the correct title of the track and pass boolean value to App
    const handleKeyPress = (event) => {
        if (event.key == 'Enter' || event.charCode == 13) {

            let answer = document.getElementById("inputAnswer").value;

            if (answer.toLowerCase() == track.name.toLowerCase()) {
                console.log("Correct!")
                setAnswerCorrect(true);
            }
            else {
                console.log("Wrong!")
                setAnswerCorrect(false);
            }

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
        </div>
    )
}
