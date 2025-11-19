import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
app.use(express.static(PUBLIC_DIR));
app.use(express.json());
const PROGRESS_FILE = path.join(__dirname, "progress.json");
function readProgress() {
  try {
    if (!fs.existsSync(PROGRESS_FILE)) return { index: 0 };
    const raw = fs.readFileSync(PROGRESS_FILE, "utf8");
    if (!raw) return { index: 0 };
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading progress:", e);
    return { index: 0 };
  }
}
function writeProgress(obj) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(obj, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Error writing progress:", e);
    return false;
  }
} 
app.get("/progress", (req, res) => {
  const progress = readProgress();
  res.json(progress);
});

// API: lưu progress { index: n }
app.post("/progress", (req, res) => {
  const body = req.body || {};
  const index = Number(body.index) || 0;
  const ok = writeProgress({ index });
  if (ok) return res.json({ success: true, index });
  return res.status(500).json({ success: false });
});

// API: reset progress
app.post("/reset", (req, res) => {
  const ok = writeProgress({ index: 0 });
  if (ok) return res.json({ success: true });
  return res.status(500).json({ success: false });
});

// Fallback: serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
