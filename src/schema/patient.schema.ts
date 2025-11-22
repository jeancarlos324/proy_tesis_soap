import { PatientHandler } from '../handler';

class PatientSchema {
  public static readonly SERVICE_NAME = 'PatientService';
  public static readonly PORT_NAME = 'PatientPort';

  public static get schema() {
    return {
      [this.SERVICE_NAME]: {
        [this.PORT_NAME]: {
          getAll: PatientHandler.getAll,
          getOne: PatientHandler.getOne,
          create: PatientHandler.create,
          update: PatientHandler.update,
          delete: PatientHandler.delete,
        },
      },
    };
  }
}

export default PatientSchema;
