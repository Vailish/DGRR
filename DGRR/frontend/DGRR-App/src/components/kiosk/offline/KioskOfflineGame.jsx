import React, { useState } from 'react'
import '../../../scss/KioskOfflineGame.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { sendAllScore } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import ScoreTable from './ScoreTable'
import KioskNavBlock from '../KioskNavBlock'

const KioskOfflineGame = () => {
  const dispatch = useDispatch()
  const gamingPlayers = useSelector(state => state.OfflineLoginUsers.gamingPlayers)
  const gamingPlayersNum = useSelector(state => Object.keys(state.OfflineLoginUsers.gamingPlayers))
  const [playerNow, setPlayerNow] = useState(gamingPlayersNum[0])
  const scoreSumArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoardResult)
  const scoreArray = useSelector(state => state.OfflineLoginUsers.gamingPlayers[playerNow].gameBoard)
  const changePlayer = plyerNum => {
    setPlayerNow(plyerNum)
  }
  const onSendAllScore = () => dispatch(sendAllScore())
  const PlayerProfileCircle = props => {
    const { playerNum } = props
    return playerNow === playerNum ? (
      <div className="PlayerProfileCircle SelectedPlayer" onClick={() => changePlayer(playerNum)}></div>
    ) : (
      <div className="PlayerProfileCircle" onClick={() => changePlayer(playerNum)}></div>
    )
  }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskLogin" goFrontTo="/KioskOfflineResult" />
      <div className="OfflineGameContentBlock">
        <div className="EllipseBlock">
          <div className="FirstEllipse">
            <div className="SecondEllipse"></div>
          </div>
        </div>
        {/* onClick={onSendAllScore} */}
        <div className="GameScoreTableBlock">
          <div className="PlayerProfileAndTag">
            <div className="PlayerProfileCircleBlock">
              {gamingPlayersNum.map((player, index) => {
                return <PlayerProfileCircle playerNum={player} key={`PlayerProfile-${index}`} />
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

export default KioskOfflineGame
