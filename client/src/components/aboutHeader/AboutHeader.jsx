import './aboutHeader.scss'
import Argentina from '../../images/arg.jpeg'
import React from 'react'

export default function AboutHeader() {
  return (
    <div className='about__header'>
        <div className="about__header-container">
            <img src={Argentina} alt="ImagenArgentina" className="about__header-img" />
            <h1 className="about__header-title">
                Sobre Nosotros
            </h1>
        </div>
    </div>
  )
}
