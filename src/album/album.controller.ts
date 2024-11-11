import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Header,
} from '@nestjs/common';

import { Messages } from 'src/utils/messages';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { isCreateAlbumDto, isUpdateAlbumDto } from 'src/utils/typeGuards';
import { ApiResponse } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    type: AlbumDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided data format is incorrect',
  })
  async create(@Body() dto: CreateAlbumDto) {
    if (!isCreateAlbumDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.albumService.create(dto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: [AlbumDto],
  })
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: AlbumDto,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  getAlbumById(@Param('id') id: string) {
    const res = this.albumService.getAlbumById(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return res.data;
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: AlbumDto,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided data format is incorrect',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    if (!isUpdateAlbumDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.albumService.update(id, dto);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return res.data;
  }

  @Delete(':id')
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
  remove(@Param('id') id: string) {
    const res = this.albumService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
