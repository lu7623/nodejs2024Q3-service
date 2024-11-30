import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { DataBase, dB } from 'src/database/db';

@Injectable()
export class AlbumService {
  private dB: DataBase = dB;

  create(album: CreateAlbumDto) {
    const { name, year, artistId } = album;
    const newAlbum = new AlbumDto(name, year, artistId);
    this.dB.albums[newAlbum.id] = newAlbum;
    return serviceResponse({ error: false, data: newAlbum });
  }

  getAllAlbums(): AlbumDto[] {
    return Object.values(this.dB.albums);
  }

  getAlbumById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = this.dB.albums?.[id];
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: album });
  }

  update(id: string, dto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = this.dB.albums?.[id];
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    for (const key in dto) {
      album[key] = dto[key];
    }
    return serviceResponse({ error: false, data: album });
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = this.dB.albums?.[id];
    if (!album) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    delete this.dB.albums[id];
    Object.values(this.dB.tracks)
      .filter((track) => track.albumId === id)
      .forEach((track) => (track.albumId = null));
    this.dB.favs.albums.delete(id);
    return serviceResponse({ error: false });
  }
}
