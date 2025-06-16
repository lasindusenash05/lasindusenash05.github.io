
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('/api/news').then(res => {
      setArticles(res.data)
    })
  }, [])

  return (
    <div className="container">
      <h1>උණුසුම් පුවත් - AdaDerana</h1>
      {articles.map((article, i) => (
        <div className="card" key={i}>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            <img src={article.image} alt="Thumbnail" />
            <h2>{article.title}</h2>
          </a>
        </div>
      ))}
      <footer>
        <p style={{fontSize: '0.8rem'}}>All news content © <a href="https://sinhala.adaderana.lk" target="_blank" rel="noreferrer">AdaDerana.lk</a>. This is a student-built project for educational purposes only.</p>
      </footer>
    </div>
  )
}
