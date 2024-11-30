import { Module } from '@nestjs/common';
import { FavController } from './fav.controller';
import { FavService } from './fav.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FavController],
  providers: [FavService, PrismaService],
})
export class FavModule {}
