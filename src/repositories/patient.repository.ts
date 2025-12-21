import RegexUtils from '../utils/regex.utils';
import { prisma } from '../config/database.config';
import { PatientQuery } from '../queries';
import { IPatientCreateForm, IPatientParams } from '../types/patient';
import ExpressUtils from '../utils/express.utils';
import { AppError } from '../core/AppError';
import pc from 'picocolors';

export default class PatientService {
  private static prisma = prisma;
  static async getAll(args: IPatientParams) {
    const filters = [];
    //------------------- Response time test -------------------------------
    const startTimeRes = process.hrtime();
    //----------------------------------------------------------------------
    const { offset, limit: take = 10, page } = args || {};
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    if (args.lastName)
      filters.push({
        lastName: { contains: args.lastName, mode: 'insensitive' as const },
      });

    if (args.firstName)
      filters.push({
        firstName: { contains: args.firstName, mode: 'insensitive' as const },
      });

    if (args.nationalIdentity)
      filters.push({
        nationalIdentity: {
          contains: args.nationalIdentity,
          mode: 'insensitive' as const,
        },
      });

    const patients = await this.prisma.patientData.findMany({
      where: filters.length ? { OR: filters } : {},
      select: PatientQuery.getAll,
      take,
      skip,
    });
    //------------------- Response time test -------------------------------
    const endTimeRes = process.hrtime(startTimeRes);
    console.log(
      pc.bgGreen(` Response time: ${endTimeRes[0] * 1e9 + endTimeRes[1]}`),
    );
    //----------------------------------------------------------------------
    return patients;
  }
  static async getOne(id: string) {
    // if (!RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    //------------------- Response time test -------------------------------
    const startTimeRes = process.hrtime();
    //----------------------------------------------------------------------
    const patient = await this.prisma.patientData.findUnique({
      where: { id },
      select: PatientQuery.getById,
    });
    //------------------- Response time test -------------------------------
    const endTimeRes = process.hrtime(startTimeRes);
    console.log(
      pc.bgGreen(` Response time: ${endTimeRes[0] * 1e9 + endTimeRes[1]}`),
    );
    //----------------------------------------------------------------------

    return patient;
  }

  static async create({ patient: data }: IPatientCreateForm) {
    const patient = await this.prisma.patientData.create({ data });
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
