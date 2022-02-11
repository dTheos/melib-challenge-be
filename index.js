import express from "express";
import cors from "cors";
import articlesRoutes from "./routes/articles.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.use('/articles', articlesRoutes)

app.listen(PORT, (() => console.log(`Server running on port: http://localhost:${PORT}`)));