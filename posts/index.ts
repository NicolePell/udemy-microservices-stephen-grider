import * as express from 'express'
import { randomBytes } from 'crypto'
import * as cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())

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

  axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Event', req.body.type)

  res.send({})
})

app.listen(4000, () => {
  console.log('Post service listening on 4000')
})
