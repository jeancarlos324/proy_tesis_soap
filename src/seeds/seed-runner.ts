import { UserSeeder } from './seed';

const runner = new UserSeeder(8, 1, 8);
runner.run();
