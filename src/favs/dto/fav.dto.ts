export class FavDto {
  artists: string[]; 
  albums: string[]; 
  tracks: string[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
