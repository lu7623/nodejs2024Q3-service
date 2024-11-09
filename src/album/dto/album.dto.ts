import { v4 as uuid } from 'uuid';

export class AlbumDto {
  id: string; 
  name: string;
  year: number;
  artistId: string | null; 
  constructor(
    name: string,
    year: number,
    artistId?: string,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId || null;
    this.year = year;
  }
}
