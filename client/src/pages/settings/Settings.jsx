import React from 'react'
import './settings.scss'
import User from '../../images/user-regular.svg'
import SidebarSim from '../../components/sidebarSim/SidebarSim'
import Footer from '../../components/footer/Footer'
import { useContext } from 'react'
import {Context} from '../../context/Context'
import { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'


export default function Settings() {
    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [remove, setRemove] = useState(false)
    const axiosInstance = axios.create({baseURL:"http://93.188.167.224/api"})

    const PF = 'http://localhost:8000/images/'

    const  handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type:"UPDATE_START"})
         const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename
            try {
                await axiosInstance.post("/upload", data)
            } catch (err) {}
        }
        try {
            const res = await axiosInstance.put ("/users/" + user._id, updatedUser)
            swal({
                title: "Siii!",
                text: "Perfil actualizado correctamente, " + user.username,
                icon: "success",
                button: "OK",

            })
            dispatch({type:"UPDATE_SUCCESS", payload: res.data})
        } catch(err) {
            dispatch({type:"UPDATE_FAILURE"})
        }
    }

    const deleteUser = async(e)=> {
        e.preventDefault()
        dispatch({type:"DELETE_USER_START"})
        try {
            await axiosInstance.delete("/users/" + user._id, {data: {userId: user._id}})
            dispatch({type: "DELETE_USER_SUCCESS"})
        } catch (e) {
            dispatch({type: "DELETE_USER_FAILURE"})
        }
    }

  return (
    <>
    <div className='settings'>
        <div className="settings__wrapper">
            <div className="settings__titles">
                <h1 className="settings__update">
                    Ajustes
                </h1>
                <span className="settings__delete" style={{display: remove ? 'none' : 'block'}} onClick={()=>setRemove(true)}>Eliminar cuenta</span>
                {remove && (
                    <span>Esta seguro que quiere eliminar el perfil?</span>,
                    <div>
                        <button className="settings__delete-confirm" onClick={deleteUser}>Eliminar</button>
                        <button className="settings__delete-decline" onClick={()=>{setRemove(false)}}>Cancelar</button>
                    </div>
                )}

            </div>
            <form action="post" className="settings__form" onSubmit={handleSubmit}>
                <label className="settings__form-label">
                    Imagen de perfil:
                </label>
                <div className="settings__form-pic">
                    <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="Icon" className="settings__form-person" />
                    <label htmlFor="settings__fileinput">
                        <img src={User} alt="Icon" className="settings__form-user" />
                    </label>
                    <input className="settings__form-input--hidden" type="file" id='settings__fileinput' style={{display: "none"}} onChange={(e) =>
                        setFile(e.target.files[0])
                    }/>
                </div>
                <div className="settings__form-other">
                    <div className="settings__form-other-container">
                        <label className="settings__form-mark">Nombre de Usuario</label>
                        <input className="settings__form-input" type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                    </div>
                    <div className="settings__form-other-container">
                        <label className="settings__form-mark">Correo Electronico</label>
                        <input className="settings__form-input" type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div className="settings__form-other-container">
                        <label className="settings__form-mark">Clave</label>
                        <input className="settings__form-input" type="password" onChange={e=>setPassword(e.target.value)} required={true}  />
                    </div>
                </div>
                <button className="settings__submit" type="submit">Actualizar</button>
            </form>
        </div>
        <SidebarSim/>
    </div>
    <Footer/>
    </>
  )
}
