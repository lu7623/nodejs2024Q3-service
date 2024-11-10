import { DataBase } from "src/database/db";


export const parseFavorites = (dB: DataBase) => {
  const response = { albums: [], artists: [], tracks: [] };
  dB.favs.albums.forEach((id) => response.albums.push(dB.albums[id]));
  dB.favs.artists.forEach((id) => response.artists.push(dB.artists[id]));
  dB.favs.tracks.forEach((id) => response.tracks.push(dB.tracks[id]));
  return response;
};