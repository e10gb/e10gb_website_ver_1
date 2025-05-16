import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 80; // Listen on HTTP port 80 so it's public

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist folder
app.use('/', express.static(path.join(__dirname, 'dist')));


// Handle any other routes by returning index.html (for SPAs)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://159.89.33.214`);
});
