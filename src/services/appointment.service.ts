import { AppointmentRepository } from '../repositories';
import {
  IAppointmentCreateForm,
  IAppointmentParams,
  IAppointmentUpdateForm,
} from '../types/appointment';
class AppointmentService {
  static async getAll(args: IAppointmentParams) {
    const response = await AppointmentRepository.getAll(args);
    return response;
  }

  static async getOne({ id }: { id: string }) {
    const response = await AppointmentRepository.getOne(id);
    return response;
  }

  static async create(data: IAppointmentCreateForm) {
    const response = await AppointmentRepository.create(data);
    return response;
  }

  static async update({ id, ...data }: IAppointmentUpdateForm) {
    const response = await AppointmentRepository.update(id, data);
    return { id, data: response };
  }

  static async delete({ id }: { id: string }) {
    const response = await AppointmentRepository.delete(id);
    return { id: response.id };
  }
}
export default AppointmentService;
