import React, { useState } from 'react'
import axios from 'axios'

type Props = {
  postId: string
}

export default (props: Props) => {
  const [content, setContent] = useState<string>('')

  const onSubmit = async () => {
    await axios.post(`http://localhost:4001/posts/${props.postId}/comments`, {
      content,
    })

    setContent('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input className="form-control" value={content} onChange={(event) => setContent(event.target.value)} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
