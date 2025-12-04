import http, { IncomingMessage, ServerResponse } from 'http';
import { config } from 'dotenv';
import pc from 'picocolors';
import SoapPahMain from './core/soap.main';
config();
class Server {
  private httpServer!: http.Server;
  private PORT: string = process.env.PORT || '8000';
  private HOST: string = process.env.HOST || 'localhost';

  constructor() {
    this.httpServer = http.createServer(this.requestHandler.bind(this));
  }

  private async requestHandler(_req: IncomingMessage, res: ServerResponse) {
    this.setCORSHeaders(res);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server Soap running');
  }

  private setCORSHeaders(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, SOAPAction');
  }
  public listen() {
    this.httpServer.listen(this.PORT, () => {
      const path = `http://${this.HOST}:${this.PORT}`;
      if (this.HOST && this.PORT) {
        console.log(pc.bgCyan(pc.bold(`Server started at ${path}`)));
      } else {
        console.log(pc.bgRed(pc.white("Couldn't start server")));
      }
      SoapPahMain.loader(this.httpServer);
    });
  }
}

export default Server;
