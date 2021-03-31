import './App.css';
import Login from './Login';
import Player from './Player';
import InputField from './InputField';
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { getTokenFromResponse } from "./spotifyConfig";

var SpotifyWebApi = require('spotify-web-api-node');
const s = new SpotifyWebApi();

function shuffleArray(input) {
  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

function App() {
  const [token, dispatch] = useState(null);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getPlaylist("3YA2HwKlRVBeHgIPB5FW2o").then((response) => {
        setTrack(response.body.tracks.items[0].track)
    })    
      
    }
  }, [token, dispatch]); // , [token, dispatch]

  // sets answerCorrect to true if the user guesses the correct title of the track.
  // the function is passed down to the InputField-component where it gets the value
  const setAnswerCorrect = (answerCorrect) => {
    if (answerCorrect == true) {
      
      console.log(answerCorrect)
      
      // Replace this with the function that changes to a random song
      s.getPlaylist("3K4Vb4ydfA2DMhezlfvx2Y").then((response) => {
        setTrack(response.body.tracks.items[0].track)
    })    
    }
    else {
      console.log(answerCorrect)
    }
  } 


  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Hello</h1>
    //   </header>
    // </div>
    // {!token && <Login />}
      // {token && <Player spotify={s} />}
      
    <div className="app">
        {!token && <Login />}
        {token && <Player token={s.getAccessToken()} track={track}/>}
        <InputField track={track} setAnswerCorrect={setAnswerCorrect}/>
    </div>
  );
}

export default App;
