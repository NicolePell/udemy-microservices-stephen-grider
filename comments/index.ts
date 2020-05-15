import * as express from 'express'
import { randomBytes } from 'crypto'

const app = express()
app.use(express.json())

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

app.post('/posts/:id/comments', (req, res) => {
  const commentId: string = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsForPost[req.params.id] || []
  comments.push({ id: commentId, content })

  commentsForPost[req.params.id] = comments

  res.status(201).send(commentsForPost[req.params.id])
})

app.listen(4001, () => {
  console.log('Listening on 4001')
})
