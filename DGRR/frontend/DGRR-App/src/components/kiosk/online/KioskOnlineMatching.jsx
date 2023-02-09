import KioskNavBlock from '../KioskNavBlock'
import React from 'react'
import '../../../scss/KioskOnlineMatching.scss'
import { Link } from 'react-router-dom'

const OnlineMatchingPlayer = props => {
  const { name, tier, tierPoint, record } = props
  return (
    <div className="OnlineMatchingPlayerBlock">
      <div className="OnlineMatchingProfile"></div>
      <div className="OnlineMatchingPlayerInfoBlock">
        <div className="OnlineMatchingTierAndName">
          <div className="OnlinePlayerTier">{tier}</div>
          <div className="OnlinePlayerName">{name}</div>
        </div>
        <div className="OnlineMatchingPointAndRecord">
          <div className="OnlinePlayerPoint">
            {tier} {tierPoint}
          </div>
          <div className="OnlinePlayerRecord">
            {record[0]} 전 {record[1]} 승 {record[2]} 패
          </div>
        </div>
      </div>
    </div>
  )
}

const mydata = { name: '김메시', tier: 'master', tierPoint: 3000, record: [10, 7, 3] }

const KioskOnlineMatching = props => {
  const { goBackTo, goFrontTo } = props
  const onRandomSession = (length = 50) => {
    return Math.random().toString(16).substr(2, length)
  }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOnlineLogin'} />
      <div className="OnlineMatchingContentBlock">
        <OnlineMatchingPlayer {...mydata} />
        <div className="LetterV">V</div>
        <div className="LetterS">S</div>
        <OnlineMatchingPlayer {...mydata} />
      </div>
      <div className="GameStartBlock">
        <Link to="/KioskOnlineGame" className="GameStartButton" state={{ random: onRandomSession(50) }}>
          START
        </Link>
      </div>
    </div>
  )
}

export default KioskOnlineMatching
