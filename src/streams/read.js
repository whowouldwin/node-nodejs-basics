import { createReadStream} from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filepath = path.join(__dirname, './files', 'fileToRead.txt');
  try {
    await pipeline(
      createReadStream(filepath),
      process.stdout
    );
  } catch (e) {
    console.log(e);
  }
};

await read();