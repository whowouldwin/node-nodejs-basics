import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const filepath = path.join(__dirname, './files', 'fileToWrite.txt');
    console.log('Enter the text you want to write to the file to the file');
    console.log('Press Cmd+C (Linux) to end the input')
    try {
      await pipeline(
        process.stdin,
        createWriteStream(filepath)
      );
      console.log('Data has been written!');
    } catch (e) {
      console.log(e);
    }
};

await write();