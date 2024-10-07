import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  try {
    const filepath = path.join(__dirname, 'files', 'fileToRead.txt');
    try {
      await access(filepath)
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          throw new Error('FS operation failed');
        }
        console.log(data);
      })
    } catch (e) {
      throw new Error(`FS operation failed`);
    }
  } catch (e) {
    console.error(e.message);
  }

};

await read();