import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  private readonly albums: AlbumDto[] = [];

  create(album: CreateAlbumDto) {
    const { name, year, artistId } = album;
    let newTrack = new AlbumDto(name, year, artistId);
    this.albums.push(newTrack);
    return serviceResponse({ error: false, data: newTrack });
  }

  getAllTracks(): AlbumDto[] {
    return this.albums;
  }

  getTrackById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let album = this.albums.find((track) => track.id === id);
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: album });
  }

  update(id: string, dto: UpdateAlbumDto) {
    let album = this.albums.find((album) => album.id === id);
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    for (let key in dto) {
      album[key] = dto[key];
    }
    return serviceResponse({ error: false, data: album });
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let albumInd = this.albums.findIndex((user) => user.id === id);
    if (albumInd === -1) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    this.albums.splice(albumInd, 1);
    return serviceResponse({ error: false });
  }
}
