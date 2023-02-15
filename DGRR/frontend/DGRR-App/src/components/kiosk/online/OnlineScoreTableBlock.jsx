import React, { useEffect, useRef } from 'react'
import '../../../scss/OnlineScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { onlineGameBoardChange } from '../../../modules/OnlineLoginUser'
import useSound from 'use-sound'
import testStrike from '../../../sound/matchingResult.wav'
const OnlineScoreTableBlock = props => {
  const { frameNum, scoreBoard, scoreSum, oppositeScoreBoard, oppositeScoreSum } = props

  const dispatch = useDispatch()
  const firstData = useRef()
  const secondData = useRef()
  const thirdData = useRef()
  const refDataList = [firstData, secondData, thirdData]
  const isValidValue = /^[fFXx\-0-9\/]{1,1}$|^10$/
  const myFrame = frameNum
  const isGameFinish = useSelector(state => state.OnlineLoginUser.isGameFinish)
  const [test] = useSound(testStrike)

  const ScoreTableBlock = frameNum === 10 ? `OnlineScoreTableBlock Frame${frameNum}` : 'OnlineScoreTableBlock'

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
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
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
      if (myValue === 'x' || myValue === 'X') {
        test()
      }
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
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
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    } else {
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
  }

  useEffect(() => {}, [oppositeScoreBoard[0], oppositeScoreBoard[1], oppositeScoreBoard[2]])

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
          style={isGameFinish[0] ? { background: 'green' } : { background: '#ea6b6b' }}
        ></input>
        <input
          className="OnlineScoreInputBlockRight"
          ref={secondData}
          onChange={onChangeSecond}
          value={scoreBoard[1]}
          style={isGameFinish[0] ? { background: 'green' } : { background: '#ea6b6b' }}
        ></input>
        {frameNum === 10 ? (
          <input
            className="OnlineScoreInputBlockFarRight"
            ref={thirdData}
            onChange={onChangeThird}
            value={scoreBoard[2]}
            style={isGameFinish[0] ? { background: 'green' } : { background: '#ea6b6b' }}
          ></input>
        ) : null}
      </div>
      <div className="OnlineScoreSum" style={isGameFinish[0] ? { background: 'green' } : null}>
        {scoreSum}
      </div>
      <div className="OnlineScoreBlock">
        <input
          className="OnlineScoreInputBlockLeft"
          style={isGameFinish[1] ? { background: 'green' } : { background: '#7292df' }}
          value={oppositeScoreBoard[0]}
          readOnly={true}
        ></input>
        <input
          className="OnlineScoreInputBlockRight"
          style={isGameFinish[1] ? { background: 'green' } : { background: '#7292df' }}
          value={oppositeScoreBoard[1]}
          readOnly={true}
        ></input>
        {frameNum === 10 ? (
          <input
            className="OnlineScoreInputBlockFarRight"
            style={isGameFinish[1] ? { background: 'green' } : { background: '#7292df' }}
            value={oppositeScoreBoard[2]}
            readOnly={true}
          ></input>
        ) : null}
      </div>
      <div className="OnlineScoreSum" style={isGameFinish[1] ? { background: 'green' } : null}>
        {oppositeScoreSum}
      </div>
    </div>
  )
}

export default OnlineScoreTableBlock
