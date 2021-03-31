import './App.css';
import Login from './Login';
import Player from './Player';
import Menu from './Menu';
import InputField from './InputField';
import Settings from './Settings';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
  const [numberOfTracks, setNumberOfTracks] = useState(20);
  const [playlist, setPlaylist] = useState("3YA2HwKlRVBeHgIPB5FW2o");

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

      s.getPlaylist(playlist).then((response) => {
        
        let trackShuffled = shuffleArray(response.body.tracks.items)
        setTrackList(trackShuffled)
      })
    }
  }, [token, dispatch, playlist]); // , [token, dispatch]

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
  
  const getSettings = (numberOfTracks, playlist) => {
    setNumberOfTracks(numberOfTracks);
    setPlaylist(playlist);
  }

  return (
    <Router>
    <div className="app">
        <Route path='/' exact render={() => ( // use exact render to avoid showing settings- and play-buttons on settings-page
          <>
            {!token && <Login />}
            { token && gameActive && trackList && 
              <Player token={s.getAccessToken()} track={trackList[trackIndex].track} /> 
            }
            { token && gameActive && trackList && 
              <InputField track={trackList[trackIndex].track} setAnswerCorrect={setAnswerCorrect} />
            }
            {!gameActive && <Menu changeGameState={changeGameState} settings={ {"numberOfTracks": numberOfTracks, "playlist": playlist} }/>}
          </>
        )}>
        </Route>
        {<Route exact path="/settings" render={() => <Settings getSettings={getSettings} />} />}
    </div>
    </Router>
  );
}

export default App;
