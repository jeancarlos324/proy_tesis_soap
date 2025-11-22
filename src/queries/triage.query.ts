import { Prisma } from '../generated/prisma';
import type { Prisma as PrismaType } from '../config/database.config';

export default class TriageQuery {
  static get getById() {
    const query = Prisma.validator<PrismaType.TriageSelect>()({
      id: true,
      weight: true,
      height: true,
      temperature: true,
      heartRate: true,
      bloodPressure: true,
      daysSick: true,
      sature: true,
      observations: true,
      appointmentId: true,
      ipss: true,
    });
    return query;
  }

  static get getAll() {
    const query = Prisma.validator<PrismaType.TriageSelect>()({
      id: true,
      weight: true,
      height: true,
      temperature: true,
      heartRate: true,
      bloodPressure: true,
      daysSick: true,
      sature: true,
      observations: true,
      appointmentId: true,
      ipss: true,
    });
    return query;
  }
}
