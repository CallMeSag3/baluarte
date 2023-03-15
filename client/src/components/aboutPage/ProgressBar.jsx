import React from 'react'
import { useState } from 'react'
import './progressBar.scss'

export default function ProgressBar (props) {
    const { bgcolor, completed, state } = props

    const [style, setStyle] = useState({})

    if(state) {
      setTimeout(() => {
        const newStyle = {
          width: `${completed}%`,
          opacity: 1,
        }
        setStyle(newStyle)
      }, 300)
    }

    const line = {
      backgroundColor: bgcolor
    }

    return (
      <div className="containerStyles">
        <div style={{...style, ...line}} className="fillerStyles">
          {/* <span className="labelStyles">{`${completed}%`}</span> */}
        </div>
      </div>
    )
}
