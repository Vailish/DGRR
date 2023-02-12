import KioskNavBlock from '../KioskNavBlock'
import React, { useEffect, useState } from 'react'
import '../../../scss/KioskOnlineGame.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import OnlineScoreTable from './OnlineScoreTable'
// import KioskVideo from './webrtc/KioskVideo'
import { onlineGameBoardChangeOpposite } from '../../../store/OnlineLoginUser'
import { api } from '../../../API/api'
import KioskVideo from '../online/webrtc/KioskVideo'
const OnlineGamePlayerBlock = props => {
  const { playerNickname, playerProfile } = props
  return (
    <div className="OnlineGamePlayerBlock">
      <div className="OnlineGameProfile">{playerProfile}</div>
      <div className="OnlineGamePlayerName">{playerNickname}</div>
    </div>
  )
}

const KioskOnlineGame = () => {
  const dispatch = useDispatch()
  const player = useSelector(state => state.OnlineLoginUser.player)
  const oppositePlayer = useSelector(state => state.OnlineLoginUser.oppositePlayer.playerInfo)
  // const gamingPlayer = useSelector(state => state.OnlineLoginUser.gamingPlayer)
  const scoreSumArray = useSelector(state => state.OnlineLoginUser.gamingPlayer.gameBoardResult)
  const scoreArray = useSelector(state => state.OnlineLoginUser.gamingPlayer.gameBoard)
  const oppositeSumArray = useSelector(state => state.OnlineLoginUser.oppositePlayer.gameBoardResult)
  const oppositeScoreArray = useSelector(state => state.OnlineLoginUser.oppositePlayer.gameBoard)
  const isGameFinish = useSelector(state => state.OnlineLoginUser.isGameFinish)
  // const location = useLocation()
  // const { random } = location.state

  // useEffect(() => {
  //   console.log('잘 받아왔어' + random)
  // })
  const navigate = useNavigate()
  useEffect(() => {
    if (isGameFinish[0] === true && isGameFinish[1] === true)
      setTimeout(() => {
        navigate('/KioskOnlineResult')
      }, 2000)
  }, [isGameFinish])

  const scoreExchange = async () => {
    const url = '/v1/gaming/' + player.nickname
    console.log(scoreArray)
    const scoreString = scoreArray.reduce((sendString, number) => {
      if (number === '') return sendString + ' '
      return sendString + number
    }, '')
    console.log(scoreString)
    const response = await api.post(
      url,
      JSON.stringify({ opponentNickname: oppositePlayer.nickname, myGameData: scoreString }),
    )
    console.log(JSON.stringify({ opponentNickname: oppositePlayer.nickname, myGameData: scoreString }))
    if (response.data) dispatch(onlineGameBoardChangeOpposite(response.data.opponentGameData))
  }

  useEffect(() => {
    const scoreUpdate = setInterval(() => {
      scoreExchange()
    }, 1000)
    return () => clearInterval(scoreUpdate)
  }, [scoreArray])

  // const onTest = () => {
  //   clearInterval(scoreUpdate)
  // }

  return (
    <div className="KioskBackground">
      <div className="OnlineGameContentBlock">
        <div className="OnlineGamePlayerAndScore">
          <OnlineGamePlayerBlock playerProfile={player.profile} playerNickname={player.nickname} />
          {/* <div className="OnlineGameScoreBlock"></div> */}
          <OnlineScoreTable
            scoreSumArray={scoreSumArray}
            scoreArray={scoreArray}
            oppositeSumArray={oppositeSumArray}
            oppositeScoreArray={oppositeScoreArray}
          />
          <OnlineGamePlayerBlock playerProfile={oppositePlayer.profile} playerNickname={oppositePlayer.nickname} />
        </div>
        <div className="OnlineGameDisplayBlock">
          <KioskVideo />
          <div className="OnlineGameHelpCircle">?</div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineGame
