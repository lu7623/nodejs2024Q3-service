import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, TrackModule, ArtistModule]
})
export class AppModule {}
