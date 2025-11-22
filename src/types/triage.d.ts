import { IPagination } from './global';

export interface ITriageParams extends IPagination {}
export interface ITriageCreateForm {
  weight: number;
  height: number;
  temperature: number;
  heartRate: number;
  ipss?: number;
  bloodPressure: string;
  daysSick: number;
  sature: number;
  observations?: string;
  appointmentId: string;
}

export interface ITriageUpdateForm extends ITriageCreateForm {
  id: string;
}
