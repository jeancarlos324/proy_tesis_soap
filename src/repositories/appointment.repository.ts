import { prisma } from '../config/database.config';
import { AppError } from '../core/AppError';
import { AppointmentQuery } from '../queries';
import {
  IAppointmentCreateForm,
  IAppointmentParams,
} from '../types/appointment';
import { RegexUtils } from '../utils';
import ExpressUtils from '../utils/express.utils';
class AppointmentRepository {
  private static prisma = prisma;
  static async getAll(args: IAppointmentParams) {
    const { offset, limit: take = 10, page } = args || {};
    const skip = ExpressUtils.pagination({ limit: take, offset, page });
    const appointments = await this.prisma.appointment.findMany({
      where: {
        createdAt: { gte: args.startDate, lte: args.endDate },
        patientId: args.patientId,
        doctorId: args.doctorId,
        status: args.status,
      },
      select: AppointmentQuery.getAll,
      skip,
      take,
    });
    return appointments;
  }

  static async getOne(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required');
    const appointment = await this.prisma.appointment.findUniqueOrThrow({
      where: { id },
      select: AppointmentQuery.getById,
    });
    if (!appointment) throw new AppError('appointment not found');
    return appointment;
  }
  static async create(data: IAppointmentCreateForm) {
    if (!data) throw new AppError('data is required');
    const appointment = await this.prisma.appointment.create({ data });
    return appointment;
  }

  static async update(id: string, data: Partial<IAppointmentCreateForm>) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required');
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data,
    });
    return appointment;
  }

  static async delete(id: string) {
    if (!id || RegexUtils.uuid(id)) throw new AppError('id is required');
    const appointment = await this.prisma.appointment.delete({
      where: { id },
    });
    return appointment;
  }
}

export default AppointmentRepository;
