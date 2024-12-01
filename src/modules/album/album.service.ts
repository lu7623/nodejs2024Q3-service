import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(album: CreateAlbumDto) {
    const { name, year, artistId } = album;
    const newAlbum = new AlbumDto(name, year, artistId);
    await this.prisma.album.create({ data: newAlbum });
    return serviceResponse({ error: false, data: newAlbum });
  }

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return await this.prisma.album.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
    await this.prisma.album.delete({
      where: { id },
    });
    return;
  }
}
