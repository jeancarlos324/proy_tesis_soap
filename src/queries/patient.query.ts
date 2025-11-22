import { Prisma } from '../generated/prisma';
import type { Prisma as PrismaType } from '../config/database.config';
import DiagnosticQuery from './diagnostic.query';
import TriageQuery from './triage.query';

export default class PatientQuery {
  static get getAll() {
    const query = Prisma.validator<PrismaType.PatientDataSelect>()({
      id: true,
      firstName: true,
      lastName: true,
      bloodType: true,
      dateBirth: true,
      department: true,
      district: true,
      gender: true,
      nationalIdentity: true,
      physicalHistory: true,
      job: true,
      numberPhone: true,
      location: true,
      province: true,
      appointments: {
        select: {
          id: true,
          createdAt: true,
          doctor: { select: { id: true, cieCod: true } },
          diagnostic: {
            select: DiagnosticQuery.getAll,
          },
          triage: {
            select: TriageQuery.getAll,
          },
          recipe: {
            select: {
              observations: true,
              id: true,
              createdAt: true,
              doctorId: true,
              recipesDesc: true,
            },
          },
          medicalTest: {
            select: {
              id: true,
              testDate: true,
              observations: true,
              resultText: true,
              resultValue: true,
            },
          },
        },
      },
    });
    return query;
  }
  static get getById() {
    const query = Prisma.validator<PrismaType.PatientDataSelect>()({
      id: true,
      firstName: true,
      lastName: true,
      bloodType: true,
      dateBirth: true,
      department: true,
      district: true,
      gender: true,
      nationalIdentity: true,
      physicalHistory: true,
      job: true,
      numberPhone: true,
      appointments: {
        include: {
          doctor: true,
          medicalTest: true,
          diagnostic: true,
          recipe: true,
          triage: true,
        },
      },
    });
    return query;
  }
}
