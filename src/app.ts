import SeederServer from './seeds/seed-test';
import Server from './server';

// import { UserSeeder } from './seeds/seed';

const server = new Server();
server.listen();

(async () => {
  const seed = new SeederServer();
  await seed.run();
})();
