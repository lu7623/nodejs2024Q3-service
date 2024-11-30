import { Module } from '@nestjs/common';
import { ArtistController } from './atrist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
