import React, { useState } from 'react'
import '../../scss/KioskSelect.scss'
import { Link } from 'react-router-dom'

const KioskSelect = () => {
  const [needHelp, setneedHelp] = useState(false)

  const onChangeHelp = () => {
    setneedHelp(!needHelp)
  }

  const KioskSelectHelpMessage = () => {
    return (
      <div className="KioskSelectHelp">
        <section className="KioskSelectHelpInner">
          <header className="Header">
            <button className="Close" onClick={onChangeHelp}>
              &times;
            </button>
          </header>
          <div className="Start">시작하기</div>
          <div className="FirstHere">처음 오셨나요?</div>
          <p className="InnerText">경쟁전 : 온라인으로 만난 상대와 1:1 대결을 벌입니다!</p>
          <p className="InnerText">친선전 : 오프라인으로 친구들과 함께 점수를 겨룹니다</p>
        </section>
      </div>
    )
  }

  return (
    <div className="KioskBackground">
      {needHelp ? <KioskSelectHelpMessage /> : null}
      <div className="TitleBlock">
        <div className="HelpCircleBlock">
          <div className="HelpCircle" onClick={onChangeHelp}>
            ?
          </div>
        </div>
        <div className="TitleTextBlock">
          <div className="TitleText">DG.RR</div>
          {/* <hr className='Pin'/> */}
        </div>
      </div>
      <div className="ButtonBlock">
        <Link to="/KioskOnlineLogin" className="Competition">
          <div className="CompetitionText">경쟁전</div>
        </Link>
        <Link to="/KioskLogin" className="Friendly">
          <div className="FriendlyText">친선전</div>
        </Link>
      </div>
    </div>
  )
}

export default KioskSelect
