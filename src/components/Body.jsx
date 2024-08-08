import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constanst";

function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  //GET SONG FROM PLAYLIST API
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      //OVERRIDE DATA
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map((track) => ({
          id: track.track.id,
          name: track.track.name,
          artist: track.track.artists[0].name,
          image: track.track.album.images[2].url,
          album: track.track.album.name,
          duration: track.track.duration_ms,
        })),
      };

      dispatch({
        type: reducerCases.SET_PLAYLIST,
        selectedPlaylist: selectedPlaylist,
      });
    };

    // CHECK ID AND TOKEN FOR RUN FUNCTION
    if (token && selectedPlaylistId) {
      getInitialPlaylist();
    }
  }, [token, dispatch, selectedPlaylistId]);

  // PLAY SONG
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  // TRANFERS SECOND TO MUNITE
  const msToMiunteAndSecond = (ms) => {
    const minute = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return minute + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="Playlist" />
            </div>
            <div className="detail">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="row">
                <span>#</span>
              </div>
              <div className="row">
                <span>TITLE</span>
              </div>
              <div className="row">
                <span></span>
              </div>
              <div className="row">
                <span>ALBUM</span>
              </div>
              <div className="row">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks &&
                selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artist,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    },
                    index
                  ) => {
                    return (
                      <div
                        className="row"
                        key={id}
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artist,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                      >
                        <div className="col">{index + 1}</div>
                        <div className="col detail">
                          <img src={image} alt="track" />
                        </div>
                        <div className="col info">
                          <span className="name">{name}</span>
                          <span className="artist">{artist}</span>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col duration">
                          <span>{msToMiunteAndSecond(duration)}</span>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Body;

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.7) 0px 5p -12px;
      }
    }

    .detail {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;

      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 0.3fr 2fr 1fr 1fr;
      color: #dddcdd;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${(props) =>
        props.headerBackground ? "#000000dc" : "none"};

      .row:last-child {
        display: flex;
        justify-content: end;
        margin-right: 12px;
      }
    }

    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;

      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 0.3fr 2fr 1fr 1fr;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 60px;
          }
        }

        .detail {
          display: flex;
          gap: 1rem;
        }
        .info {
          display: flex;
          align-items: start;
          flex-direction: column;
        }

        .duration {
          display: flex;
          justify-content: end;
        }
      }
    }
  }
`;
