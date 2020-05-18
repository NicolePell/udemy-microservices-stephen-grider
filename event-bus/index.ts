import * as express from 'express'
import * as cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())

enum ServiceUrl {
  Post = 'http://localhost:4000/events',
  Comment = 'http://localhost:4001/events',
  Query = 'http://localhost:4002/events',
  Moderation = 'http://localhost:4003/events',
}

type Event = {
  id: string
  title: string
}

app.post('/events', (req, res) => {
  const event: Event = req.body

  axios.post(ServiceUrl.Post, event)
  axios.post(ServiceUrl.Comment, event)
  axios.post(ServiceUrl.Query, event)
  axios.post(ServiceUrl.Moderation, event)

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log('Event bus listening on 4005')
})
