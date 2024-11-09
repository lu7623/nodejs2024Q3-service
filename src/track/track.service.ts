import { Injectable } from '@nestjs/common';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { userWithoutPassword } from 'src/utils/userWithoutPassword';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  private readonly tracks: TrackDto[] = [];

  create(track: CreateTrackDto) {
    const { name, duration, albumId, artistId } = track;
    let newTrack = new TrackDto(name, duration, artistId, albumId);
    this.tracks.push(newTrack);
    return serviceResponse({ error: false, data: newTrack });
  }

  getAllTracks(): TrackDto[] {
    return this.tracks;
  }

  getTrackById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let track = this.tracks.find((track) => track.id === id);
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: track });
  }

  update(id: string, dto: UpdateTrackDto) {
    let track = this.tracks.find((track) => track.id === id);
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
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
    let trackInd = this.tracks.findIndex((user) => user.id === id);
    if (trackInd === -1) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    this.tracks.splice(trackInd, 1);
    return serviceResponse({ error: false });
  }
}
