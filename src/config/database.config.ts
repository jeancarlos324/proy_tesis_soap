import { PrismaClient } from '../generated/prisma';
import pc from 'picocolors';

declare global {
  var prisma: PrismaClient | undefined;
}

class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      if (!global.prisma) {
        global.prisma = new PrismaClient({
          log: process.env.NODE_ENV
            ? ['error']
            : ['query', 'info', 'warn', 'error'],
          errorFormat: process.env.NODE_ENV ? 'minimal' : 'pretty',
        });
      }
      PrismaService.instance = global.prisma;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(pc.bgWhite(pc.bold('🚧 Database is under development 🚧 ')));
    }
    return PrismaService.instance;
  }
}

const prisma = PrismaService.getInstance();
export * from '../generated/prisma';
export { prisma };
