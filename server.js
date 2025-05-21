import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Only serve index.html for routes that do NOT contain a dot (.)
app.get('*', (req, res) => {
  if (req.path.includes('.')) {
    // If the request is for a file, let express.static handle it
    res.status(404).end();
  } else {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://159.89.33.214`);
});
