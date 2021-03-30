import './App.css';
import Login from './Login';
import Player from './Player';
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { getTokenFromResponse } from "./spotifyConfig";

var SpotifyWebApi = require('spotify-web-api-node');
const s = new SpotifyWebApi();

function App() {
  const [token, dispatch] = useState(null);
  const [song, setSong] = useState(null);

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
        setSong(response.body.tracks.items[0].track.uri)
    })
    
      
    }
  }, [token, dispatch]); // , [token, dispatch]

  


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
        {token && <Player token={s.getAccessToken()} trackUri={song}/>}
    </div>
  );
}

export default App;
