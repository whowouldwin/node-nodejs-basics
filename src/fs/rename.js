import fs, { access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const wrongFileName = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newFileName = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await access(wrongFileName).catch(() => {
      throw new Error(`FS operation failed`);
    });
    await access(newFileName).then(() => {
      throw new Error(`FS operation failed`);
    }).catch((e) => {
      if (e.code !== 'ENOENT') {
        throw new Error(`FS operation failed`);
      }
    });
    await fs.rename(wrongFileName, newFileName);
  } catch (e) {
    console.error(e.message)
  }
};

await rename();