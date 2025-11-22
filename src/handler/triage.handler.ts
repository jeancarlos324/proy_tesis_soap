import { soapErrorHandler } from '../core/soapErrorHandler';
import { TriageService } from '../services';
import {
  ITriageCreateForm,
  ITriageParams,
  ITriageUpdateForm,
} from '../types/triage';

class TriageHandler {
  private static handler = soapErrorHandler;

  public static getAll = this.handler<ITriageParams, unknown>(async (args) => {
    return await TriageService.getAll(args);
  });

  public static getOne = this.handler<
    ITriageParams & { patientId: string },
    unknown
  >(async (args) => {
    return await TriageService.getOne(args);
  });

  public static create = this.handler<ITriageCreateForm, unknown>(
    async (args) => {
      return await TriageService.create(args);
    },
  );

  public static update = this.handler<ITriageUpdateForm, unknown>(
    async (args) => {
      return await TriageService.update(args);
    },
  );

  public static delete = this.handler<{ id: string }, unknown>(
    async ({ id }) => {
      return await TriageService.delete({ id });
    },
  );
}
export default TriageHandler;
