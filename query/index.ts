import * as express from 'express'
import * as cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

enum Status {
  Pending = 'Pending',
}

type Comment = {
  id: string
  content: string
  status: Status
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
  CommentUpdated = 'CommentUpdated',
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
    const { id, content, postId, status } = data

    const post: Post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === EventType.CommentUpdated) {
    const { id, postId, status, content } = data

    const post: Post = posts[postId]
    const comment = post.comments.find((comment) => {
      return comment.id === id
    })
    comment!.status = status
    comment!.content = content
  }

  res.status(201).send({ status: 'OK' })
})

app.listen(4002, () => {
  console.log('Query service listening on 4002')
})
