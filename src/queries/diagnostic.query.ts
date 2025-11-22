import { Prisma } from '../generated/prisma';
import type { Prisma as PrismaType } from '../config/database.config';
class DiagnosticQuery {
  static get getAll() {
    const queries = Prisma.validator<PrismaType.DiagnosticSelect>()({
      appointmentId: true,
      anamnesis: true,
      appointment: true,
      diagnostic: true,
      observations: true,
      clinicalExam: true,
      doctor: true,
      createdAt: true,
      id: true,
    });
    return queries;
  }

  static get getById() {
    const queries = Prisma.validator<PrismaType.DiagnosticSelect>()({});
    return queries;
  }
}
export default DiagnosticQuery;
