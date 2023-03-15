import React from 'react'
import './aboutPage.scss'
import Mate from '../../images/matee.png'
import Mountain from '../../images/mountain.jpg'
import ProgressBar from './ProgressBar'
import Post from '../Post/Post'
import { useState } from 'react'
import { useEffect } from 'react'

export default function AboutPage({posts}) {
  const testData = [
    { bgcolor: "#0081B4", completed: 100 },
    { bgcolor: "#820000", completed: 100 },
    { bgcolor: "#0081B4", completed: 100 },
    { bgcolor: "#820000", completed: 100 },
    { bgcolor: "#0081B4", completed: 100 },
    { bgcolor: "#820000", completed: 100 },
    { bgcolor: "#0081B4", completed: 100 },
  ]

  const [state, setState] = useState()
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let px = window.pageYOffset
      console.log(px)
      px > 1370 && px < 1500 ? setState(true) : setState(false)
    })
  })

  return (
    <div className='aboutpage'>
      <div className="aboutpage__container">
        <div className="aboutpage__top">
          <h2 className="aboutpage__top-title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, eveniet?
          </h2>
          <p className="aboutpage__top-text">
            El nosotros es un espacio para el debate y la reflexión donde la focalización en la realidad,  determinación en la búsqueda y cambio de conciencia cultural y colectiva son el eje de una propuesta que quiere ser diferente, pero no con ello renegar del pasado y del legado de quienes nos han antecedido y puesto los cimientos de este proyecto de ser y constituir una nación libre, soberana y justa.
          </p>
          <p className="aboutpage__top-text">
              Sea este un ámbito donde la llamada a la reflexión y al cambio sea permanente, una dinámica donde nos sentiremos realizados cuando hayamos conseguido los consensos básicos sobre que somos y nuestra proyección futura, sea ello desde los principios pre-políticos, los posulados políticos, las medidas económicas y las políticas sociales que vayamos a diseñar, en un contexto de relacionamiento internacional creativo.
          </p>
        </div>
        <div className="aboutpage__split">
          <img src={Mountain} alt="bg" className="aboutpage__split-img" />
        </div>
        <div className="aboutpage__diagram">
          <h2 className="aboutpage__diagram-title">
            Nuestra inspiracion en detalles
          </h2>
          <p className="aboutpage__diagram-text">
          Este sitio tiene un doble fin. En primer lugar, sistematizar trabajos elaborados en los últimos años hasta llegar a la actualidad, al mismo tiempo que desentrañar con quienes se sumen ideas que sirvan al pensamiento y acción política argentinos con proyección en el espacio de pertenencia civilizacional sudamericano en torno a los siguiente ejes:
          </p>
          <div className="aboutpage__diagram-container">
            {/* <img src={Mate} alt="Mate" className="aboutpage__diagram-img" /> */}
            <ul className="aboutpage__diagram-container-table">
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">El proyecto político</p>
                </div>

                <ProgressBar bgcolor={testData[0].bgcolor} completed={testData[0].completed} state={state} />

              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">El plan de organización socio-económica</p>
                </div>

                <ProgressBar bgcolor={testData[1].bgcolor} completed={testData[1].completed} state={state} />

              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Los organismos de ejecución</p>
                </div>

                <ProgressBar bgcolor={testData[2].bgcolor} completed={testData[2].completed} state={state} />
              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Los organismos de control</p>
                </div>

                <ProgressBar bgcolor={testData[3].bgcolor} completed={testData[3].completed} state={state} />
              </li>

              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Los espacios para el debate filosófico-cultural, político y político-económico-social</p>
                </div>

                <ProgressBar bgcolor={testData[4].bgcolor} completed={testData[4].completed} state={state} />
              </li>

              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">La interacción con la comunidad internacional. Estrategia, táctica y acciones</p>
                </div>

                <ProgressBar bgcolor={testData[5].bgcolor} completed={testData[5].completed} state={state} />
              </li>

              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Los medios de comunicación social, la digitalización, la vinculación generacional y laboral, la cultura hacia el futuro que ya es</p>
                </div>

                <ProgressBar bgcolor={testData[6].bgcolor} completed={testData[6].completed} state={state} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="aboutpage__posts">
        <h2 className="aboutpage__posts-title">
          Nuestro Ultimos Posteos
        </h2>
        <div className="aboutpage__posts-cont">
          {posts.slice(-3).map((p) => (
            <Post post={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  )
}
