import fs from 'fs';
import path from 'path';
import http from 'http';
const soap = require('soap');
import {
  AppointmentSchema,
  DiagnosticSchema,
  PatientSchema,
  TriageSchema,
} from '../schema';

class SoapPahMain {
  private static get services() {
    return [
      {
        route: '/soap/appointments',
        wsdl: path.join(__dirname, '../wsdl/appointment.wsdl'),
        schema: AppointmentSchema.schema,
      },
      {
        route: '/soap/patients',
        wsdl: path.join(__dirname, '../wsdl/patient.wsdl'),
        schema: PatientSchema.schema,
      },
      {
        route: '/soap/triages',
        wsdl: path.join(__dirname, '../wsdl/triage.wsdl'),
        schema: TriageSchema.schema,
      },
      {
        route: '/soap/diagnostics',
        wsdl: path.join(__dirname, '../wsdl/diagnostic.wsdl'),
        schema: DiagnosticSchema.schema,
      },
    ];
  }

  public static async loader(httpServer: http.Server) {
    for (const { route, wsdl, schema } of this.services) {
      const wsdlFile = fs.readFileSync(wsdl, 'utf8');
      soap.listen(httpServer, route, schema, wsdlFile);
    }
    console.log('Routes upload');
  }
}
export default SoapPahMain;
