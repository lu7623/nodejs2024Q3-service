import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavModule } from './modules/favs/fav.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    AuthModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavModule,
    UserModule,
    LoggerModule,
  ],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
