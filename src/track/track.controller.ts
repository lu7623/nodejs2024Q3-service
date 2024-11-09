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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.trackService.create(createTrackDto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  async getAllUsers() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getPostById(@Param('id') id: string) {
    const res = this.trackService.getTrackById(id);
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
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const res = this.trackService.update(id, updateTrackDto);
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
    const res = this.trackService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
