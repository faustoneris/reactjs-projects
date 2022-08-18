import { Header } from './components/header/Header'
import { Post } from './components/posts/Post'


import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/sidebars/Sidebar'

const posts = [
  {
    id: '1',
    author: {
      avatarUrl: "https://github.com/faustoneris.png",
      name: "Fausto Neris",
      role: "Fullstack Development"
    },
    content: [
      { type: "paragraph", content: ' Fala galeraa 👋' },
      { type: "paragraph", content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: "link", content: 'jane.design/doctorcare' },
      { type: "link", content: ' #novoprojeto #nlw #rocketseat' }
    ],
    publishedAt: new Date('2022-08-19 11:53'),
  },

  {
    id: '2',
    author: {
      avatarUrl: "https://github.com/febucchino.png",
      name: "Felipe Bucchino",
      role: "Java Development"
    },
    content: [
      { type: "paragraph", content: ' Fala galeraa 👋' },
      { type: "paragraph", content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: "link", content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-08-18 11:10'),
  },
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>)
}


