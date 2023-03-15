import React from 'react'
import Post from '../Post/Post'
import './all.scss'

export default function All({posts}) {
  return (
    <div className='all'>
        {posts.map((p) => (
          <Post post={p} key={p._id}/>
        ))}
    </div>
  )
}
