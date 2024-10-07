import fs, { access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  try {
    const pathToFolder = path.join(__dirname, 'files');
    try {
      await access(pathToFolder);
      const files = await fs.readdir(pathToFolder);
      console.log(files);
    } catch (e) {
      throw new Error('FS operation failed');
    }
  } catch (e) {
    console.error(e.message);
  }
};
await list();