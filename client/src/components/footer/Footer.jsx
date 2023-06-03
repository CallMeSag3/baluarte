import './footer.scss'
import Twitter from '../../images/bastyon.png'
import Telegram from '../../images/telegram.svg'
import Facebook from '../../images/tumblr.svg'
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
                         Estamos abiertos a sugerencias, propuestas o simplemente manifestaciones de voluntad de contribuir al descubrimiento y  construcción del nosotros como reflejo de aspiraciones individuales y colectivas.
                        </p>
                        <a href="https://t.me/gaucho_argentino" className="footer__first-email">
                            @Falconar22
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
                        <h2 className="footer__links-title">Siguenos</h2>
                        <ul className="footer__links-list">
                            <li className="footer__links-item">
                                <a href="https://at.tumblr.com/votontam/j2z0bk4tex9q" target="_blank" rel="noreferrer" className="footer__links-link">
                                    <img src={Facebook} alt="RedSoc" className="footer__links-image" />
                                    <p className="footer__links-name">Tumblr</p>
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
