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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.artistService.create(createArtistDto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getArtistById(@Param('id') id: string) {
    const res = this.artistService.getArtistById(id);
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
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    const res = this.artistService.update(id, updateArtistDto);
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
    const res = this.artistService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
