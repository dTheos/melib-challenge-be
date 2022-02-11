import { fetchArticles } from "../services/articles.service.js";
import L from "../logger.js";

export const getArticles = async (req, res) => {
    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    try {
        let articles = await fetchArticles(page, limit);
        L.info("Enviando artículos");
        return res.status(200).json({ status: 200, data: articles });
    } catch (err) {
        L.error(err.message);
        return res.status(400).json({ status: 400, message: err.message });
    }
}