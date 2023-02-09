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
    if (myValue !== 'X' && myValue !== 'x' && myValue !== '/') {
      myValue = Number(myValue)
    }
    console.log('???????????????????', myValue)
    dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // if (myValue === 'X' || myValue === 'x') {
    //   // isStrike = true
    // }
    // if (refDataList[orderNum].current.value === 'X' || refDataList[orderNum].current.value === 'x') {
    //   const myValue = 10
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else if (refDataList[orderNum].current.value === '-') {
    //   const myValue = 0
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else {
    //   const myValue = Number(refDataList[orderNum].current.value)
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // }
  }
  const onChangeSecond = () => {
    const orderNum = 1
    let myValue = refDataList[orderNum].current.value
    if (myValue !== 'X' && myValue !== 'x' && myValue !== '/') {
      myValue = Number(myValue)
    }
    console.log('???????????????????', myValue)
    dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // if (refDataList[orderNum].current.value === '/') {
    //   console.log(Number(refDataList[orderNum].current.value))
    //   const myValue = 10 - Number(refDataList[orderNum - 1].current.value)
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else if (refDataList[orderNum].current.value === '-') {
    //   const myValue = 0
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else {
    //   const myValue = Number(refDataList[orderNum].current.value)
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // }
  }
  const onChangeThird = () => {
    const orderNum = 2
    let myValue = refDataList[orderNum].current.value
    if (myValue !== 'X' && myValue !== 'x' && myValue !== '/') {
      myValue = Number(myValue)
    }
    console.log('???????????????????', myValue)
    dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))

    // if (refDataList[orderNum].current.value === 'X' || refDataList[orderNum].current.value === 'x') {
    //   const myValue = 10
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else if (refDataList[orderNum].current.value === '-') {
    //   const myValue = 0
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // } else {
    //   const myValue = Number(refDataList[orderNum].current.value)
    //   dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    // }
  }

  const onChangeFirst2 = () => {
    setFrameData(prevData => {
      console.log(prevData)
      console.log(firstData.current.value)
      const orderNum = 1
      if (firstData.current.value === 'X' || firstData.current.value === 'x') {
        const firstValue = 10
        return { ...prevData, first: firstValue }
      }
      if (firstData.current.value === '-') {
        const firstValue = 0
        return { ...prevData, first: firstValue }
      }
    })
  }
  const onChangeSecond2 = () => {
    setFrameData(prevData => {
      console.log(prevData)
      console.log(secondData.current.value)
      const secondValue = Number(secondData.current.value)
      return { ...prevData, second: secondValue }
    })
  }
  const onChangeThird2 = () => {
    setFrameData(prevData => {
      console.log(prevData)
      console.log(thirdData.current.value)
      const thirdValue = Number(thirdData.current.value)
      return { ...prevData, third: thirdValue }
    })
  }
  const ScoreTableBlock = frameNum === 10 ? `ScoreTableBlock Frame${frameNum}` : 'ScoreTableBlock'
  // const ScoreInput = props => {
  //   const { isStrike } = props
  //   return isStrike ? <div className="ScoreInputBlock">X</div> : <input className="ScoreInputBlock" />
  // }
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
