import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';

import { FavService } from './fav.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('favs')
export class FavController {
  constructor(private favoritesService: FavService) {}

  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getAllTracks() {
    return this.favoritesService.getAllFavs();
  }

  @Post('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createFavAlbum(@Param('id') id: string) {
    return await this.favoritesService.createFavAlbum(id);
  }

  @Delete('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteFavAlbum(@Param('id') id: string) {
    return await this.favoritesService.deleteFavAlbum(id);
  }

  @Post('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createFavArtist(@Param('id') id: string) {
    return await this.favoritesService.createFavArtist(id);
  }

  @Delete('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteFavArtist(@Param('id') id: string) {
    return await this.favoritesService.deleteFavArtist(id);
  }

  @Post('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createFavTrack(@Param('id') id: string) {
    return await this.favoritesService.createFavTrack(id);
  }

  @Delete('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteFavTrack(@Param('id') id: string) {
    return await this.favoritesService.deleteFavTrack(id);
  }
}
