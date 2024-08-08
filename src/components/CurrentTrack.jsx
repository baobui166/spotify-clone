import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constanst";

function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentPlaying = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data !== "") {
        const { item } = response.data;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };

        dispatch({
          type: reducerCases.SET_PLAYING,
          currentPlaying: currentPlaying,
        });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };

    getCurrentPlaying();
  }, [token, dispatch]);

  return (
    <Container>
      {currentPlaying && (
        <div className="tracks">
          <div className="tracks__image"></div>
          <div className="tracks__info">
            <h4>{currentPlaying.name}</h4>
            <h6>{currentPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CurrentTrack;

const Container = styled.div`
  .tracks {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      h4 {
        color: white;
      }

      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
