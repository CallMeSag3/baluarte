import React from 'react'
import "./post.scss"
import {Link} from 'react-router-dom'
import slugify from 'slugify'

export default function Post({post}) {
  const PF = 'https://api.baluartear.com/images/'

  slugify.extend({
    ",": "_co_",
    "?": "_qu_",
    ".": "_do_",
    "!": "_ex_",
    ":": "_mo_",
    "/": "_ba_",
    ";": "_pu_",
    "(": "_pa_",
    ")": "_pc_",
    "¿": "_quu_",
    "¡": "_exx_",
    "ñ": "_nn_",
    "Ñ": "_NN_",
    "á": "_aa_",
    "é": "_ee_",
    "í": "_ii_",
    "ó": "_oo_",
    "ú": "_uu_",
    "Á": "_AA_",
    "É": "_EE_",
    "Í": "_II_",
    "Ó": "_OO_",
    "Ú": "_UU_",
  })
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
