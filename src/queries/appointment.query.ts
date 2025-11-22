import { Prisma } from '../generated/prisma';
import type { Prisma as PrismaType } from '../config/database.config';
class AppointmetQuery {
  static get getAll() {
    const query = Prisma.validator<PrismaType.AppointmentSelect>()({
      id: true,
      createdAt: true,
      status: true,
      appointmentDate: true,
      doctor: true,
      diagnostic: true,
      triage: true,
      patient: true,
      servicesDesc: true,
      totalServices: true,
      recipe: true,
    });
    return query;
  }

  static get getById() {
    const query = Prisma.validator<PrismaType.AppointmentSelect>()({
      id: true,
      createdAt: true,
      status: true,
      appointmentDate: true,
      doctor: true,
      diagnostic: true,
      triage: true,
      patient: true,
      servicesDesc: true,
      totalServices: true,
      recipe: true,
    });
    return query;
  }
}

export default AppointmetQuery;
