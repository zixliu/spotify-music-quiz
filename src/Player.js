import React, { useState } from "react";
import Footer from "./Footer";
//import "./Player.css";

function Player({ spotify }) {
    const [item, dispatch] = useState(null)

    const playSong = (id) => {
    spotify
        .play({
        uris: [`spotify:track:${id}`],
        })
        .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
            console.log(r)
            dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
        });
        });
    };

  return (
    <div className="body">
        <Footer spotify={spotify}/>
    </div>
  );

}

export default Player;






 