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
import { isCreateArtistDto, isUpdateArtistDto } from 'src/utils/typeGuards';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateArtistDto) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.artistService.create(dto);
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
  update(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    if (!isUpdateArtistDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.artistService.update(id, dto);
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
