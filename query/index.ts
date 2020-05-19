import * as express from 'express'
import * as cors from 'cors'
import axios from 'axios'

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

type Event = {
  type: EventType
  data: Post | Comment
}

const posts: Posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)

  res.status(201).send({ status: 'OK' })
})

const handleEvent = (type: EventType, data: any) => {
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
}

app.listen(4002, async () => {
  console.log('Query service listening on 4002')

  const response = await axios.get('http://localhost:4005/events')

  response.data.forEach((event: Event) => {
    console.log('Processing event: ', event.type)

    handleEvent(event.type, event.data)
  })
})
