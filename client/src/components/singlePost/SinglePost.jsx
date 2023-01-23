import './singlePost.scss'
import User from '../../images/user-regular.svg'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import {Context} from '../../context/Context'


// edit only for admins
export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const [post, setPost] = useState({})
    const PF = "http://localhost:8000/images/"
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const [file, setFile] = useState(null)

    const {user} = useContext(Context)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path]) // change on path edit

    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {data:{userId: user._id}})
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async () => {
        const updatedPost = {
            userId: user._id,
            title,
            desc
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updatedPost.photo = filename
            try {
                await axios.post("/upload", data)
            } catch (err) {}
        }
        try {
            await axios.put("/posts/" + path, updatedPost)
            setUpdateMode(false)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='single-post'>
        <div className="single-post__container">
            {post.photo && (
                <img src={file ? URL.createObjectURL(file) : PF + post.photo} alt="Imagen" className="single-post__img" />
            )}
            {updateMode ? <input type="text" value={title} className="editmode__title-input" autoFocus onChange={(e)=>setTitle(e.target.value)}></input> : (
                <div className="single-post__head">
                    <h1 className="single-post__title">{title}</h1>
                    {user?.username === 'rafael__admin' &&(
                    <div className='single-post__edits'>
                        <span className='single-post__edit' style={{color:"green", cursor:"pointer"}} onClick={()=>setUpdateMode(true)}>Editar</span>
                        <span className='single-post__edit' style={{color:"tomato", cursor:"pointer"}} onClick={handleDelete}>Eliminar</span>
                    </div>
                    )}
                </div>
            )}
            {updateMode && (
                <div className="settings__form-pic">
                    <label htmlFor="settings__fileinput" style={{marginLeft:20}}>
                        <img src={User} alt="Icon" className="settings__form-user" />
                    </label>
                    <input className="settings__form-input--hidden" type="file" id='settings__fileinput' style={{display: "none"}} onChange={(e) =>
                    setFile(e.target.files[0])
                }/>
            </div>
            )}
            <div className="single-post__info">
                <span className="single-post__author">
                    Autor: <b>Aguila Piñatelli</b>
                </span>

                <span className="single-post__date">
                    {new Date(post.createdAt).toLocaleDateString("es-ES", options)}
                </span>
            </div>
            {updateMode ? <textarea type="text" value={desc} className="editmode__text-input" onChange={(e)=>setDesc(e.target.value)}></textarea> : (
                <p className="single-post__text">
                    {desc}
                </p>
            ) }
            {updateMode && <button className="editmode__button" onClick={handleUpdate}>Actualizar</button>}
            {/* <div className="single-post__comments">
                <h2 className="single-post__comments__title">
                    Escriba su opinion!
                </h2>
                <div className="single-post__comments__write">
                    <input className="single-post__comments__input" type="text" placeholder="Comentario"/>
                    <button className="single-post__comments__btn" type="submit">Mandar</button>
                </div>
                <div className="single-post__comments__other">
                    <h2 className="single-post__comments__title">
                        Comentarios:
                    </h2>
                    <div className="single-post__comments__comment">
                        <img src={OtherPicOne} alt="Usuario" className="single-post__comments__profile" />
                        <div className="single-post__comments__content">
                            <h2 className="single-post__comments__name">
                                <b>Usuario Uno</b>
                            </h2>
                            <span className="single-post__comments__date">
                                20 minutos atras
                            </span>
                            <p className="single-post__comments__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi nisi atque numquam necessitatibus nostrum recusandae cumque neque beatae repellendus officiis? Provident excepturi pariatur dignissimos laborum, ea ipsa necessitatibus consectetur accusamus.
                            </p>
                        </div>
                    </div>
                    <div className="single-post__comments__comment">
                        <img src={OtherPicTwo} alt="Usuario" className="single-post__comments__profile" />
                        <div className="single-post__comments__content">
                            <h2 className="single-post__comments__name">
                                <b>Usuario Dos</b>
                            </h2>
                            <span className="single-post__comments__date">
                                46 minutos atras
                            </span>
                            <p className="single-post__comments__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi nisi atque numquam necessitatibus nostrum recusandae cumque neque beatae repellendus officiis? Provident excepturi pariatur dignissimos.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  )
}


