import { Worker } from 'worker_threads';
export abstract class BaseSeeder {
  abstract seedBlock(): Promise<void>;
}

export class UserSeeder extends BaseSeeder {
  constructor(
    private total: number = 100000,
    private blockSize: number = 5000,
    private concurrency: number = 6,
  ) {
    super();
  }
  async seedBlock(): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./src/seeds/seed-worker.js', {
        workerData: { blockSize: this.blockSize },
      });

      worker.on('message', () => resolve());
      worker.on('error', reject);
    });
  }

  async run() {
    const blocks = Math.ceil(this.total / this.blockSize);
    console.log(
      `Insertando ${this.total} registros en ${blocks} bloques x${this.concurrency}`,
    );

    for (let i = 0; i < blocks; i += this.concurrency) {
      const batch = [...Array(this.concurrency)]
        .map((_, idx) => i + idx)
        .filter((idx) => idx < blocks)
        .map(() => this.seedBlock());
      console.log(`Exec batch ${i + 1}/${blocks}`);
      await Promise.all(batch);
      console.log(`Completed`);
    }
    console.log('!Done');
  }
}
