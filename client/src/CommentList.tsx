import React, { useState, useEffect } from 'react'
import axios from 'axios'

type Props = {
  postId: string
}

type Comment = {
  id: string
  content: string
}

type Comments = {
  [id: string]: Comment
}

export default (props: Props) => {
  const [comments, setComments] = useState<Comments | {}>({})

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:4001/posts/${props.postId}/comments`)

    setComments(response.data)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const renderedComments = Object.values(comments).map((comment, index) => {
    return <li key={index}>{comment.content}</li>
  })

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  )
}
