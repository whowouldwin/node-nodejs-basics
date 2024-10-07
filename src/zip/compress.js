import { fileURLToPath } from 'url';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib'
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputFilePath = path.join(__dirname, './files', 'fileToCompress.txt');
  const outputFilePath = path.join(__dirname, './files', 'archive.gz');

  try {
    await pipeline(
      createReadStream(inputFilePath),
      createGzip(),
      createWriteStream(outputFilePath)
    )
  } catch (e) {
    console.log(e);
  }
};

await compress();