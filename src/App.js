import './App.css';
import Login from './Login';
import Player from './Player';
import Menu from './Menu';
import GameWindow from './GameWindow';
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
  const [numberCorrectSong, setNumberCorrectSong] = useState(0)
  const [numberCorrectArtist, setNumberCorrectArtist] = useState(0)
  const [finalResult, setFinalResult] = useState("")


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

      setNewPlaylist("3YA2HwKlRVBeHgIPB5FW2o", 3)
    }
  }, [token, dispatch]); // , [token, dispatch]

  function setNewPlaylist(playlistId, numberOfTracks) {
    s.getPlaylist(playlistId,{limit: 100}).then((response) => {
      let trackShuffled = shuffleArray(response.body.tracks.items)

      if (trackShuffled.length > numberOfTracks) {
        trackShuffled = trackShuffled.slice(0, numberOfTracks)
      }
      setTrackList(trackShuffled)
    })
  }

  function resetGame() {
    setTrackIndex(0)
    setNumberCorrectSong(0)
    setNumberCorrectArtist(0)
    changeGameState(false)
  }

  // sets answerCorrect to true if the user guesses the correct title of the track.
  // the function is passed down to the InputField-component where it gets the value
  const setAnswerCorrectSong = (answerCorrectSong) => {
    if (answerCorrectSong === true) {
      console.log(answerCorrectSong)
      setNumberCorrectSong((v) => v + 1)
    }
    else {
      console.log(answerCorrectSong)
    }
  }

  const setAnswerCorrectArtist = (answerCorrectArtist) => {
    if (answerCorrectArtist === true) {
      console.log(answerCorrectArtist)
      setNumberCorrectArtist((v) => v + 1)
    }
    else {
      console.log(answerCorrectArtist)
    }
  }


  function moveToNextTrackInTracklist() {
    let maxTrackIndex = trackList.length - 1
    if (trackIndex === maxTrackIndex) {
      console.log("Reached end of playlist!")
      setFinalResult("The final result is " + numberCorrectSong + "/" + trackList.length + " songs and " + numberCorrectArtist + "/" + trackList.length + " artists")
      resetGame()
    } else {
      setTrackIndex((v) => v + 1)
    }
  }

  const changeGameState = (gameState) => {
      setGameState(gameState)
  }
  
  const getSettings = (numberOfTracks, playlistId) => {
    setNewPlaylist(playlistId, numberOfTracks)
  }

  return (
    <Router>
    <div className="app">
        <Route path='/' exact render={() => ( // use exact render to avoid showing settings- and play-buttons on settings-page
          <>
            {!token && <Login />}
            {console.log(trackList)}
            { token && gameActive && trackList && 
              <Player token={s.getAccessToken()} track={trackList[trackIndex].track} /> 
            }
            { token && gameActive && trackList && 
              <GameWindow track={trackList[trackIndex].track} setAnswerCorrectSong={setAnswerCorrectSong} setAnswerCorrectArtist={setAnswerCorrectArtist} numberOfTracks={trackList.length} totalCorrectSongs={numberCorrectSong} totalCorrectArtists={numberCorrectArtist} moveToNextTrack={moveToNextTrackInTracklist}/>
            }
            { token && !gameActive && <Menu changeGameState={changeGameState} message={finalResult}/>}
          </>
        )}>
        </Route>
        {<Route exact path="/settings" render={() => <Settings getSettings={getSettings} />} />}
    </div>
    </Router>
  );
}

export default App;
