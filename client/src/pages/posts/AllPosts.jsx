import './allPosts.scss'
import All from '../../components/all/All'
import Footer from '../../components/footer/Footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function AllPosts() {
  const [posts, setPosts] = useState([]) // rendering posts from back
  const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})


  useEffect(() => {
    const fetchPosts = async () => {
	console.log("Working")
      const res = await axiosInstance.get("/posts")
	console.log("ABC")
      setPosts(res.data)
    }
    fetchPosts()
  }, []) // runs on first render, [prop, state] => and any time any dependence changes

  return (
    <>
    <div className='allpost'>
        <All posts={posts}/>
    </div>
    <Footer/>
    </>
  )
}
