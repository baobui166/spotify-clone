import React from "react";
import styled from "styled-components";

function Login() {
  function handleClick() {
    const clientID = "0d879b87264348fd85c1564dac802199";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      " user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];

    window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  }
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Connection to spotify</button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1db954;
  gap: 5rem;

  img {
    height: 20vh;
  }

  button {
    border: none;
    outline: none;
    padding: 1rem 5rem;
    border-radius: 5rem;
    background: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
