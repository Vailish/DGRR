import React, { useState, useEffect, useMemo } from 'react'
import '../../../scss/KioskOfflineGame.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendAllScore } from '../../../modules/OfflineLoginUsers'
import ScoreTable from './ScoreTable'
import KioskNavBlock from '../KioskNavBlock'

const KioskOfflineGame = () => {
  const dispatch = useDispatch()
  const gamingPlayers = useSelector(state => state.OfflineLoginUsers.gamingPlayers)
  const gamingPlayersNum = useSelector(state => Object.keys(state.OfflineLoginUsers.gamingPlayers))
  const [playerNow, setPlayerNow] = useState(gamingPlayersNum[0])
  const scoreSumArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoardResult)
  const scoreArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoard)
  const isGameFinish = useSelector(state => state.OfflineLoginUsers.isGameFinish)
  const navigate = useNavigate()
  const onSendAllScore = () => dispatch(sendAllScore())

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
              onSendAllScore()
              navigate('/KioskOfflineResult')
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
