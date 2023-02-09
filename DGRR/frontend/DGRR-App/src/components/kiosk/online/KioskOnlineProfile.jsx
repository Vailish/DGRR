import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import '../../../scss/KioskOnlineProfile.scss'
import { Link } from 'react-router-dom'

const KioskOnlineProfile = () => {
  const player = useSelector(state => state.OnlineLoginUser.player)
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOnlineLogin'} />
      <div className="OnlineProfileContentBlock">
        <div className="OnlineProfileContentInner">
          <div className="OnlineProfile"></div>
          <div className="OnlineRecordBlock">
            <div className="OnlinePlayerName">{player.nickname}</div>
            <div className="OnlineTierAndRecord">
              <div className="OnlineTier">골드(1800)</div>
              <div className="OnlineRecord">{`${player.record[0].totalGame}전 ${player.record[0].winGame}승 ${player.record[0].loseGame}패`}</div>
            </div>
          </div>
        </div>

        <div className="StartBackBlock">
          <Link to="/KioskOnlineFind" className="GameStartBlock">
            시작
          </Link>
          <Link to="/KioskOnlineLogin" className="GameStartBlock">
            뒤로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineProfile
