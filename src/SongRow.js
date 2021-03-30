import React from "react";
//import "./SongRow.css";

function SongRow({ track, playSong }) {
  console.log(track);
  return (
    <div className="songRow" onClick={() => playSong(track.id)}>
      <div className="songRow__info">
        <h1>{}</h1>
        <p>
         
        </p>
      </div>
    </div>
  );
}

export default SongRow;