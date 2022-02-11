import express from "express";
import cors from "cors";
import articlesRoutes from "./routes/articles.js";
import L from "./logger.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.use('/articles', articlesRoutes)

app.listen(PORT, (() => L.info(`Server running on port: http://localhost:${PORT}`)));