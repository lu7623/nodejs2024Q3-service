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
import { ApiResponse } from '@nestjs/swagger';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    type: ArtistDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided data format is incorrect',
  })
  async create(@Body() dto: CreateArtistDto) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = await this.artistService.create(dto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: [ArtistDto],
  })
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: ArtistDto,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async getArtistById(@Param('id') id: string) {
    const res = await this.artistService.getArtistById(id);
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
    type: ArtistDto,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async pdate(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    if (!isUpdateArtistDto(dto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = await this.artistService.update(id, dto);
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
  async remove(@Param('id') id: string) {
    const res = await this.artistService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
