import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  try {
    const fileToRemove = path.join(__dirname, 'files', 'fileToRemove.txt');
    try {
      await access(fileToRemove);
    } catch (e) {
      throw new Error(`FS operation failed`);
    }
    await access(fileToRemove)
    await fs.rm(fileToRemove);
  } catch (e) {
    console.error(e.message);
  }
};

await remove();