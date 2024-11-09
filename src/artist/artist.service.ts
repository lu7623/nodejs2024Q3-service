import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: ArtistDto[] = [];

  create(artist: CreateArtistDto) {
    let newTrack = new ArtistDto(artist.name, artist.grammy);
    this.artists.push(newTrack);
    return serviceResponse({ error: false, data: newTrack });
  }

  getAllArtists(): ArtistDto[] {
    return this.artists;
  }

  getArtistById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.artists.find((track) => track.id === id);
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: artist });
  }

  update(id: string, dto: UpdateArtistDto) {
    let artist = this.artists.find((track) => track.id === id);
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
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
    let trackInd = this.artists.findIndex((user) => user.id === id);
    if (trackInd === -1) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    this.artists.splice(trackInd, 1);
    return serviceResponse({ error: false });
  }
}
