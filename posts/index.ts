import * as express from 'express'
import { randomBytes } from 'crypto'

const app = express()
app.use(express.json())

type Post = {
  id: string
  title: string
}

type Posts = {
  [id: string]: Post
}

const posts: Posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  const id: string = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log('Listening on 4000')
})
