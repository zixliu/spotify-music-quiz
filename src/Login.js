import React from 'react'

import { Container } from 'react-bootstrap'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a2832b90b7294696aad3a46ddd1190de&response_type=code&redirect_uri=http://localhost:3000&\
scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const Login = () => {
    return (
        <Container className="d-flex justify-content-center allign-items-center"
        style={{ minHeight: "10vh "}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login with Spotify
            </a>
        </Container>

    )
}

export default Login
