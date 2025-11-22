import RegexUtils from '../utils/regex.utils';
import { prisma } from '../config/database.config';
import { PatientQuery } from '../queries';
import { IPatientCreateForm, IPatientParams } from '../types/patient';
import ExpressUtils from '../utils/express.utils';
import { AppError } from '../core/AppError';

export default class PatientService {
  private static prisma = prisma;
  static getAll(args: IPatientParams) {
    const { offset, limit: take = 10, page } = args || {};
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    const patients = this.prisma.patientData.findMany({
      where: {
        OR: [
          { lastName: { contains: args.lastName, mode: 'insensitive' } },
          { firstName: { contains: args.firstName, mode: 'insensitive' } },
          {
            nationalIdentity: {
              contains: args.nationalIdentity,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: PatientQuery.getAll,
      take,
      skip,
    });
    return patients;
  }
  static async getOne(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const patient = await this.prisma.patientData.findUnique({
      where: { id },
      select: PatientQuery.getById,
    });
    return patient;
  }

  static async create(data: IPatientCreateForm) {
    const patient = await this.prisma.patientData.create({
      data,
    });
    return patient;
  }

  static async update(id: string, data: Partial<IPatientCreateForm>) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const patient = await this.prisma.patientData.update({
      where: { id },
      data,
    });
    return patient;
  }

  static async delete(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const patient = await this.prisma.patientData.delete({
      where: { id },
    });
    return patient;
  }
}
