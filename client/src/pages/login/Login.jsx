import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './login.scss'
import swal from 'sweetalert'

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})
  const { dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    } catch(err) {
      swal ({
        title: "Oops!",
        text: "Usuario o contraseña errada, intente nuevamente!" ,
        icon: "error",
        button: "OK",
        dangerMode:true,
      })
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className='login'>
        <h1 className="login__title">Acceder a cuenta</h1>
        <form action="post" className="login__form" onSubmit={handleSubmit}>
            <input type="text" className="login__input" placeholder='Nombre de usuario...' ref={userRef} />
            <input type="password" className="login__input" placeholder='Clave...' ref={passwordRef}/>
            <button className="login__enter" type="submit" disabled={isFetching}>Entrar</button>
        </form>
        <button className="login__register">
          <Link to={"/register"} className='link'>
            Regisrarse
          </Link>
        </button>
    </div>
  )
}
