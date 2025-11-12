import { IPagination } from './global';

export interface IAppointmentParams extends IPagination {
  patientId?: string;
  doctorId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: boolean;
}
export interface IAppointmentCreateForm {
  appointmentDate: Date;
  patientId: string;
  status: boolean;
  totalServices: number;
  servicesDesc: string[];
  doctorId: string;
}
