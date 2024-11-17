import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

const seedBase = async () => {
  await prisma.user.create({
    data: {
      id: uuid(),
      login: 'John Doe',
      password: 'password',
    },
  });
  await prisma.artist.create({
    data: {
      name: 'David Bowie',
      id: '58423dc6-d6ff-4e5e-bf96-e30a9642390d',
      grammy: true,
    },
  });
  await prisma.album.create({
    data: {
      id: 'eaaeab23-c5c5-4c73-b78e-fcdf6f9cd9a6',
      name: 'Station to Station',
      year: 1976,
      artistId: '58423dc6-d6ff-4e5e-bf96-e30a9642390d',
    },
  });
  await prisma.track.create({
    data: {
      id: '24b01102-8a6c-40c4-8b55-29950e109b7c',
      duration: 123,
      name: 'Golden Years',
      artistId: '58423dc6-d6ff-4e5e-bf96-e30a9642390d',
      albumId: 'eaaeab23-c5c5-4c73-b78e-fcdf6f9cd9a6',
    },
  });
  await prisma.$disconnect();
};

seedBase();
