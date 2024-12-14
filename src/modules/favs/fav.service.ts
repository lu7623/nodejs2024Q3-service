import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Messages } from 'src/utils/messages';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavs() {
    const [favAlbums, favArtists, favTracks] = await Promise.all([
      this.prisma.favoriteAlbum.findMany(),
      this.prisma.favoriteArtist.findMany(),
      this.prisma.favoriteTrack.findMany(),
    ]);

    const favAlbumsData = await Promise.all(
      favAlbums.map(async (track) => {
        return await this.prisma.album.findUnique({
          where: { id: track.albumId },
        });
      }),
    );
    const favArtistsData = await Promise.all(
      favArtists.map(async (artist) => {
        return await this.prisma.artist.findUnique({
          where: { id: artist.artistId },
        });
      }),
    );
    const favTracksData = await Promise.all(
      favTracks.map(async (track) => {
        return await this.prisma.track.findUnique({
          where: { id: track.trackId },
        });
      }),
    );
    return {
      albums: favAlbumsData,
      tracks: favTracksData,
      artists: favArtistsData,
    };
  }

  async createFavAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.prisma.favoriteAlbum.create({
      data: { albumId: id },
    });
  }

  async deleteFavAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const album = await this.prisma.favoriteAlbum.findUnique({
      where: { albumId: id },
    });
    if (!album) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favoriteAlbum.delete({ where: { albumId: id } });
    return;
  }

  async createFavArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.prisma.favoriteArtist.create({
      data: { artistId: artist.id },
    });
  }

  async deleteFavArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prisma.favoriteArtist.findUnique({
      where: { artistId: id },
    });
    if (!artist) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favoriteArtist.delete({ where: { artistId: id } });
    return;
  }

  async createFavTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.prisma.favoriteTrack.create({
      data: { trackId: track.id },
    });
  }

  async deleteFavTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.favoriteTrack.findUnique({
      where: { trackId: id },
    });
    if (!track) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favoriteTrack.delete({ where: { trackId: id } });
    return;
  }
}
