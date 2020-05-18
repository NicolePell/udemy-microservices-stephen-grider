import * as express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

enum EventType {
  CommentCreated = 'CommentCreated',
  CommentModerated = 'CommentModerated',
}

enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === EventType.CommentCreated) {
    const status = data.content.includes('orange') ? Status.Rejected : Status.Approved

    await axios.post(`http://localhost:4005/events`, {
      type: EventType.CommentModerated,
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    })
  }

  res.send({ status: 'OK' })
})

app.listen(4003, () => {
  console.log('Moderation service listening on 4003')
})
