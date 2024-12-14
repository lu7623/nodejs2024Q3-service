import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.prisma.artist.create({ data: newArtist });
  }

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return await this.prisma.artist.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
    await this.prisma.artist.delete({ where: { id } });
    return;
  }
}
