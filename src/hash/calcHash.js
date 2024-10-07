import { createReadStream} from 'fs';
import path from 'path';
import { createHash } from 'crypto'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const calculateHash = async () => {
  const filePath = path.join(__dirname, './files', 'fileToCalculateHashFor.txt');
  const hash = await createHash('sha256');
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  })

  readStream.on('end', () => {
    const fileHash = hash.digest('hex');
    console.log(`SHA256 hash is ${fileHash}`);
  })

  readStream.on('error', (err) => {
    console.error(err);
  })
};

await calculateHash();