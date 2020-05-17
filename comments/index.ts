import * as express from 'express'
import * as cors from 'cors'
import axios from 'axios'
import { randomBytes } from 'crypto'

const app = express()
app.use(express.json())
app.use(cors())

type Comment = {
  id: string
  content: string
}

type CommentsForPost = {
  [id: string]: Comment[]
}

const commentsForPost: CommentsForPost = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsForPost[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId: string = randomBytes(4).toString('hex')
  const { content } = req.body

  createComment(req.params.id, commentId, content)

  await submitEvent(req.params.id, commentId, content)

  res.status(201).send(commentsForPost[req.params.id])
})

app.post('/events', (req, res) => {
  console.log('Received event', req.body)

  res.send({})
})

const createComment = (postId: string, commentId: string, content: string) => {
  const comments = commentsForPost[postId] || []
  comments.push({ id: commentId, content })

  return (commentsForPost[postId] = comments)
}

const submitEvent = async (postId: string, commentId: string, content: string) => {
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId },
  })
}

app.listen(4001, () => {
  console.log('Comments service listening on 4001')
})
