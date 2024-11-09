import { Injectable } from '@nestjs/common';
import { FavDto } from './dto/fav.dto';


@Injectable()
export class FavService {
  private readonly favorites: FavDto = new FavDto();

}
