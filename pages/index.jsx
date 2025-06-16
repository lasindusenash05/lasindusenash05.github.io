import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hiru Sinhala News</title>
        <meta name="description" content="Live scraped Hiru news headlines" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>📢 Hiru News (සිංහල)</h1>
        <div className={styles.grid}>
          {news.map((item, index) => (
            <a href={item.link} className={styles.card} key={index} target="_blank" rel="noreferrer">
              <img src={item.image} alt="news" className={styles.img} />
              <h3>{item.title}</h3>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        © All rights belong to <a href="https://www.hirunews.lk/">Hiru News</a>. This is a non-commercial project.
      </footer>
    </div>
  );
}
