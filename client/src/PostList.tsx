import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
import { Comment } from './CommentList'

type Post = {
  id: string
  title: string
  comments: Comment[]
}

type Posts = {
  [id: string]: Post
}

export default () => {
  const [posts, setPosts] = useState<Posts | {}>({})

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:4002/posts')
    console.log(response.data)

    setPosts(response.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map((post, index) => {
    return (
      <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={index}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  })

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
}
