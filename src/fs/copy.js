import fs, {access} from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  try {
    const srcFolder = path.join(__dirname, 'files');
    const destFolder = path.join(__dirname, 'files_copy');
    try {
      await access(srcFolder)
    }
    catch (e) {
      throw new Error(`FS operation failed`);
    }
    try {
      await access(destFolder)
      throw new Error(`FS operation failed`);
    }
    catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
    await fs.mkdir(destFolder)
    const files = await fs.readdir(srcFolder)
    await Promise.all(
      files.map(async file => {
        const sourceFile = path.join(srcFolder, file);
        const destFile = path.join(destFolder, file);
        await fs.copyFile(sourceFile, destFile);
      })
    );
    console.log(`Files copied successfully`);
  }
  catch (e) {
    console.error(e);
  }
};
await copy();
