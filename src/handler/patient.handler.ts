import { AppError } from '../core/AppError';
import { soapErrorHandler } from '../core/soapErrorHandler';
import { PatientService } from '../services';
import {
  IPatientCreateForm,
  IPatientParams,
  IPatientUpdateForm,
} from '../types/patient';
import { ExpressUtils } from '../utils';

class PatientHandler {
  private static handler = soapErrorHandler;
  public static getAll = this.handler<IPatientParams, unknown>(async (args) => {
    const params = ExpressUtils.parseSoapArgs<IPatientParams>(args);
    const response = await PatientService.getAll(params);
    return response;
  });

  public static getOne = this.handler<{ id: string }, unknown>(async ({ id }) =>
    PatientService.getOne({ id }),
  );

  public static create = this.handler<IPatientCreateForm, unknown>(
    async (args) => {
      const response = await PatientService.create(args);
      return {
        patient: {
          ...response,
          // createdAt: response.createdAt.toISOString(),
          // updatedAt: response.updatedAt.toISOString(),
        },
      };
    },
  );

  public static update = this.handler<IPatientUpdateForm, unknown>(
    async (args) => PatientService.update(args),
  );

  public static delete = this.handler<{ id: string }, unknown>(async ({ id }) =>
    PatientService.delete({ id }),
  );
}
export default PatientHandler;
