import axios from "axios";
import axiosRetry from "axios-retry";
import LRU from "lru-cache";
import L from "../logger.js";

const options = {
    max: 100,
    ttl: 1000 * 60 * 5,
};
const cache = new LRU(options);

axiosRetry(axios, { retries: 3 });

export async function fetchArticles(page, limit) {
    let lastIndex = page * limit;
    let startIndex = lastIndex - limit;

    let articles = {
        totalArticles: 100,
    };

    try {
        if (cache.get("articles")) {
            L.info("Pidiendo información de cache");
            articles.content = cache.get("articles").slice(startIndex, lastIndex);
            return articles;
        } else {
            L.info("Pidiendo información de API")
            let { data } = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${articles.totalArticles}`);
            cache.set("articles", data.map(({ url, title, imageUrl }) => { return { url, title, imageUrl } }));
            articles.content = cache.get("articles").slice(startIndex, lastIndex);
            return articles;
        }
    } catch (err) {
        L.error(err);
        throw Error(err);
    }
}
