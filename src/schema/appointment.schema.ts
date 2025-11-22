// import { AppointmentHandler } from '../handlers/appointment.handler';

import { AppointmentHandler } from '../handler';

class AppointmentSchema {
  public static readonly SERVICE_NAME = 'AppointmentService';
  public static readonly PORT_NAME = 'AppointmentPort';

  public static get schema() {
    return {
      [this.SERVICE_NAME]: {
        [this.PORT_NAME]: {
          getAll: AppointmentHandler.getAll,
          getOne: AppointmentHandler.getOne,
          create: AppointmentHandler.create,
          update: AppointmentHandler.update,
          delete: AppointmentHandler.delete,
        },
      },
    };
  }
}

export default AppointmentSchema;
