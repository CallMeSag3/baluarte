import AboutHeader from '../../components/aboutHeader/AboutHeader'
import AboutPage from '../../components/aboutPage/AboutPage'
import './about.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Footer from '../../components/footer/Footer'


export default function About() {
  const [posts, setPosts] = useState([]) // rendering posts from back
  const axiosInstance = axios.create({baseURL:"http://93.188.167.224/api"})

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts")
      setPosts(res.data)
    }
    fetchPosts()
  }, []) // runs on first render, [prop, state] => and any time any dependence changes
  return (
    <div className='about'>
        <AboutHeader/>
        <AboutPage posts={posts}/>
        <Footer/>
    </div>
  )
}
