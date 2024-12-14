import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return await this.prisma.track.update({
      where: { id: id },
      data: {
        ...track,
        ...dto,
      },
    });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.delete({ where: { id: id } });
    return;
  }
}
