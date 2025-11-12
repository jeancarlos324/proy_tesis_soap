import {
  IAppointmentCreateForm,
  IAppointmentParams,
} from '../types/appointment';
class AppointmentService {
  public static get schema() {
    return {
      AppointmentService: {
        AppointmentPort: {
          getAll: this.getAll.bind(this),
          getOne: this.getOne.bind(this),
          create: this.create.bind(this),
          update: this.update.bind(this),
          delete: this.delete.bind(this),
        },
      },
    };
  }
  static async getAll(args: IAppointmentParams) {
    console.log('📋 Fetching appointments:', args);
    return { appointments: [] };
  }

  static async getOne({ id }: { id: string }) {
    console.log('📋 Fetching appointment:', id);
    return { id, patient: 'Jean', date: '2025-11-15' };
  }

  static async create(data: IAppointmentCreateForm) {}

  static async update({
    id,
    ...data
  }: Partial<IAppointmentCreateForm> & { id: string }) {
    return { id, data };
  }

  static async delete({ id }: { id: string }) {}
}
export default AppointmentService;
