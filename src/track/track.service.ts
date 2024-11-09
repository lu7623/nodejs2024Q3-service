import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { DataBase, dB } from 'src/database/db';

@Injectable()
export class TrackService {
  private dB: DataBase = dB;

  create(track: CreateTrackDto) {
    const { name, duration, albumId, artistId } = track;
    let newTrack = new TrackDto(name, duration, artistId, albumId);
    this.dB.tracks[newTrack.id] = newTrack;
    return serviceResponse({ error: false, data: newTrack });
  }

  getAllTracks(): TrackDto[] {
    return Object.values(this.dB.tracks);
  }

  getTrackById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.dB.tracks?.[id];
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: track });
  }

  update(id: string, dto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.dB.tracks?.[id];
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    for (let key in dto) {
      track[key] = dto[key];
    }
    return serviceResponse({ error: false, data: track });
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.dB.tracks?.[id];
    if (!track) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    delete this.dB.artists[id];
    return serviceResponse({ error: false });
  }
}
