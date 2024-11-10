import { Injectable } from '@nestjs/common';
import { DataBase, dB } from 'src/database/db';
import { Messages } from 'src/utils/messages';
import { parseFavorites } from 'src/utils/parseFavorires';
import { serviceResponse, ServiceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavService {
  private dB: DataBase = dB;

  getAllFavs() {
    return parseFavorites(dB);
  }

  createFavAlbum(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let album = this.dB.albums?.[id];
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.albums.add(id);
    return serviceResponse({ error: false });
  }

  deleteFavAlbum(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let album = this.dB.albums?.[id];
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.albums.delete(id);
    return serviceResponse({ error: false });
  }

  createFavArtist(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.dB.artists?.[id];
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.artists.add(id);
    return serviceResponse({ error: false });
  }

  deleteFavArtist(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let artist = this.dB.artists?.[id];
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.artists.delete(id);
    return serviceResponse({ error: false });
  }

  createFavTrack(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.dB.tracks?.[id];
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.tracks.add(id);
    return serviceResponse({ error: false });
  }

  deleteFavTrack(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.dB.tracks?.[id];
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.dB.favs.tracks.delete(id);
    return serviceResponse({ error: false });
  }
}
