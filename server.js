import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://159.89.33.214`);
});
