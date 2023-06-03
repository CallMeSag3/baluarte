import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './register.scss'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})

  const handleSubmit = async (e) => {
    e.preventDefault() // no refresh
    setError(false)
    try {
      const res = await axiosInstance.post("/auth/register", {
        username, email, password,
      })
      res.data && window.location.replace("/login")
    } catch (err) {
      setError(true)
    }
  }
  return (
    <div className='register'>
        <h1 className="register__title">Registrarse</h1>
        <form action="post" className="register__form" onSubmit={handleSubmit}>
            <input type="text" className="register__input" placeholder='Nombre de Usuario...' onChange={e => {
              setUsername(e.target.value)
            }}/>
            <input type="email" className="register__input" placeholder='Correo electronico...' onChange={e => {
              setEmail(e.target.value)
            }} />
            <input type="password" className="register__input" placeholder='Clave...' onChange={e => {
              setPassword(e.target.value)
            }} />
            <button className="register__register" type="submit">Crear Cuenta</button>
        </form>
        <button className="register__login">
          <Link to={"/login"} className='link'>
            Acceder
          </Link>
        </button>
        {error && <span className='register__err'>Someting went wrong!</span>}
    </div>
  )
}
