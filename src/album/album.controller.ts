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



@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    if (!dto.name || !dto.year) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.albumService.create(dto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  async getAllUsers() {
    return this.albumService.getAllTracks();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getPostById(@Param('id') id: string) {
    const res = this.albumService.getTrackById(id);
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
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
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
