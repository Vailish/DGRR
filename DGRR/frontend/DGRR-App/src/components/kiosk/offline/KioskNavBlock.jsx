import React from 'react'
import '../../../scss/KioskNavBlock.scss'
import { Link } from 'react-router-dom'

const KioskNavBlock = props => {
  const { goBackTo, goFrontTo } = props

  return (
    <div className="NavBlock">
      <div className="LogoBlock">
        <div className="Logo">DG.RR</div>
      </div>
      <div className="spaceBlock"></div>
      {goBackTo ? (
        <Link className="BackBlock" to={goBackTo}>
          <div className="GoBack">BACK</div>
          <hr className="BackLine" />
        </Link>
      ) : (
        <Link className="FrontBlock" to={goFrontTo}>
          <div className="GoFront">MAIN</div>
          <hr className="FrontLine" />
        </Link>
      )}
    </div>
  )
}

export default KioskNavBlock
