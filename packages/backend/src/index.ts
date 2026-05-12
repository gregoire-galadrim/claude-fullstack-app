import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT ?? 3000;
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  app.use(cors({ origin: "http://localhost:4200" }));
}

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello Planet" });
});

if (isProd) {
  const staticPath = path.join(
    __dirname,
    "../../frontend/dist/frontend/browser"
  );
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
