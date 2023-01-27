import Post from '../Post/Post'
import "./posts.scss"
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Posts({posts}) {
  const {search} = useLocation()
  return (
    <div className="posts">
      <h2 className="posts__title">Ultimos Posteos</h2>
      <div className="posts__container">
        {search === undefined || search === "" ? (
          posts.slice(-6).map((p) => (
            <Post post={p} key={p._id}/> // for each post in posts property call Post component
          ))

        ) : (
          posts.map((p) => (
            <Post post={p} key={p._id}/> // for each post in posts property call Post component
          ))
        )}
      </div>
    </div>
  )
}
