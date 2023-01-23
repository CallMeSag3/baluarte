import './allPosts.scss'
import All from '../../components/all/All'
import Footer from '../../components/footer/Footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function AllPosts() {
  const [posts, setPosts] = useState([]) // rendering posts from back

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts")
      setPosts(res.data)
    }
    fetchPosts()
  }, []) // runs on first render, [prop, state] => and any time any dependence changes

  return (
    <div className='allpost'>
        <All posts={posts}/>
        <Footer/>
    </div>
  )
}
