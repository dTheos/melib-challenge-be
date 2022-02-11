import { getArticles } from "../services/articles.service.js";

export const getAndValidate = async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    try {
        let articles = await getArticles(page, limit);
        return res.status(200).json({ status: 200, data: articles });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}