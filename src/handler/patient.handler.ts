import { soapErrorHandler } from '../core/soapErrorHandler';
import { PatientService } from '../services';
import {
  IPatientCreateForm,
  IPatientParams,
  IPatientUpdateForm,
} from '../types/patient';

class PatientHandler {
  private static handler = soapErrorHandler;
  public static getAll = this.handler<IPatientParams, unknown>(async (args) =>
    PatientService.getAll(args),
  );

  public static getOne = this.handler<{ id: string }, unknown>(async ({ id }) =>
    PatientService.getOne({ id }),
  );

  public static create = this.handler<IPatientCreateForm, unknown>(
    async (args) => PatientService.create(args),
  );

  public static update = this.handler<IPatientUpdateForm, unknown>(
    async (args) => PatientService.update(args),
  );

  public static delete = this.handler<{ id: string }, unknown>(async ({ id }) =>
    PatientService.delete({ id }),
  );
}
export default PatientHandler;
