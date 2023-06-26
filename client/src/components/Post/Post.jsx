import React from 'react'
import "./post.scss"
import {Link} from 'react-router-dom'
import slugify from 'slugify'

export default function Post({post}) {
  const PF = 'https://api.baluartear.com/images/'
  const slug = slugify(post.title)
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
        {/* <Link to={`/posts/${post._id}`} className="post__title"> */}
        <Link to={`/posts/${slug}`} className="post__title">
          <h3 className="post__title">{post.title}</h3>
        </Link>
        <hr/>
        <p className="post__describtion">
          {post.desc}
        </p>
      </div>
    </div>
  )
}
