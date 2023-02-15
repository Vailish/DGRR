import KioskNavBlock from '../KioskNavBlock'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import '../../../scss/KioskOnlineGame.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OnlineScoreTable from './OnlineScoreTable'
import { onlineGameBoardChangeOpposite } from '../../../modules/OnlineLoginUser'
import { api } from '../../../API/api'
import KioskVideo from '../online/webrtc/KioskVideo'

const KioskOnlineGame = () => {
  const dispatch = useDispatch()
  const player = useSelector(state => state.OnlineLoginUser.player)
  const oppositePlayer = useSelector(state => state.OnlineLoginUser.oppositePlayer.playerInfo)
  const scoreSumArray = useSelector(state => state.OnlineLoginUser.gamingPlayer.gameBoardResult)
  const scoreArray = useSelector(state => state.OnlineLoginUser.gamingPlayer.gameBoard)
  const oppositeSumArray = useSelector(state => state.OnlineLoginUser.oppositePlayer.gameBoardResult)
  const oppositeScoreArray = useSelector(state => state.OnlineLoginUser.oppositePlayer.gameBoard)
  const isGameFinish = useSelector(state => state.OnlineLoginUser.isGameFinish)

  const OnlineGamePlayerBlock = props => {
    const { playerNickname, playerProfile, playerColor } = props
    useLayoutEffect(() => {
      console.log('확인해봐' + playerProfile)
    }, [])
    return (
      <div className="OnlineGamePlayerBlock">
        <img
          className="OnlineGameProfile"
          src={playerProfile}
          style={playerColor === 2 ? { border: '0.5vw solid #7292df' } : { border: '0.5vw solid #ea6b6b' }}
        ></img>
        <div
          className="OnlineGamePlayerName"
          style={playerColor === 2 ? { background: '#7292df' } : { background: '#ea6b6b' }}
        ></div>
      </div>
    )
  }

  const BothGameEnd = () => {
    const viewResult = () => {
      navigate('/KioskOnlineResult', { state: { isWin } })
    }
    return (
      <div className="BothGameEndBlock">
        <div className="GameEndTitle">게임이 끝났습니다</div>
        <div className="GameEndText"> 다음 화면으로 넘어갑니다</div>
        <div className="goOnlineResultBlock">
          <div className="goOnlineResult" onClick={viewResult}>
            {' '}
            확인{' '}
          </div>
        </div>
      </div>
    )
  }

  const [isGameEnd, setisGameEnd] = useState(false)
  const [isWin, setisWin] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (isGameFinish[0] === true && isGameFinish[1] === true) {
      if (scoreSumArray[9] >= oppositeSumArray[9]) {
        setisWin(true)
      } else {
        setisWin(false)
      }
      if (isWin) setisGameEnd(true)
    }
  }, [isGameFinish])

  const scoreExchange = async () => {
    const url = '/api/v1/gaming/' + player.nickname
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

  const [needHelp, setneedHelp] = useState(false)
  const helpMessage = () => {
    setneedHelp(!needHelp)
  }

  const OnlineHelpMessageWindow = () => {
    return (
      <div className="OnlineHelpMessageWindow">
        <div className="OnlineHelpMessageCircle">X</div>
        <div className="OnlineHelpCircleBlock">?</div>
        <div className="OnlineHelpMessageTitle"> 점수 입력 가이드</div>
        <div className="OnlineHelpMessageText">
          1. 입력하려는 점수 칸을 터치해 주세요.
          <br />
          2. 키패드를 통해 해당 라운드의 자신의 점수를 입력해주세요.
          <br />
          3. 스트라이크 = x, 스페어 -, 그외 자신이 친 핀 수
          <br />
          4. 확인을 눌러 입력을 마칩니다.
          <br />
        </div>
      </div>
    )
  }

  return (
    <div className="KioskBackground">
      <KioskNavBlock />
      {isGameFinish[0] === true && isGameFinish[1] === true ? <BothGameEnd /> : null}
      <div className="OnlineGameContentBlock">
        {needHelp ? <OnlineHelpMessageWindow /> : null}
        <div className="OnlineGamePlayerAndScore">
          <OnlineGamePlayerBlock playerProfile={player.profile} playerNickname={player.nickname} playerColor={1} />
          <OnlineScoreTable
            scoreSumArray={scoreSumArray}
            scoreArray={scoreArray}
            oppositeSumArray={oppositeSumArray}
            oppositeScoreArray={oppositeScoreArray}
          />
          <OnlineGamePlayerBlock
            playerProfile={oppositePlayer.profile}
            playerNickname={oppositePlayer.nickname}
            playerColor={2}
          />
        </div>
        <div className="OnlineGameDisplayBlock">
          <KioskVideo />
          <div className="OnlineGameHelpCircle" onClick={helpMessage}>
            ?
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineGame
