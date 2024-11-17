import { Injectable } from '@nestjs/common';
import { serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(artist: CreateArtistDto) {
    const newArtist = new ArtistDto(artist.name, artist.grammy);
    await this.prisma.artist.create({ data: newArtist });
    return serviceResponse({ error: false, data: newArtist });
  }

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: artist });
  }

  async update(id: string, dto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    this.prisma.artist.update({
      where: { id: id },
      data: { ...artist, ...dto },
    });
    return serviceResponse({ error: false, data: artist });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    await this.prisma.artist.delete({ where: { id: id } });

    return serviceResponse({ error: false });
  }
}
