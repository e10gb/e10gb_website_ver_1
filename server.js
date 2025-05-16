// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static("dist")); // change to "build" if you're using `npm run build`

// Example route to handle form submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // You can integrate email or database logic here
  return res.status(200).json({ message: "Message received" });
});

// For any other route, serve the frontend (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
