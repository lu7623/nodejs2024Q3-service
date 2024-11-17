import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavModule } from './favs/fav.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavModule],
  providers: [PrismaService],
})
export class AppModule {}
