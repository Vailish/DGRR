import React, { useRef } from 'react'
import '../../../scss/OnlineScoreTableBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { api } from '../../../API/api'
import { onlineGameBoardChange } from '../../../store/OnlineLoginUser'

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

  // const player = useSelector(state => state.OnlineLoginUser.player)
  // const oppositePlayer = useSelector(state => state.OnlineLoginUser.oppositePlayer.playerInfo)
  // const myScoreBoard = useSelector(state => state.OnlineLoginUser.gamingPlayer.gameBoard)

  const ScoreTableBlock = frameNum === 10 ? `OnlineScoreTableBlock Frame${frameNum}` : 'OnlineScoreTableBlock'

  // const scoreExchange = async myValue => {
  //   const url = '/v1/gaming/' + player.nickname
  //   myScoreBoard.push(myValue)
  //   console.log('myScoreBoard : ', myScoreBoard)
  //   const scoreString = myScoreBoard.reduce((sendString, number) => {
  //     if (number === '') return sendString + ' '
  //     return sendString + number
  //   }, '')
  //   console.log('scorestring : ', scoreString)
  //   const response = await api.post(
  //     url,
  //     JSON.stringify({ opponentNickname: oppositePlayer.nickname, myGameData: scoreString }),
  //   )
  //   console.log('JSON : ', JSON.stringify({ opponentNickname: oppositePlayer.nickname, myGameData: scoreString }))
  //   if (response.data) dispatch(onlineGameBoardChangeOpposite(response.data.opponentGameData))
  // }

  const onChangeFirst = () => {
    const orderNum = 0
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    // console.log('thV : ', myValue)
    // console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      // console.log('???????????????????', myValue)
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
      // console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
    // scoreExchange(myValue)
  }
  const onChangeSecond = () => {
    const orderNum = 1
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    // console.log('thV : ', myValue)
    // console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      // console.log('???????????????????', myValue)
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
      // console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
    // scoreExchange(myValue)
  }
  const onChangeThird = () => {
    const orderNum = 2
    let myValue = refDataList[orderNum].current.value
    if (myValue === '0') myValue = '-'
    // console.log('thV : ', myValue)
    // console.log('ISVALID', isValidValue.test(myValue))
    if (isValidValue.test(myValue)) {
      // console.log('???????????????????', myValue)
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
      // console.log('gpdgpjdk')
      myValue = ''
      dispatch(onlineGameBoardChange(myFrame, orderNum, myValue))
    }
    // scoreExchange(myValue)
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
          style={isGameFinish[0] ? { background: 'green' } : null}
        ></input>
        <input
          className="OnlineScoreInputBlockRight"
          ref={secondData}
          onChange={onChangeSecond}
          value={scoreBoard[1]}
          style={isGameFinish[0] ? { background: 'green' } : null}
        ></input>
        {frameNum === 10 ? (
          <input
            className="OnlineScoreInputBlockFarRight"
            ref={thirdData}
            onChange={onChangeThird}
            value={scoreBoard[2]}
            style={isGameFinish[0] ? { background: 'green' } : null}
          ></input>
        ) : null}
      </div>
      <div className="OnlineScoreSum" style={isGameFinish[0] ? { background: 'green' } : null}>
        {scoreSum}
      </div>
      <div className="OnlineScoreBlock">
        <div className="OnlineScoreInputBlockLeft" style={isGameFinish[1] ? { background: 'green' } : null}>
          {oppositeScoreBoard[0]}
        </div>
        <div className="OnlineScoreInputBlockRight" style={isGameFinish[1] ? { background: 'green' } : null}>
          {oppositeScoreBoard[1]}
        </div>
        {frameNum === 10 ? (
          <div className="OnlineScoreInputBlockFarRight" style={isGameFinish[1] ? { background: 'green' } : null}>
            {oppositeScoreBoard[2]}
          </div>
        ) : null}
      </div>
      <div className="OnlineScoreSum" style={isGameFinish[1] ? { background: 'green' } : null}>
        {oppositeScoreSum}
      </div>
    </div>
  )
}

export default OnlineScoreTableBlock
