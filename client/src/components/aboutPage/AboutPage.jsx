import React from 'react'
import './aboutPage.scss'
import Mate from '../../images/mate.png'
import Mountain from '../../images/mountain.jpg'
import ProgressBar from './ProgressBar'
import Post from '../Post/Post'
import { useState } from 'react'
import { useEffect } from 'react'

export default function AboutPage({posts}) {
  const testData = [
    { bgcolor: "#2DCDDF", completed: 80 },
    { bgcolor: "#ffffff", completed: 50 },
    { bgcolor: "#ffffff", completed: 75 },
    { bgcolor: "#2DCDDF", completed: 30 },
  ]

  const [state, setState] = useState()
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let px = window.pageYOffset
      console.log(px)
      px > 1400 && px < 1500 ? setState(true) : setState(false)
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut dolore vero animi, distinctio, saepe dolor quidem accusantium quia cum vel, iusto doloribus excepturi maxime voluptatum qui sunt exercitationem odio!
          </p>
          <p className="aboutpage__top-text">
              Voluptatum, alias itaque? Minus maxime dolore amet fuga nisi esse necessitatibus praesentium repellat officiis incidunt maiores tempore quod deleniti commodi eum sequi aperiam, quae recusandae tempora ratione totam? Architecto, quaerat.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi obcaecati vel optio et error itaque voluptatem soluta natus, expedita, nostrum architecto voluptas illo assumenda tenetur tempore deserunt voluptates neque quae?
              Lorem, ipsum.
              <br/>
              Debitis totam animi et, eaque, aperiam tempore iure incidunt impedit fugiat, assumenda ratione ipsa cupiditate repellendus. Harum soluta unde distinctio dignissimos, illo consectetur aliquid sunt id vitae adipisci voluptate molestias.
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga optio ab repudiandae temporibus ea ipsa consequuntur, voluptas, odio, ut sapiente a possimus nisi. Fugiat necessitatibus temporibus alias suscipit possimus eligendi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum veritatis labore libero sit impedit deleniti, aperiam dicta vitae, voluptatum ratione soluta explicabo cumque quis, ad fugiat tempora iure. Quae, quasi!
          </p>
          <div className="aboutpage__diagram-container">
            <img src={Mate} alt="Mate" className="aboutpage__diagram-img" />
            <ul className="aboutpage__diagram-container-table">
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Lorem, ipsum.</p>
                </div>

                <ProgressBar bgcolor={testData[0].bgcolor} completed={testData[0].completed} state={state} />

              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Lorem, ipsum. Lorem, ipsum dolor.</p>
                </div>

                <ProgressBar bgcolor={testData[1].bgcolor} completed={testData[1].completed} state={state} />

              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Lorem, ipsum.</p>
                </div>

                <ProgressBar bgcolor={testData[2].bgcolor} completed={testData[2].completed} state={state} />
              </li>
              <li className="aboutpage__diagram-container-item">
                <div className="aboutpage__diagram-container-item-content">
                  <p className="aboutpage__diagram-container-item-name">Lorem, ipsum.</p>
                </div>

                <ProgressBar bgcolor={testData[3].bgcolor} completed={testData[3].completed} state={state} />
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
