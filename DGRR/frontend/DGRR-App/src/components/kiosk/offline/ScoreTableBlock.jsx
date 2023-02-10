import React, { useState, useRef, useEffect } from 'react'
import '../../../scss/ScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer, offlineGameBoardChange } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'

const ScoreTableBlock = props => {
  const { frameNum, playerNum, scoreSum, scoreBoard, isInput } = props
  // const scoreSumArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNum])

  console.log(playerNum)
  let isStrike = false
  const myFrame = frameNum
  const dispatch = useDispatch()
  const firstData = useRef()
  const secondData = useRef()
  const thirdData = useRef()
  const isValidValue = /^[fFXx\-0-9\/]{1,1}$/
  const [scoreSumNumber, setScoreSumNumber] = useState(scoreSum)
  const refDataList = [firstData, secondData, thirdData]
  const [frameData, setFrameData] = useState({
    first: '',
    second: '',
    third: '',
    localScore: '',
    globalScore: '',
  })
  useEffect(() => {
    if (frameNum === 10) {
      if (frameData.first !== '' && frameData.second !== '' && frameData.third !== '') {
        setFrameData(prevData => {
          const localValue = prevData.first + prevData.second + prevData.third
        })
      }
    }
    if (frameData.first !== '' && frameData.second !== '') {
    }
  }, [frameData])
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
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
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
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
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
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    } else {
      console.log('gpdgpjdk')
      myValue = ''
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    }
  }

  const ScoreTableBlock = frameNum === 10 ? `ScoreTableBlock Frame${frameNum}` : 'ScoreTableBlock'

  return (
    <div className={ScoreTableBlock}>
      <div className="UpDownLineBlock"></div>
      <div className="FrameNumber">{frameNum}</div>
      <div className="UpDownLineBlock"></div>
      <div className="ScoreBlock">
        {isInput ? (
          <>
            <input
              className="ScoreInputBlockLeft"
              onChange={onChangeFirst}
              ref={firstData}
              value={scoreBoard[0]}
            ></input>
            <input
              className="ScoreInputBlockRight"
              onChange={onChangeSecond}
              ref={secondData}
              value={scoreBoard[1]}
            ></input>
            {frameNum === 10 ? (
              <input
                className="ScoreInputBlockFarRight"
                onChange={onChangeThird}
                ref={thirdData}
                value={scoreBoard[2]}
              ></input>
            ) : null}
          </>
        ) : (
          <>
            <div className="ScoreInputBlockLeft" onChange={onChangeFirst} ref={firstData}>
              {scoreBoard[0]}
            </div>
            <div className="ScoreInputBlockRight" onChange={onChangeSecond} ref={secondData}>
              {scoreBoard[1]}
            </div>
            {frameNum === 10 ? (
              <div className="ScoreInputBlockFarRight" onChange={onChangeThird} ref={thirdData}>
                {scoreBoard[2]}
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="ScoreSum">{scoreSum}</div>
    </div>
  )
}

export default ScoreTableBlock
