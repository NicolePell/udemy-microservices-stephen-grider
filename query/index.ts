import * as express from 'express'
import * as cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

type Comment = {
  id: string
  content: string
}

type Post = {
  id: string
  title: string
  comments: Comment[]
}

type Posts = {
  [id: string]: Post
}

enum EventType {
  PostCreated = 'PostCreated',
  CommentCreated = 'CommentCreated',
}

const posts: Posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  if (type === EventType.PostCreated) {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === EventType.CommentCreated) {
    const { id, content, postId } = data

    const post: Post = posts[postId]
    post.comments.push({ id, content })
  }

  res.status(201).send({ status: 'OK' })
})

app.listen(4002, () => {
  console.log('Query service listening on 4002')
})
