import { Injectable } from '@nestjs/common';
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
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: album });
  }

  async update(id: string, dto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    await this.prisma.album.update({
      where: { id: id },
      data: { ...album, ...dto },
    });
    return serviceResponse({ error: false, data: album });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    this.prisma.album.delete({
      where: { id: id },
    });

    return serviceResponse({ error: false });
  }
}
