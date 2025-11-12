import { IPagination } from './global';
export interface IDiagnosticParams extends IPagination {
  patientId?: string;
  appointmentId?: string;
}

export interface IDiagnosticForm {
  anamnesis: string;
  observations: string;
  diagnostic: string[];
  clinicalExam: string;
  appointmentId: string;
  doctorId: string;
}
