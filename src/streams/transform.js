import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const reverseStream = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('').reverse().join('');
    callback(null, lines);
  }
});

const transform = async () => {
  console.log('Enter text to reverse');
  try {
    await pipeline(
      process.stdin,
      reverseStream,
      process.stdout
    );
  } catch (e) {
    console.error(e.message)
  }
};

await transform();