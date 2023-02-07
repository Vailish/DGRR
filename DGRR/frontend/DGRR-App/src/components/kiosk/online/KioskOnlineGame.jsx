import KioskNavBlock from '../KioskNavBlock'
import React from 'react'
import '../../../scss/KioskOnlineGame.scss'
import { Link } from 'react-router-dom'
import OnlineScoreTable from './OnlineScoreTable'

const OnlineGamePlayerBlock = () => {
  return (
    <div className="OnlineGamePlayerBlock">
      <div className="OnlineGameProfile"></div>
      <div className="OnlineGamePlayerName"></div>
    </div>
  )
}

const KioskOnlineGame = props => {
  const { goBackTo, goFrontTo } = props

  return (
    <div className="KioskBackground">
      <div className="OnlineGameContentBlock">
        <div className="OnlineGamePlayerAndScore">
          <OnlineGamePlayerBlock />
          {/* <div className="OnlineGameScoreBlock"></div> */}
          <OnlineScoreTable />
          <OnlineGamePlayerBlock />
        </div>
        <div className="OnlineGameDisplayBlock">
          <div className="OnlineGameDisplay"></div>
          <div className="OnlineGameDisplay"></div>
          <div className="OnlineGameHelpCircle">?</div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineGame
