import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://www.hirunews.lk/sinhala');
    const $ = cheerio.load(data);

    const news = [];

    $('.other_news_list .news_box').each((i, el) => {
      const title = $(el).find('a h2').text().trim();
      const image = $(el).find('a .image img').attr('src');
      const link = 'https://www.hirunews.lk' + $(el).find('a').attr('href');

      if (title && image && link) {
        news.push({ title, image, link });
      }
    });

    res.status(200).json(news.slice(0, 10)); // Return top 10 news items
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
