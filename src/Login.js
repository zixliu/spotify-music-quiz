import React from "react";
import "./Login.css";
import { accessUrl } from "./spotifyConfig";

function Login() {
  return (
    <div className="login">
      <img
        src="https://miro.medium.com/max/1400/1*Od9Evb7e9yCIHf2s6Sl7kQ.gif"
        alt=""
      />
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;