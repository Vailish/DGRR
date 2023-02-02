import React from 'react'
import '../../../scss/KioskOfflineGame.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { sendAllScore } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import ScoreTable from './ScoreTable'
import KioskNavBlock from './KioskNavBlock'

const KioskOfflineGame = () => {
  const dispatch = useDispatch()

  const onSendAllScore = () => dispatch(sendAllScore())

  return (
    <div className="KioskBackground">
      <KioskNavBlock />
      <div className="OfflineGameContentBlock">
        <div className="EllipseBlock">
          <div className="FirstEllipse">
            <div className="SecondEllipse"></div>
          </div>
        </div>
        <div className="GameScoreTable" onClick={onSendAllScore}>
          <ScoreTable />
        </div>
      </div>
    </div>
  )
}

export default KioskOfflineGame
