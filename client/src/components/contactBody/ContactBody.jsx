import React from 'react'
import './contactBody.scss'
import Argentina from '../../images/arg.jpeg'
import Twitter from '../../images/bastyon.png'
import Telegram from '../../images/telegram.svg'
import Facebook from '../../images/tumblr.svg'
import swal from 'sweetalert'
import { useRef } from 'react'
import emailjs from 'emailjs-com'
import { useContext } from 'react'
import { Context } from '../../context/Context'

export default function ContactBody() {
  const form = useRef()
  const {user} = useContext(Context)

  const sendEmail = (e) => {
    e.preventDefault()
        try{
            emailjs.sendForm('service_k0fu40g', 'template_i1127d4', form.current, 'upMXRu7WOWGDC48aA').then((res) => {
                console.log(res.text)
            })
            swal({
                title: "Gracias por su opinion!",
                text: "Correo enviado correctamente, " + user.username,
                icon: "success",
                button: "OK",
            })
        } catch(err) {
            console.log(err)
        }
  }

  return (
    <div className='contactBody'>
      <div className='contactBody__header'>
        <div className="contactBody__header-container">
            <img src={Argentina} alt="ImagenArgentina" className="contactBody__header-img" />
            <h1 className="contactBody__header-title">
                Contactenos
            </h1>
        </div>
      </div>
      <div className="contactBody__main">
        <h1 className="contactBody__title">
          Esperamos su opinion!
        </h1>
        <div className="contactBody__container">
          <ul className="contactBody__list">
            <li className="contactBody__item">
              <a href="https://at.tumblr.com/votontam/j2z0bk4tex9q" target="_blank" rel="noreferrer" className="contactBody__item-link">
                <img src={Facebook} alt="logo" className="contactBody__item-img" />
              </a>
            </li>
            <li className="contactBody__item">
              <a href="https://bastyon.com/cherapal?ref=PAxzKqPG5tLDgqhACDJzNVfSFczquni3Po" target="_blank" rel="noreferrer" className="contactBody__item-link">
                <img src={Twitter} alt="logo" className="contactBody__item-img" />
              </a>
            </li>
            <li className="contactBody__item">
              <a href="https://t.me/gaucho_argentino" target="_blank" rel="noreferrer" className="contactBody__item-link">
                <img src={Telegram} alt="logo" className="contactBody__item-img" />
              </a>
            </li>
          </ul>
          <p className="contactBody__text">
          El tiempo es la eternidad que se nos da en cada grano de arena, nuestro sentido es palpitar el ser con cada instante que se nos ha dado frente a un que hacer personal, social y nacional.
          <br/>
          Vení unite!
          </p>
          <a href="https://t.me/gaucho_argentino" className="contactBody__email">
              @Falconar22
          </a>
          <form action="post" ref={form} onSubmit={sendEmail} className="contactBody__form">
            <div className="contactBody__form-container">
              <input className="contactBody__form-input" name='user_name' type="text" placeholder="Nombre" required={true}/>
              <input className="contactBody__form-input" name='user_email' type="email" placeholder="Correo" required={true}/>
            </div>
            <textarea className="contactBody__form-input contactBody__form-input--big" name='message' type="text" placeholder="Mensaje" required={true}></textarea>
            <button className="contactBody__form-btn" type="submit">Mandar</button>
          </form>
        </div>

      </div>
    </div>
  )
}
