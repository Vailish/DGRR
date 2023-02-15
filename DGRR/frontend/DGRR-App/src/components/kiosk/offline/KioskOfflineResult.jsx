import React, { useRef, useEffect } from 'react'
import '../../../scss/KioskOfflineResult.scss'
import { useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import { useState } from 'react'
import Crown from '../../../img/Crown.png'

const EachPlayerBlock = props => {
  const { scoreSumList, playerNum } = props
  const lastScore = scoreSumList[scoreSumList.length - 1]
  const widthRatio = (lastScore / 300) * 95
  const [ScoreCount, setScoreCount] = useState(0)
  const PlusNum = lastScore / 100
  useEffect(() => {
    const playerScoreCountUp = setInterval(() => {
      setScoreCount(ScoreCount + PlusNum)
    }, 10)

    if (ScoreCount + PlusNum > lastScore) {
      clearInterval(playerScoreCountUp)
    }

    return () => {
      clearInterval(playerScoreCountUp)
    }
  })

  return (
    <div className="EachPlayerBlock">
      <div className="PlayerScoreChartBlock">
        <div className="PlayerScoreChart" style={{ width: `${widthRatio}%` }}>
          <div className="PlayerScoreChartBar">{Math.round(ScoreCount)}</div>
        </div>
      </div>
    </div>
  )
}

const KioskOfflineResult = () => {
  const playerList = useSelector(state => Object.keys(state.OfflineLoginUsers.gamingPlayers))
  console.log(playerList)
  const gamingPlayers = useSelector(state => state.OfflineLoginUsers.gamingPlayers)
  const bestPlayerIndex = Object.values(gamingPlayers).reduce((best, cur, index) => {
    console.log('reduce Player : ', best, cur, index)
    return cur.gameBoardResult[9] > best.gameBoardResult[9] ? index : best
  }, gamingPlayers.player1)

  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOfflineGame'} goFrontTo={'/KioskLogin'} />
      <div className="ResultContentBlock">
        <div className="WinnerPlayerBlock">
          {playerList.map(player => {
            return (
              <div className="WinnerPlayerStarBlock">
                {player === `player${bestPlayerIndex + 1}` ? (
                  <img className="WinnerPlayerStar" src={Crown}></img>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="ResultChartBlock">
          <div className="ResultChartProfileBlock">
            {playerList.map(player => {
              return <img className="ResultChartProfile" src={gamingPlayers[player].playerInfo.profile}></img>
            })}
          </div>
          <div className="ResultChartGraphBlock">
            {playerList.map(player => {
              return <EachPlayerBlock scoreSumList={gamingPlayers[player].gameBoardResult} playerNum={player} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOfflineResult
