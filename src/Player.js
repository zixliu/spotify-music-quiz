import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ token, track }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [track])

  console.log("acess token")
  if (!token) return null
  console.log("no access token")
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={track ? [track.uri] : []}
    />
  )
}