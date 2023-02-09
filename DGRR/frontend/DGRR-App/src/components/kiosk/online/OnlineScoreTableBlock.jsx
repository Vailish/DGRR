import React from 'react'
import '../../../scss/OnlineScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'

const OnlineScoreTableBlock = props => {
  const frameNum = props.frameNum
  const ScoreTableBlock = frameNum === 10 ? `OnlineScoreTableBlock Frame${frameNum}` : 'OnlineScoreTableBlock'
  return (
    <div className={ScoreTableBlock}>
      <div className="OnlineUpDownLineBlock"></div>
      <div className="OnlineFrameNumber">{frameNum}</div>
      <div className="OnlineUpDownLineBlock"></div>
      <div className="OnlineScoreBlock">
        <input className="OnlineScoreInputBlockLeft"></input>
        {frameNum === 10 ? <input className="OnlineScoreInputBlockCenter"></input> : null}
        <input className="OnlineScoreInputBlockRight"></input>
      </div>
      <div className="OnlineScoreSum"></div>
      <div className="OnlineScoreBlock">
        <div className="OnlineScoreInputBlockLeft"></div>
        {frameNum === 10 ? <div className="OnlineScoreInputBlockCenter"></div> : null}
        <div className="OnlineScoreInputBlockRight"></div>
      </div>
      <div className="OnlineScoreSum"></div>
    </div>
  )
}

export default OnlineScoreTableBlock
