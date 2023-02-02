import React from 'react'
import '../../../scss/ScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'

const ScoreTableBlock = props => {
  const frameNum = props.frameNum
  const ScoreTableBlock = frameNum === 10 ? `ScoreTableBlock Frame${frameNum}` : 'ScoreTableBlock'
  return (
    <div className={ScoreTableBlock}>
      <div className="UpDownLineBlock"></div>
      <div className="FrameNumber">{frameNum}</div>
      <div className="UpDownLineBlock"></div>
      <div className="ScoreBlock">
        <input className="ScoreInputBlock"></input>
        <input className="ScoreInputBlock"></input>
        {frameNum === 10 ? <input className="ScoreInputBlock"></input> : null}
      </div>
      <div className="ScoreSum"></div>
    </div>
  )
}

export default ScoreTableBlock
