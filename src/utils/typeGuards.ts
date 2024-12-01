import { CreateAlbumDto } from 'src/modules/album/dto/createAlbum.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/updateAlbum.dto';
import { CreateArtistDto } from 'src/modules/artist/dto/createArtist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/updateArtist.dto';
import { CreateTrackDto } from 'src/modules/track/dto/createTrack.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/updateTrack.dto';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { UpdateUserDto } from 'src/modules/user/dto/updateUser.dto';

export function isCreateUserDto(data: object): data is CreateUserDto {
  const checkData = data as CreateUserDto;
  return (
    typeof checkData?.login === 'string' &&
    checkData.login.length > 0 &&
    typeof checkData?.password === 'string' &&
    checkData.password.length > 0
  );
}

export function isUpdateUserDto(data: object): data is UpdateUserDto {
  const checkData = data as UpdateUserDto;
  return (
    typeof checkData?.oldPassword === 'string' &&
    checkData.oldPassword.length > 0 &&
    typeof checkData?.newPassword === 'string' &&
    checkData.newPassword.length > 0
  );
}

export function isCreateTrackDto(data: object): data is CreateTrackDto {
  const checkData = data as CreateTrackDto;
  return (
    typeof checkData?.name === 'string' &&
    checkData.name.length > 0 &&
    typeof checkData?.duration === 'number'
  );
}

export function isUpdateTrackDto(data: object): data is UpdateTrackDto {
  const checkData = data as UpdateTrackDto;
  const { name, duration, albumId, artistId } = checkData;
  return (
    (typeof name === 'string' || typeof name === 'undefined') &&
    (typeof duration === 'number' || typeof duration === 'undefined') &&
    (typeof albumId === 'string' ||
      typeof albumId === 'undefined' ||
      albumId === null) &&
    (typeof artistId === 'string' ||
      typeof artistId === 'undefined' ||
      artistId === null)
  );
}

export function isCreateAlbumDto(data: object): data is CreateAlbumDto {
  const checkData = data as CreateAlbumDto;
  return (
    typeof checkData?.name === 'string' &&
    checkData.name.length > 0 &&
    typeof checkData?.year === 'number'
  );
}

export function isUpdateAlbumDto(data: object): data is UpdateAlbumDto {
  const checkData = data as UpdateAlbumDto;
  const { name, year, artistId } = checkData;
  return (
    (typeof name === 'string' || typeof name === 'undefined') &&
    (typeof year === 'number' || typeof year === 'undefined') &&
    (typeof artistId === 'string' ||
      typeof artistId === 'undefined' ||
      artistId === null)
  );
}

export function isCreateArtistDto(data: object): data is CreateArtistDto {
  const checkData = data as CreateArtistDto;
  return (
    typeof checkData?.name === 'string' &&
    checkData.name.length > 0 &&
    typeof checkData?.grammy === 'boolean'
  );
}

export function isUpdateArtistDto(data: object): data is UpdateArtistDto {
  const checkData = data as UpdateArtistDto;
  const { name, grammy } = checkData;
  return (
    (typeof name === 'string' || typeof name === 'undefined') &&
    (typeof grammy === 'boolean' || typeof grammy === 'undefined')
  );
}
