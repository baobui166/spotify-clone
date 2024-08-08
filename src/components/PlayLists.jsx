import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constanst";

function PlayLists() {
  const [{ token, playlists, user }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map((item) => {
        return { name: item.name, id: item.id };
      });

      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: playlists });
    };
    getPlaylistData();
  }, [token, dispatch, user.id]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      selectedPlaylistId: selectedPlaylistId,
    });

    console.log("click change playlist");
  };

  return (
    <Container>
      <ul>
        {playlists?.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default PlayLists;

const Container = styled.div`
  color: white;
  height: 100%;
  overflow: hidden;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-width: 100%;
    overflow: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0.5rem;

      &-thum {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }

    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: white;
      }
    }
  }
`;
