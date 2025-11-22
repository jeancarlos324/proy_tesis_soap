import { TriageQuery } from '../queries';
import { prisma } from '../config/database.config';
import { ITriageCreateForm, ITriageParams } from '../types/triage';
import ExpressUtils from '../utils/express.utils';
import RegexUtils from '../utils/regex.utils';
import { AppError } from '../core/AppError';
class TriageService {
  private static prisma = prisma;

  static async getAll(args: ITriageParams) {
    const { offset, limit: take = 10, page } = args;
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    const result = await prisma.triage.findMany({
      skip,
      take,
      select: TriageQuery.getAll,
      orderBy: {
        id: 'desc',
      },
    });
    return result;
  }
  static async getAllByPatientId(patientId: string, args: ITriageParams) {
    const { offset, limit: take = 10, page } = args;
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    const triages = await this.prisma.triage.findMany({
      where: { appointment: { patientId } },
      select: TriageQuery.getAll,
      skip,
      take,
    });
    return triages;
  }

  static async getById(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const triage = await this.prisma.triage.findUniqueOrThrow({
      where: { id },
      select: TriageQuery.getById,
    });
    return triage;
  }

  static async create(data: ITriageCreateForm) {
    if (!data.appointmentId)
      throw new AppError('appointmentId is required', 400);
    const triage = await this.prisma.triage.create({
      data,
    });
    return triage;
  }

  static async update(id: string, data: Partial<ITriageCreateForm>) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const triage = await this.prisma.triage.update({
      where: { id },
      data,
    });
    return triage;
  }

  static async delete(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const triage = await this.prisma.triage.delete({
      where: { id },
    });
    return triage;
  }
}
export default TriageService;
