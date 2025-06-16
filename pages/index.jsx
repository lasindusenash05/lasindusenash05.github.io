import { useEffect, useState } from "react";
import "../styles/theme.css";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.news || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Ada Derana Sinhala News</h1>
        <p>
          Source:{" "}
          <a href="https://sinhala.adaderana.lk/" target="_blank" rel="noreferrer">
            sinhala.adaderana.lk
          </a>
        </p>
      </header>

      {loading ? (
        <p>Loading news...</p>
      ) : news.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="news-grid">
          {news.map(({ title, link, img }, i) => (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="news-card">
              <div className="image-wrapper">
                {img ? (
                  <img src={img} alt={title} loading="lazy" />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <h3>{title}</h3>
            </a>
          ))}
        </div>
      )}

      <footer>
        <p>
          © Ada Derana | Scraped data used for educational/demo purposes only.
        </p>
      </footer>
    </div>
  );
                            }
