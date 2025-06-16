
import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://sinhala.adaderana.lk/')
    const $ = cheerio.load(data)
    const articles = []

    $('.lead-news-block .media').each((i, el) => {
      const title = $(el).find('.media-body > h2').text().trim()
      const image = $(el).find('img').attr('src')
      const link = 'https://sinhala.adaderana.lk' + $(el).find('a').attr('href')
      if (title && image && link) {
        articles.push({ title, image, link })
      }
    })

    res.status(200).json(articles)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}
