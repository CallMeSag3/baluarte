import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Posts from '../../components/Posts/Posts'
import Preview from '../../components/section__preview/Preview'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([]) // rendering posts from back
  const {search} = useLocation()
  const axiosInstance = axios.create({baseURL:"http://93.188.167.224/api"})
  console.log(search)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search]) // runs on first render, [prop, state] => and any time any dependence changes

  return (
    <div>
      <Header/>
      <div className="container">
        <Preview/>
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
