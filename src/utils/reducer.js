import { reducerCases } from "./Constanst";

export const intialState = {
  token: null,
  playlists: [],
  user: {},
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
  selectedPlaylist: null,
  currentPlaying: null,
  playerState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return { ...state, token: action.token };
    case reducerCases.SET_PLAYLISTS:
      return { ...state, playlists: action.playlists };
    case reducerCases.SET_USER:
      return { ...state, user: action.user };
    case reducerCases.SET_PLAYLIST:
      return { ...state, selectedPlaylist: action.selectedPlaylist };
    case reducerCases.SET_PLAYING:
      return { ...state, currentPlaying: action.currentPlaying };
    case reducerCases.SET_PLAYLIST_ID:
      return { ...state, selectedPlaylistId: action.selectedPlaylistId };
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
