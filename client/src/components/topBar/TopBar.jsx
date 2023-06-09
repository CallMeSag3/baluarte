import './topbar.scss';
import Logo from '../../images/logo.svg'
import SearchLoop from '../../images/magnifying-glass-solid.svg'
import Cancel from '../../images/x.svg'
import Person from '../../images/icooon.jpeg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useRef } from 'react';
import axios from 'axios'

export default function TopBar()
{
    const {user, dispatch} = useContext(Context)
    const [search, setSearch] = useState(false)
    const [posts, setPosts] = useState([])
    const [query, setQuery] = useState('')
    const menu = useRef()

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("/posts")
          setPosts(res.data)
        }
        fetchPosts()
      }, [])

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
        window.location.replace('/')
    }

    const handleClick = (event) => {
        const content = menu.current
        event.currentTarget.classList.toggle('is-active')
        content.classList.toggle('is-active')
    }

    const PF = 'http://localhost:8000/images/'


    window.addEventListener("scroll", () => {
        var navElement = document.getElementById("menu")
        var navTop = document.getElementById("top")
        var menuMobile = document.getElementById("menu__list-mobile-ul")

        if(window.pageYOffset > 90)
        {
                navTop.style.opacity = 0
                navElement.style.position = "fixed";
                navElement.style.transform = "translateY(-140px)"
                menuMobile.style.transform = "translateY(70px)"
                menuMobile.style.top = "0%"
            }
            else {
                navTop.style.opacity = 1
                navElement.style.position = "inherit"
                navElement.style.transform = "translateY(0)"
                menuMobile.style.transform = "translateY(0px)"
                navElement.style.transition = "all 0.5s"
                menuMobile.style.top = "30%"
        }
    })
    return (
        <div className="container__fluid">
            <div className='top' id="top">
                <div className="topLeft">
                    <Link to={"/"} className="link top__link">
                        <img src={Logo} alt="Logo" className='top__logo' />
                    </Link>
                </div>
                <div className="topCenter">
                    <div className="top__img"/>
                </div>
                <div className="topRight">
                    <h2 className="top__text">
                        Union humanista cívica argentina
                    </h2>
                </div>
            </div>
            <div className="menu" id='menu'>
                <ul className="menu__list">
                    <li className="menu__list-item">
                            <Link to={"/"} className="link menu__list-link">
                                Inicio
                            </Link>
                    </li>
                    <li className="menu__list-item">
                            <Link to={"/posts"} className="link menu__list-link">
                                Posteos
                            </Link>
                    </li>
                    <li className="menu__list-item">
                            <Link to={"/about"} className="link menu__list-link">
                                Nosotros
                            </Link>
                    </li>
                    <li className="menu__list-item">
                        <Link to={"/contact"} className="link menu__list-link">
                            Contactenos
                            </Link>
                    </li>
                    <li className="menu__list-item" onClick={handleLogout}>
                        <a href="." className="menu__list-link">
                            {user && 'Salir'}
                        </a>
                    </li>
                    {user && user.username === 'rafael__admin' ? (
                        <li className="menu__list-item">
                                <Link to={"/write"} className="link menu__list-link">
                                    Publicar
                                </Link>
                        </li>
                    ) : null}
                </ul>
                <button className={"hamburger"} id="hamburger" style={{transition:"0.4s"}} ref={menu} onClick={handleClick}>
                    <div className="bar">

                    </div>
                </button>

                <div className="menu__right">
                    {
                        user ? (
                            <Link to={"/settings"} className="link">
                                {user.profilePic ? <img src={PF + user.profilePic} alt="Person" className="menu__right-person" /> : <img src={Person} alt="Person" className="menu__right-person" />}
                            </Link>
                        ) : (
                            <ul className='menu__list'>
                                <li className="menu__list-item">
                                    <Link to={"/login"} className="link menu__list-link">
                                        Acceder
                                    </Link>
                                </li>
                                <li className="menu__list-item">
                                    <Link to={"/register"} className="link menu__list-link" style={{marginRight: 15}}>
                                        Registrarse
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                    {search && (
                        <div className="menu__right-cont">
                            <div className="menu__right-search">
                                <input type="text" placeholder='Buscar...' className="menu__right-search-input" onChange={(e)=>setQuery(e.target.value)} />
                                <img src={Cancel} className="menu__right-search-img" alt='cancel' onClick={()=>setSearch(false)}/>
                            </div>
                            <ul className="menu__right-searchitems">
                                {posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())).map(post => (
                                    <Link to={`/post/${post._id}`} key={post._id} onClick={()=>setSearch(false)}>
                                        <li className="menu__right-searchitem" key={post._id}>{post.title}</li>
                                    </Link>
                                )).splice(0, 6)}
                            </ul>
                        </div>
                    )}
                    {!search && <img src={SearchLoop} alt="search" className="menu__right-image" onClick={()=>setSearch(true)} />}
                </div>
            </div>
            <div className="menu__list-mobile" ref={menu} id="menu__list-mobile">
                <ul className="menu__list-mobile-ul" id="menu__list-mobile-ul">
                    <li className="menu__list-mobile-item">
                            <Link to={"/"} className="link menu__list-mobile-link">
                                Inicio
                            </Link>
                    </li>
                    <li className="menu__list-mobile-item">
                            <Link to={"/posts"} className="link menu__list-mobile-link">
                                Posteos
                            </Link>
                    </li>
                    <li className="menu__list-mobile-item">
                            <Link to={"/about"} className="link menu__list-mobile-link">
                                Nosotros
                            </Link>
                    </li>
                    <li className="menu__list-mobile-item">
                        <Link to={"/contact"} className="link menu__list-mobile-link">
                            Contactenos
                            </Link>
                    </li>
                    <li className="menu__list-mobile-item" onClick={handleLogout}>
                        <a href="." className="menu__list-mobile-link">
                            {user && 'Salir'}
                        </a>
                    </li>
                    {user && user.username === 'rafael__admin' ? (
                        <li className="menu__list-mobile-item">
                                <Link to={"/write"} className="link menu__list-mobile-link">
                                    Publicar
                                </Link>
                        </li>
                    ) : null}
                    {!user && (
                        <>
                        <li className="menu__list-mobile-item">
                            <Link to={"/login"} className="link menu__list-mobile-link">
                                Acceder
                            </Link>
                        </li>
                        <li className="menu__list-mobile-item">
                            <Link to={"/register"} className="link menu__list-mobile-link">
                                Registrarse
                            </Link>
                        </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}


