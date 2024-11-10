import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Header,
} from '@nestjs/common';

import { Messages } from 'src/utils/messages';
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private favoritesService: FavService) {}

  @Get()
  @Header('content-type', 'application/json')
  getAllTracks() {
    return this.favoritesService.getAllFavs();
  }

  @Post('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async createFavAlbum(@Param('id') id: string) {
    const res = this.favoritesService.createFavAlbum(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavAlbum(@Param('id') id: string) {
    const res = this.favoritesService.deleteFavAlbum(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async createFavArtist(@Param('id') id: string) {
    const res = this.favoritesService.createFavArtist(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavArtist(@Param('id') id: string) {
    const res = this.favoritesService.deleteFavArtist(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async createFavTrack(@Param('id') id: string) {
    const res = this.favoritesService.createFavTrack(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavTrack(@Param('id') id: string) {
    const res = this.favoritesService.deleteFavTrack(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(
        Messages.NotFound,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
