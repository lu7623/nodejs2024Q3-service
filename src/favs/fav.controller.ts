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
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private artistService: FavService) {}

}
