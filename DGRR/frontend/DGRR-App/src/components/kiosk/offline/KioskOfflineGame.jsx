import React, { useState, useEffect, useMemo } from 'react'
import '../../../scss/KioskOfflineGame.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScoreTable from './ScoreTable'
import KioskNavBlock from '../KioskNavBlock'
import { api } from '../../../API/api'

const KioskOfflineGame = () => {
  const navigate = useNavigate()
  const gamingPlayers = useSelector(state => state.OfflineLoginUsers.gamingPlayers)
  const gamingPlayersNum = useSelector(state => Object.keys(state.OfflineLoginUsers.gamingPlayers))
  const [playerNow, setPlayerNow] = useState(gamingPlayersNum[0])
  const scoreSumArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoardResult)
  const scoreArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoard)
  const isGameFinish = useSelector(state => state.OfflineLoginUsers.isGameFinish)

  const makeAllScore = () => {
    const nickname = gamingPlayers.player1.playerInfo.nickname
    const gameType = false
    const gameData = Object.values(gamingPlayers).map(player => {
      const score = []
      for (let num of player.gameBoard) {
        if (num === 'X') {
          score.push(10)
        } else if (num === '/') {
          score.push(10 - score[score.length - 1])
        } else if (num === 'F' || num === '-' || num === '') {
          score.push(0)
        } else {
          score.push(num)
        }
      }
      return { nickname: player.playerInfo.nickname, score }
    })
    const myRequset = { nickname, gameType, gameData }
    sendAllScore(myRequset)
  }

  const sendAllScore = async myRequset => {
    const url = '/api/v1/game'
    const response = await api.post(url, JSON.stringify(myRequset))
    console.log(JSON.stringify(myRequset))
    if (response.data) {
      navigate('/KioskOfflineResult')
    }
  }

  const changePlayer = plyerNum => {
    setPlayerNow(plyerNum)
  }
  const [endMessage, setendMessage] = useState(false)
  const [goNext, setgoNext] = useState(false)

  useEffect(() => {
    if (Object.keys(isGameFinish).length > 0) {
      let goResult = true
      for (let isFinish of Object.values(isGameFinish)) {
        if (isFinish === false) {
          goResult = false
          break
        }
      }
      if (goResult === true) {
        setendMessage(true)
      }
    } else {
      navigate('/KioskLogin')
    }
  }, [isGameFinish])

  const WantGoNext = () => {
    return (
      <div className="OfflineGameEnd">
        <div className="OfflineGameEndTitle">게임이 종료되었습니다!</div>
        <div className="OfflineGameEndText">결과 화면으로 이동합니다</div>
        <div className="GoNextButtonBlock">
          <div
            className="GoNextButton"
            onClick={() => {
              makeAllScore()
            }}
          >
            확인
          </div>
        </div>
      </div>
    )
  }

  const PlayerProfileCircle = props => {
    const { playerNum, src } = props
    return (
      <img
        className="PlayerProfileCircle"
        src={src}
        onClick={() => changePlayer(playerNum)}
        style={playerNow === playerNum ? { border: '0.2vw solid blue' } : null}
      ></img>
    )
  }

  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskLogin" goFrontTo="/KioskOfflineResult" />
      {endMessage ? <WantGoNext /> : null}
      <div className="OfflineGameContentBlock">
        <div className="EllipseBlock">
          <div className="FirstEllipse">
            <div className="SecondEllipse"></div>
          </div>
        </div>
        <div className="GameScoreTableBlock">
          <div className="PlayerProfileAndTag">
            <div className="PlayerProfileCircleBlock">
              {gamingPlayersNum.map((player, index) => {
                return (
                  <PlayerProfileCircle
                    src={gamingPlayers[player].playerInfo.profile}
                    playerNum={player}
                    key={`PlayerProfile-${index}`}
                  />
                )
              })}
            </div>
            <div className="PlayerNameTagBlock">
              <div className="PlayerNameTag">
                <div className="PlayerName">{gamingPlayers[playerNow].playerInfo.nickname}</div>
              </div>
            </div>
          </div>
          <div className="GameScoreTable">
            <ScoreTable playerNum={playerNow} scoreSumArray={scoreSumArray} scoreArray={scoreArray} isInput={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(KioskOfflineGame)
