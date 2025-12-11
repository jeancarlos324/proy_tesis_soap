import { prisma } from '../config/database.config';
class SeederServer {
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
    this.run();
  }
  public async run() {
    const { faker } = await import('@faker-js/faker');
    const user = await this.prisma.appointment.findMany({ take: 10 });
    console.log(faker.color);
    console.log(user);
    console.log('gaaa');
  }
}
export default SeederServer;
