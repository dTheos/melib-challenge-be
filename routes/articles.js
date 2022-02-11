import express from "express";
import { getArticles } from "../controllers/article.js";
import { query, validationResult } from "express-validator";

const router = express.Router();

router.get('/', query(["page", "limit"]).optional().isNumeric(), (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    next();
}, getArticles);

export default router;
