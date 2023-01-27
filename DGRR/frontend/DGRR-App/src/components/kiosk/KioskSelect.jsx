import React from 'react'
import "../../scss/KioskSelect.scss"

let wanthelp = false

const HelpMessage = () => {
  wanthelp = !wanthelp
  console.log(wanthelp)
}

const HelpMessageBlock = () => {
  return (
    <div className='HelpMessageBlock'>시작하기</div>
  )
}

const KioskSelect = () => {
    
    return (
      <div className='KioskBackground'>
        <div className='TitleBox'>
          <div className='HelpCircleBlock'>
            <div className='HelpCircle' onClick={HelpMessage}>?</div>
          </div>
            <div className='TitleText'>DG.RR</div>
          <hr className='Pin'/>
        </div>
        <div className='Competition'>
          <div className='CompetitionText'>경쟁전</div>
        </div>
        <div className='Friendly'>
          <div className='FriendlyText'>친선전</div>
        </div>
        {
          wanthelp ? <HelpMessageBlock/> : null
        }
      </div>
    )
}


export default KioskSelect