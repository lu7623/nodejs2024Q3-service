import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { DataBase, dB } from 'src/database/db';

@Injectable()
export class ArtistService {
  private dB: DataBase = dB;

  create(artist: CreateArtistDto) {
    let newArtist = new ArtistDto(artist.name, artist.grammy);
    this.dB.artists[newArtist.id] = newArtist;
    return serviceResponse({ error: false, data: newArtist });
  }

  getAllArtists(): ArtistDto[] {
    return Object.values(this.dB.artists);
  }

  getArtistById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.dB.artists?.[id];
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: artist });
  }

  update(id: string, dto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.dB.artists?.[id];
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    for (let key in dto) {
      artist[key] = dto[key];
    }
    return serviceResponse({ error: false, data: artist });
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.dB.artists?.[id];
    if (!artist) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    delete this.dB.artists[id];
    Object.values(this.dB.tracks).filter(track => track.artistId === id).forEach(track => track.artistId = null);
    Object.values(this.dB.albums).filter(album => album.artistId === id).forEach(album => album.artistId = null)
    return serviceResponse({ error: false });
  }
}
