import Post from '../Post/Post'
import "./posts.scss"
import React from 'react'

export default function Posts({posts}) {
  return (
    <div className="posts">
      <h2 className="posts__title">Ultimos Posteos</h2>
      <div className="posts__container">
        {posts.slice(-6).map((p) => (
          <Post post={p} key={p._id}/> // for each post in posts property call Post component
        ))}
      </div>
    </div>
  )
}
