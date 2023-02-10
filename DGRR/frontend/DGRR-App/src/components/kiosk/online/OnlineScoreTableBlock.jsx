import React, { useRef } from 'react'
import '../../../scss/OnlineScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import { onlineGameBoardChange } from '../../../store/OnlineLoginUser'

const OnlineScoreTableBlock = props => {
  const { frameNum, scoreBoard, scoreSum } = props

  const dispatch = useDispatch()
  const firstData = useRef()
  const secondData = useRef()
  const thirdData = useRef()
  const refDataList = [firstData, secondData, thirdData]
  const isValidValue = /^[fFXx\-0-9\/]{1,1}$/
  const myFrame = frameNum

  const ScoreTableBlock = frameNum === 10 ? `OnlineScoreTableBlock Frame${frameNum}` : 'OnlineScoreTableBlock'

  const onChangeFirst = () => {
    const orderNum = 0
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    console.log('thV : ', myValue)
    console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      console.log('???????????????????', myValue)
      if (
        myValue !== 'X' &&
        myValue !== 'x' &&
        myValue !== '/' &&
        myValue !== '-' &&
        myValue !== 'f' &&
        myValue !== 'F'
      ) {
        myValue = Number(myValue)
      }
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
  }
  const onChangeSecond = () => {
    const orderNum = 1
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    console.log('thV : ', myValue)
    console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      console.log('???????????????????', myValue)
      if (
        myValue !== 'X' &&
        myValue !== 'x' &&
        myValue !== '/' &&
        myValue !== '-' &&
        myValue !== 'f' &&
        myValue !== 'F'
      ) {
        myValue = Number(myValue)
      }
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
  }
  const onChangeThird = () => {
    const orderNum = 2
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    console.log('thV : ', myValue)
    console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      console.log('???????????????????', myValue)
      if (
        myValue !== 'X' &&
        myValue !== 'x' &&
        myValue !== '/' &&
        myValue !== '-' &&
        myValue !== 'f' &&
        myValue !== 'F'
      ) {
        myValue = Number(myValue)
      }
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
  }

  return (
    <div className={ScoreTableBlock}>
      <div className="OnlineUpDownLineBlock"></div>
      <div className="OnlineFrameNumber">{frameNum}</div>
      <div className="OnlineUpDownLineBlock"></div>
      <div className="OnlineScoreBlock">
        <input
          className="OnlineScoreInputBlockLeft"
          ref={firstData}
          onChange={onChangeFirst}
          value={scoreBoard[0]}
        ></input>
        <input
          className="OnlineScoreInputBlockRight"
          ref={secondData}
          onChange={onChangeSecond}
          value={scoreBoard[1]}
        ></input>
        {frameNum === 10 ? (
          <input
            className="OnlineScoreInputBlockFarRight"
            ref={thirdData}
            onChange={onChangeThird}
            value={scoreBoard[2]}
          ></input>
        ) : null}
      </div>
      <div className="OnlineScoreSum"></div>
      <div className="OnlineScoreBlock">
        <div className="OnlineScoreInputBlockLeft"></div>
        <div className="OnlineScoreInputBlockRight"></div>
        {frameNum === 10 ? <div className="OnlineScoreInputBlockFarRight"></div> : null}
      </div>
      <div className="OnlineScoreSum"></div>
    </div>
  )
}

export default OnlineScoreTableBlock
