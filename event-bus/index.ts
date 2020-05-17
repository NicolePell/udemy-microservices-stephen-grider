import * as express from 'express'
import * as cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())

type Event = {
  id: string
  title: string
}

app.post('/events', (req, res) => {
  const event: Event = req.body

  axios.post('http://localhost:4000/events', event)
  axios.post('http://localhost:4001/events', event)
  axios.post('http://localhost:4002/events', event)

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log('Event bus listening on 4005')
})
