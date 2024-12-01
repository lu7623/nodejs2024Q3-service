import { Injectable } from '@nestjs/common';
import { serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(track: CreateTrackDto) {
    return await this.prisma.track.create({ data: track });
  }

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: track });
  }

  async update(id: string, dto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    await this.prisma.track.update({
      where: { id: id },
      data: {
        ...track,
        ...dto,
      },
    });
    return serviceResponse({ error: false, data: track });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    await this.prisma.track.delete({ where: { id: id } });
    return serviceResponse({ error: false });
  }
}
