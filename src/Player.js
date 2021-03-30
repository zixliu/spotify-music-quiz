import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ token, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

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
      uris={trackUri ? [trackUri] : []}
    />
  )
}