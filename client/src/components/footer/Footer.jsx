import './footer.scss'
import Twitter from '../../images/bastyon.png'
import Telegram from '../../images/telegram.svg'
import Facebook from '../../images/facebook.svg'
import React from 'react'
import emailjs from 'emailjs-com'
import swal from 'sweetalert'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import { useRef } from 'react'

export default function Footer() {
    const {user} = useContext(Context)
    const form = useRef()

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
    <div className="footer">
        <div className="container-fluid">
            <div className="footer__container">
                <div className="footer__sections">
                    <div className="footer__first">
                        <h2 className="footer__first-title">Contactenos</h2>
                        <p className="footer__first-text">
                        El tiempo es la eternidad que se nos da en cada grano de arena, nuestro sentido es palpitar el ser con cada instante que se nos ha dado frente a un que hacer personal, social y nacional.
                        </p>
                        <a href="mailto:pgn2233@gmail.com" className="footer__first-email">
                            pgn2233@gmail.com
                        </a>
                        {user && (
                            <form action="post" ref={form} onSubmit={sendEmail} className="footer__first-form">
                                <input className="footer__first-form-input--hidden" name="user_name" type="text" placeholder="Texto" defaultValue={user.username}/>
                                <input className="footer__first-form-input--hidden" name="user_email" type="email" placeholder="Texto" defaultValue={user.email}/>
                                <input className="footer__first-form-input" name="message" type="text" placeholder="Texto" required={true}/>
                                <button className="footer__first-form-btn" type="submit" value="Send">Mandar</button>
                            </form>
                        )}
                    </div>
                    <div className="footer__links">
                        <h2 className="footer__links-title">Subscribete</h2>
                        <ul className="footer__links-list">
                            <li className="footer__links-item">
                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="footer__links-link">
                                    <img src={Facebook} alt="RedSoc" className="footer__links-image" />
                                    <p className="footer__links-name">Facebook</p>
                                </a>
                            </li>
                            <li className="footer__links-item">
                                <a href="https://bastyon.com/cherapal?ref=PAxzKqPG5tLDgqhACDJzNVfSFczquni3Po" target="_blank" rel="noreferrer" className="footer__links-link">
                                    <img src={Twitter} alt="RedSoc" className="footer__links-image-bas" />
                                    <p className="footer__links-name">Bastyon</p>
                                </a>
                            </li>
                            <li className="footer__links-item">
                                <a href="https://t.me/gaucho_argentino" target="_blank" rel="noreferrer" className="footer__links-link">
                                    <img src={Telegram} alt="RedSoc" className="footer__links-image" />
                                    <p className="footer__links-name">Telegram</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
