import { fileURLToPath } from 'url';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib'
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const inputFilePath = path.join(__dirname, './files', 'archive.gz');
  const outputFilePath = path.join(__dirname, './files', 'fileToCompress.txt');

  try {
    await pipeline(
      createReadStream(inputFilePath),
      createGunzip(),
      createWriteStream(outputFilePath)
    )
  } catch (e) {
    console.error(e);
  }
};

await decompress();