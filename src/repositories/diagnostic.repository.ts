import ExpressUtils from '../utils/express.utils';
import type { IDiagnosticForm, IDiagnosticParams } from '../types/diagnostic';
import { prisma } from '../config/database.config';
import { DiagnosticQuery } from '../queries';
import RegexUtils from '../utils/regex.utils';
import { AppError } from '../core/AppError';
class DiagnosticService {
  private static prisma = prisma;
  public static async getAll(args: IDiagnosticParams) {
    const { offset, limit: take = 10, page } = args || {};
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    const result = await this.prisma.diagnostic.findMany({
      where: {
        appointment: {
          id: args.appointmentId,
          patientId: args.patientId,
        },
      },
      select: DiagnosticQuery.getAll,
      skip,
      take,
    });
    return result;
  }
  public static async getOne(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const diagnostic = await this.prisma.diagnostic.findUnique({
      where: { id },
      select: DiagnosticQuery.getById,
    });
    return diagnostic;
  }
  public static async create(data: IDiagnosticForm) {
    if (!data.appointmentId)
      throw new AppError('appointmentId is required', 400);
    if (!data.doctorId) throw new AppError('doctorId is required', 400);
    const diagnostic = await this.prisma.diagnostic.create({
      data,
    });
    return diagnostic;
  }
  public static async update(id: string, data: Partial<IDiagnosticForm>) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const diagnostic = await this.prisma.diagnostic.update({
      where: { id },
      data,
    });
    return diagnostic;
  }
  public static async delete(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required', 400);
    const diagnostic = await this.prisma.diagnostic.delete({
      where: { id },
    });
    return diagnostic;
  }
}
export default DiagnosticService;
