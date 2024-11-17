import { Module } from '@nestjs/common';
import { ArtistController } from './atrist.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
