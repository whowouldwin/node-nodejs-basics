import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const create = async () => {
  try {
    const filepath = path.join(__dirname, 'files', 'fresh.txt')
    try {
      await access(filepath)
      throw new Error(`FS operation failed`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    await fs.writeFile(filepath, 'I am fresh and young', )
    console.log(`${filepath} created.`)
  } catch (error) {
    console.error(error.message)
  }
};

await create();