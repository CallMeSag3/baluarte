import React from 'react'
import './preview.scss'
import Arrow from '../../images/arrow.svg'
import Clock from '../../images/clock.svg'
import Columns from '../../images/columns.svg'

export default function Preview() {
  return (
        <div className="preview">
            <ul className="preview__list">
                <li className="preview__list-item">
                    <img src={Columns} alt="Imagen" className="preview__list-img" />
                    <h2 className="preview__list-title">Reflexión</h2>
                    <p className="preview__list-text">
                        Sea este un ambito donde la llamada a la reflexión y el cambio sea permanente
                    </p>
                </li>
                <li className="preview__list-item">
                    <img src={Clock} alt="Imagen" className="preview__list-img" />
                    <h2 className="preview__list-title">Sumen Ideas</h2>
                    <p className="preview__list-text">
                        Quienes se sumen ideas que sirvan al pensamiento y acción politica Argentina
                    </p>
                </li>
                <li className="preview__list-item">
                    <img src={Arrow} alt="Imagen" className="preview__list-img" />
                    <h2 className="preview__list-title">Nuestro Sentido</h2>
                    <p className="preview__list-text">
                        El tiempo es la eternidad que se nos da en cada grano de arena, nuestro sentido
                    </p>
                </li>
            </ul>
        </div>
  )
}
