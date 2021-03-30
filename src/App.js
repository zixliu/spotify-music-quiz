import './App.css';
import Login from './Login';
import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { getTokenFromResponse } from "./spotifyConfig";

var SpotifyWebApi = require('spotify-web-api-node');
const s = new SpotifyWebApi();

function App() {
  // const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      // dispatch({
      //   type: "SET_TOKEN",
      //   token: _token,
      // });

      s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
        console.log("omg, what is this " + response)
      );
      
    }
  }); // , [token, dispatch]

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Hello</h1>
    //   </header>
    // </div>
    // {!token && <Login />}
      // {token && <Player spotify={s} />}
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
