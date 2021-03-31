import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ token, track }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [track])
  if (!token) return null
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      autoPlay = {true}
      uris={track ? [track.uri] : []}
    />
  )
}