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
      where: { id },
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
      where: { id },
    });
    if (!album) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
   const res = await this.prisma.album.update({
      where: { id },
      data: dto,
    });
    return serviceResponse({ error: false, data: res });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
    await this.prisma.album.delete({
      where: { id },
    });


    return serviceResponse({ error: false });
  }
}
