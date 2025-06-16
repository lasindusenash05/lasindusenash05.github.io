import fetch from "node-fetch";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://sinhala.adaderana.lk/";
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // This selector finds news items (update if structure changes)
    // Example: select articles inside a container with images + headline links
    const newsItems = [];

    // Adjust selector by inspecting the live site — here is a generic example:
    $("div#home-top-news ul.list li").each((i, el) => {
      if (i >= 10) return false; // limit to top 10 news

      const anchor = $(el).find("a");
      const title = anchor.attr("title") || anchor.text().trim();
      let link = anchor.attr("href");

      if (link && !link.startsWith("http")) {
        link = new URL(link, url).href;
      }

      // Image selector inside the same li
      let img = $(el).find("img").attr("src");
      if (img && !img.startsWith("http")) {
        img = new URL(img, url).href;
      }

      newsItems.push({ title, link, img });
    });

    res.status(200).json({
      source: "https://sinhala.adaderana.lk/",
      copyright: "All rights reserved to Ada Derana.",
      credits:
        "Scraped data provided by Ada Derana. Used here for educational/demo purposes only.",
      news: newsItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news." });
  }
                                           }
