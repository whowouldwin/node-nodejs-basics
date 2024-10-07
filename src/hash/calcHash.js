import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { createHash } from 'crypto'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, './files', 'fileToCalculateHashFor.txt');
  const hash = await createHash('sha256');
  try {
    await pipeline(
      createReadStream(filePath),
      async function* (source) {
        for await (const chunk of source) {
          hash.update(chunk);
        }
      }
    );
    const fileHash = hash.digest('hex');
    console.log(`SHA256 hash is ${fileHash}`);
  } catch (e) {
    console.error(e);
  }
};

await calculateHash();