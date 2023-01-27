import React from 'react'
import "./sidebar.scss"
import Facebook from '../../images/facebook.svg'
import Twitter from '../../images/twitter.svg'
import Telegram from '../../images/telegram.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('/categories')
      setCats(res.data)
    }
    getCats()
  }, [])

  return (
    <div className='sidebar'>
      <div className="sidebar__container">
        <div className="sidebar__item">
          <h2 className="sidebar__title">CATEGORIAS</h2>
          <ul className="sidebar__list">
            {cats.map((cat) => (
              <Link to={`/?cat=${cat.name}`} key={cat._id} className="sidebar__list-item">
                <li className="sidebar__list-item" key={cat._id}>{cat.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebar__item">
          <h2 className="sidebar__title">SUBSCRIBETE</h2>
          <div className="sidebar__social">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="sidebar__social-link">
              <img src={Facebook} alt="Facebook" className="sidebar__social-image" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="sidebar__social-link">
              <img src={Twitter} alt="Twitter" className="sidebar__social-image" />
            </a>
            <a href="https://t.me/gaucho_argentino" target="_blank" rel="noreferrer" className="sidebar__social-link">
              <img src={Telegram} alt="Telegram" className="sidebar__social-image" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
