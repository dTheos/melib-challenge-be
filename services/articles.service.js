import axios from "axios";
import axiosRetry from "axios-retry";
import LRU from "lru-cache";


const options = {
    max: 100,
    ttl: 1000 * 60 * 5,
};
const cache = new LRU(options);

axiosRetry(axios, { retries: 3 });

export async function getArticles(page, limit) {
    let lastIndex = page * limit;
    let startIndex = lastIndex - limit;

    let articles = {
        totalArticles: 100,
    };

    try {
        if (cache.get(page)) {
            articles.content = cache.get(page);
            return articles;
        } else {
            let { data } = await axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=100');
            cache.set(page, data.slice(startIndex, lastIndex).map(({ url, title, imageUrl }) => { return { url, title, imageUrl } }));
            articles.content = cache.get(page);
            return articles;
        }
    } catch (err) {
        throw Error(err)
    }
}
