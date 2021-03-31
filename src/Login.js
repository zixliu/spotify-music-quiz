import React from "react";
import "./Login.css";
import { accessUrl } from "./spotifyConfig";

function Login() {
  return (
    <div className="login">
      <img
        src="http://cdn.lowgif.com/medium/501ab4c23e198d0f-.gif"
        alt=""
      />
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;