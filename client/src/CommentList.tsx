import React from 'react'

type Props = {
  comments: Comment[]
}

export type Comment = {
  id: string
  content: string
}

export default (props: Props) => {
  const renderedComments = Object.values(props.comments).map((comment, index) => {
    return <li key={index}>{comment.content}</li>
  })

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  )
}
