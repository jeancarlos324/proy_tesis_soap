import { DiagnosticHandler } from '../handler';

class DiagnosticSchema {
  public static readonly SERVICE_NAME = 'DiagnosticService';
  public static readonly PORT_NAME = 'DiagnosticPort';

  public static get schema() {
    return {
      [this.SERVICE_NAME]: {
        [this.PORT_NAME]: {
          getAll: DiagnosticHandler.getAll,
          getOne: DiagnosticHandler.getOne,
          create: DiagnosticHandler.create,
          update: DiagnosticHandler.update,
          delete: DiagnosticHandler.delete,
        },
      },
    };
  }
}

export default DiagnosticSchema;
