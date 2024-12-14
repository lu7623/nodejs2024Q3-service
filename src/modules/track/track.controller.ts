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
import { isCreateTrackDto, isUpdateTrackDto } from 'src/utils/typeGuards';
import { ApiResponse } from '@nestjs/swagger';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    type: TrackDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided data format is incorrect',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(@Body() dto: CreateTrackDto) {
    if (!isCreateTrackDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    return await this.trackService.create(dto);
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: [TrackDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: TrackDto,
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
  async getPostById(@Param('id') id: string) {
    return await this.trackService.getTrackById(id);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: TrackDto,
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
  async update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    if (!isUpdateTrackDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    return await this.trackService.update(id, dto);
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async remove(@Param('id') id: string) {
    return await this.trackService.remove(id);
  }
}
