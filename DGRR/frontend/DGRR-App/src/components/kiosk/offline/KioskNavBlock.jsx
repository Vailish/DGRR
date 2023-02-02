import React from 'react'
import '../../../scss/KioskNavBlock.scss'

const KioskNavBlock = () => {
  return (
    <div className="NavBlock">
      <div className="LogoBlock">
        <div className="Logo">DG.RR</div>
      </div>
      <div className="spaceBlock"></div>
      <div className="BackBlock">
        <div className="Back">BACK</div>
        <hr className="BackLine" />
      </div>
    </div>
  )
}

export default KioskNavBlock
