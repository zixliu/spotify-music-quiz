import './App.css';
import Login from './Login';
import Player from './Player';
import Menu from './Menu';
import InputField from './InputField';
import React, { useEffect, useState, useLayoutEffect } from "react";
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
  const [trackList, setTrackList] = useState();
  const [trackIndex, setTrackIndex] = useState(0);
  const [gameActive, setGameState] = useState(false);

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
        let trackShuffled = shuffleArray(response.body.tracks.items)
        setTrackList(trackShuffled)
      })
    }
  }, [token, dispatch]); // , [token, dispatch]

  // sets answerCorrect to true if the user guesses the correct title of the track.
  // the function is passed down to the InputField-component where it gets the value
  const setAnswerCorrect = (answerCorrect) => {
    if (answerCorrect === true) {
      console.log(answerCorrect)
    }
    else {
      console.log(answerCorrect)
    }
    moveToNextTrackInTracklist()
  }

  function moveToNextTrackInTracklist() {
    let maxTrackIndex = trackList.length - 1
    if (trackIndex === maxTrackIndex) {
      console.log("Reached end of playlist!")
    } else {
      setTrackIndex((v) => v + 1)
    }
  }

  const changeGameState = (gameState) => {
      setGameState(gameState)
  }

  return (
    <div className="app">
      {!token && <Login />}
      { token && gameActive && trackList && 
        <Player token={s.getAccessToken()} track={trackList[trackIndex].track} /> 
      }
      { token && gameActive && trackList && 
        <InputField track={trackList[trackIndex].track} setAnswerCorrect={setAnswerCorrect} />
      }
      {!gameActive && <Menu changeGameState={changeGameState}/>}
      main
    </div>
  );
}

export default App;
