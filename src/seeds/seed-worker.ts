import { parentPort, workerData } from 'worker_threads';
import { prisma } from '../config/database.config';

(async () => {
  const { faker } = await import('@faker-js/faker/locale/es_MX');

  const { blockSize } = workerData;
  const rows = [];

  for (let i = 0; i < blockSize; i++) {
    rows.push([
      faker.person.firstName(),
      faker.person.lastName(),
      faker.string.uuid(),
      faker.date.birthdate().toISOString(),
      faker.location.city(),
      faker.person.sex(),
      faker.phone.number(),
      faker.location.state(),
      faker.location.city(),
      faker.location.street(),
      faker.helpers.arrayElement([
        'A+',
        'A-',
        'B+',
        'B-',
        'O+',
        'O-',
        'AB+',
        'AB-',
      ]),
      faker.lorem.sentence(),
      faker.image.avatar(),
      faker.person.jobTitle(),
    ]);
  }

  const COLUMNS = 14;
  const placeholders = rows
    .map(
      (_, i) =>
        `(${Array.from({ length: COLUMNS }, (_, j) => `$${i * COLUMNS + j + 1}`).join(',')})`,
    )
    .join(',');

  const flat = rows.flat();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO "PatientData" (
        "firstName","lastName","nationalIdentity","dateBirth",
        "location","gender","numberPhone","department","province",
        "district","bloodType","physicalHistory","image","job"
      )
      VALUES ${placeholders}
    `,
    ...flat,
  );

  await prisma.$disconnect();
  parentPort?.postMessage('done');
})();
