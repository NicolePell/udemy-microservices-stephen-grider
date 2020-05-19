import React from 'react'

type Props = {
  comments: Comment[]
}

enum Status {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

export type Comment = {
  id: string
  content: string
  status: Status
}

export default (props: Props) => {
  const renderedComments = Object.values(props.comments).map((comment, index) => {
    switch (comment.status) {
      case Status.Approved:
        return <li key={index}>{comment.content}</li>
      case Status.Pending:
        return <li key={index}>This comment is pending</li>
      case Status.Rejected:
        return <li key={index}>This comment is awaiting moderation</li>
      default:
        return <li key={index}>This comment is pending</li>
    }
  })

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  )
}
