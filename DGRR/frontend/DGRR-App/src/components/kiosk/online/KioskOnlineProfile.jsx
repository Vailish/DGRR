import KioskNavBlock from '../KioskNavBlock'
import React from 'react'
import '../../../scss/KioskOnlineProfile.scss'
import { Link } from 'react-router-dom'

const KioskOnlineProfile = props => {
  const { goBackTo, goFrontTo } = props

  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOnlineLogin'} />
      <div className="OnlineProfileContentBlock">
        <div className="OnlineProfileContentInner">
          <div className="OnlineProfile"></div>
          <div className="OnlineRecordBlock">
            <div className="OnlinePlayerName">메시</div>
            <div className="OnlineTierAndRecord">
              <div className="OnlineTier">골드(1800)</div>
              <div className="OnlineRecord">10전 7승 3패</div>
            </div>
          </div>
        </div>

        <div className="StartBackBlock">
          <Link to="/KioskOnlineFind" className="GameStartBlock">
            START
          </Link>
          <Link to="/KioskOnlineLogin" className="GameStartBlock">
            BACK
          </Link>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineProfile
