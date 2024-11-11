import { AlbumDto } from 'src/album/dto/album.dto';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';
import { UserDto } from 'src/user/dto/user.dto';

export interface DataBase {
  users: { [id: string]: UserDto };
  tracks: { [id: string]: TrackDto };
  artists: { [id: string]: ArtistDto };
  albums: { [id: string]: AlbumDto };
  favs: {
    artists: Set<string>;
    albums: Set<string>;
    tracks: Set<string>;
  };
}

export const dB: DataBase = {
  users: {},
  tracks: {},
  artists: {},
  albums: {},
  favs: {
    albums: new Set(),
    artists: new Set(),
    tracks: new Set(),
  },
};
