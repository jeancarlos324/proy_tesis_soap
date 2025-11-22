import { soapErrorHandler } from '../core/soapErrorHandler';
import { AppointmentService } from '../services';
import {
  IAppointmentCreateForm,
  IAppointmentParams,
  IAppointmentUpdateForm,
} from '../types/appointment';

class AppointmentHandler {
  private static handler = soapErrorHandler;

  public static getAll = this.handler<IAppointmentParams, unknown>(
    async (args) => await AppointmentService.getAll(args),
  );

  public static getOne = this.handler<{ id: string }, unknown>(async ({ id }) =>
    AppointmentService.getOne({ id }),
  );
  public static create = this.handler<IAppointmentCreateForm, unknown>(
    async (args) => await AppointmentService.create(args),
  );
  public static update = this.handler<IAppointmentUpdateForm, unknown>(
    async (args) => await AppointmentService.update(args),
  );
  public static delete = this.handler<{ id: string }, unknown>(async ({ id }) =>
    AppointmentService.delete({ id }),
  );
}
export default AppointmentHandler;
