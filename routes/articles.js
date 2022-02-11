import express from "express";
import { getAndValidate } from "../controllers/article.js";

const router = express.Router();

router.get('/', getAndValidate);

export default router;
