import React from 'react'
import "./post.scss"
import {Link} from 'react-router-dom'

export default function Post({post}) {
  const PF = "http://localhost:8000/images/"
  console.log(post.name)
  return (
    <div className="post">
      {post.photo && (
        <img src={PF + post.photo} alt="postPhoto" className="post__img" />
      )}
      <div className="post__info">
        <div className="post__categories">
          {post.categories.map((c) => (
            <span className="post__cat" key={post._id}>{c}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="post__title">
          <h3 className="post__title">{post.title}</h3>
        </Link>
        <hr/>
        <span className="post__date">
          {new Date(post.createdAt).toDateString()}
        </span>
        <p className="post__describtion">
          {post.desc}
        </p>
      </div>
    </div>
  )
}
