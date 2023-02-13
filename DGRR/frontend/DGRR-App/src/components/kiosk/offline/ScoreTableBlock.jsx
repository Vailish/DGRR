import React, { useState, useRef, useEffect } from 'react'
import '../../../scss/ScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { offlineGameBoardChange } from '../../../store/OfflineLoginUsers'

const ScoreTableBlock = props => {
  const { frameNum, playerNum, scoreSum, scoreBoard, isInput } = props
  // const scoreSumArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNum])

  const myFrame = frameNum
  const dispatch = useDispatch()
  const firstData = useRef()
  const secondData = useRef()
  const thirdData = useRef()
  const isValidValue = /^[fFXx\-0-9\/]{1,1}$|^10$/
  const refDataList = [firstData, secondData, thirdData]
  const isGameFinish = useSelector(state => state.OfflineLoginUsers.isGameFinish)
  const [frameData, setFrameData] = useState({
    first: '',
    second: '',
    third: '',
    localScore: '',
    globalScore: '',
  })
  const onChangeFirst = () => {
    const orderNum = 0
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    if (isValidValue.test(myValue)) {
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
      myValue = ''
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    }
  }
  const onChangeSecond = () => {
    const orderNum = 1
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    if (isValidValue.test(myValue)) {
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
      myValue = ''
      dispatch(offlineGameBoardChange(playerNum, myFrame, orderNum, myValue))
    }
  }
  const onChangeThird = () => {
    const orderNum = 2
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    if (isValidValue.test(myValue)) {
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
            <div
              className="ScoreInputBlockLeft"
              onChange={onChangeFirst}
              ref={firstData}
              style={isGameFinish[playerNum] ? { background: 'green' } : null}
            >
              {scoreBoard[0]}
            </div>
            <div
              className="ScoreInputBlockRight"
              onChange={onChangeSecond}
              ref={secondData}
              style={isGameFinish[playerNum] ? { background: 'green' } : null}
            >
              {scoreBoard[1]}
            </div>
            {frameNum === 10 ? (
              <div
                className="ScoreInputBlockFarRight"
                onChange={onChangeThird}
                ref={thirdData}
                style={isGameFinish[playerNum] ? { background: 'green' } : null}
              >
                {scoreBoard[2]}
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="ScoreSum" style={isGameFinish[playerNum] ? { background: 'green' } : null}>
        {scoreSum}
      </div>
    </div>
  )
}

export default ScoreTableBlock
