import Post from '../Post/Post'
import "./posts.scss"
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Posts({posts}) {
  const test_common_prefix = (arr) => {
    const arr_len = arr.length
    const min_len = Math.min(...arr.map((e) => e.length))
    let i = 0
    while (i < min_len) {
      const char = arr[0][i]
      for (let j = 1; j < arr_len; j++) {
        if (arr[j][i] !== char) {
          return arr[0].slice(0, i)
        }
      }
      i++
      debugger
    }
    return arr[0].slice(0, i)
  }

  


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
