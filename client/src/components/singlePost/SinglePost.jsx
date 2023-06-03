import './singlePost.scss'
import User from '../../images/user-regular.svg'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import {Context} from '../../context/Context'
import swal from 'sweetalert'
import Person from '../../images/icooon.jpeg'



// edit only for admins
export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const [post, setPost] = useState({})
    const PF = 'https://api.baluartear.com/images/'
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const [file, setFile] = useState(null)
    const [commentText, setCommentText] = useState("")
 const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})
    const {user} = useContext(Context)

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path]) // change on path edit

    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

    const handleComment = async (e) => {
        var d = new Date(),
        dformat = [
               d.getDate(),
               d.getMonth()+1,
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

        e.preventDefault()
        const comment = {
            username: user.username,
            userId: user._id,
            body: commentText,
            userPic: user.profilePic,
            date: dformat,
        }
        console.log(comment.date)
        try {
            await axiosInstance.put("/posts/" + path, {comment})
            swal({
                title: "Comentario agregado!",
                icon: "success",
                button: "OK",

            }).then(()=>window.location.reload())
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete("/posts/" + path, {data:{userId: user._id}})
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
                await axiosInstance.post("/upload", data)
            } catch (err) {}
        }
        try {
            await axiosInstance.put("/posts/" + path, updatedPost)
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
                    {user?.username === 'pfalconar' &&(
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
                    Autor: <b>RAPA</b>
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
            <div className="single-post__comments">
                <h2 className="single-post__comments__title">
                    Escriba su opinion!
                </h2>
                {user && (
                    <div className="single-post__comments__write">
                        <form action="post" className="single-post__comments__form" onSubmit={handleComment}>
                            <input className="single-post__comments__input" type="text" onChange={e=>setCommentText(e.target.value)} required={true} placeholder="Comentario"/>
                            <button className="single-post__comments__btn" type="submit">Mandar</button>
                        </form>
                    </div>
                )}
                <div className="single-post__comments__other">
                    <h2 className="single-post__comments__title">
                        Comentarios:
                    </h2>
                    {typeof post.comments !== 'undefined' && post.comments.length > 0 ? (
                        post.comments.reverse().map(comment => (
                                <div key={comment.username + comment.userId + comment.body} className="single-post__comments__comment">
                                    {comment.userPic ?  <img src={PF + comment.userPic} alt="Usuario" className="single-post__comments__profile" /> : <img src={Person} alt="Usuario" className="single-post__comments__profile" />}

                                    <div className="single-post__comments__content">
                                        <h2 className="single-post__comments__name">
                                            <b>{comment.username}</b>
                                        </h2>
                                        <h2 className="single-post__comments__date">
                                            {comment.date}
                                        </h2>
                                        <p className="single-post__comments__text">
                                            {comment.body}
                                        </p>
                                    </div>
                                </div>
                        ))
                    ) : (<h2 className="single-post__comments__nocom" style={{fontSize:20, marginTop:"50px", color:"#666"}}>
                    No hay comentarios!
                </h2>)}
                </div>
            </div>
        </div>
    </div>
  )
}


