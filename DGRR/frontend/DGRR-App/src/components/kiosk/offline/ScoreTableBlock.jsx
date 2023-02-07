import React, { useState, useRef } from 'react'
import '../../../scss/ScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'

const ScoreTableBlock = props => {
  const { frameNum } = props
  const firstData = useRef()
  const [frameData, setFrameData] = useState({
    first: null,
    second: null,
    third: null,
    localScore: null,
    globalScore: null,
  })
  const onChangeFirst = () => {
    setFrameData(prevData => {
      console.log(prevData)
      console.log(firstData.current.value)
      const firstValue = firstData.current.value
      return { ...prevData, first: firstValue }
    })
  }
  const onChangeSecond = () => {
    setFrameData(prevData => {
      console.log(prevData)
      console.log(firstData.current.value)
      const firstValue = firstData.current.value
      return { ...prevData, first: firstValue }
    })
  }
  const ScoreTableBlock = frameNum === 10 ? `ScoreTableBlock Frame${frameNum}` : 'ScoreTableBlock'
  return (
    <div className={ScoreTableBlock}>
      <div className="UpDownLineBlock"></div>
      <div className="FrameNumber">{frameNum}</div>
      <div className="UpDownLineBlock"></div>
      <div className="ScoreBlock">
        <input className="ScoreInputBlock" onChange={onChangeFirst} ref={firstData}></input>
        <input className="ScoreInputBlock" onChange={onChangeSecond}></input>
        {frameNum === 10 ? <input className="ScoreInputBlock"></input> : null}
      </div>
      <div className="ScoreSum"></div>
    </div>
  )
}

export default ScoreTableBlock
