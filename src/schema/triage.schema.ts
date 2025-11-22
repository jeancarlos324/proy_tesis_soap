import { TriageHandler } from '../handler';

class TriageSchema {
  public static readonly SERVICE_NAME = 'TriageService';
  public static readonly PORT_NAME = 'TriagePort';

  public static get schema() {
    return {
      [this.SERVICE_NAME]: {
        [this.PORT_NAME]: {
          getAll: TriageHandler.getAll,
          getOne: TriageHandler.getOne,
          create: TriageHandler.create,
          update: TriageHandler.update,
          delete: TriageHandler.delete,
        },
      },
    };
  }
}

export default TriageSchema;
