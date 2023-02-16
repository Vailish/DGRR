import React, { useEffect } from 'react'
import '../../../scss/KioskOfflineResult.scss'
import { useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import { useState } from 'react'
import Crown from '../../../img/Crown.png'

const EachPlayerBlock = props => {
  const [ScoreCount, setScoreCount] = useState(0)
  const { scoreSumList } = props
  const lastScore = scoreSumList[scoreSumList.length - 1]
  const widthRatio = (lastScore / 300) * 95
  const PlusNum = lastScore / 100
  // console.log(scoreSumList[scoreSumList.length - 1])
  useEffect(() => {
    const playerScoreCountUp = setInterval(() => {
      console.log(PlusNum, lastScore)
      setScoreCount(ScoreCount + PlusNum)
    }, 10)

    if (ScoreCount + PlusNum > lastScore) {
      clearInterval(playerScoreCountUp)
    }

    return () => {
      clearInterval(playerScoreCountUp)
    }
  }, [ScoreCount])

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
  const bestPlayer = Object.keys(gamingPlayers).reduce((best, cur) => {
    console.log('reduce Player : ', best, cur)
    console.log('reduce Player : ', gamingPlayers[cur], gamingPlayers[best])
    return gamingPlayers[cur].gameBoardResult[9] > gamingPlayers[best].gameBoardResult[9] ? cur : best
  }, 'player1')

  return (
    <div className="KioskBackground">
      <KioskNavBlock goFrontTo={'/KioskLogin'} />
      <div className="ResultContentBlock">
        <div className="WinnerPlayerBlock">
          {playerList.map((player, index) => {
            return (
              <div className="WinnerPlayerStarBlock" key={`player${index + 1}`}>
                {player === `player${bestPlayer + 1}` ? (
                  <img className="WinnerPlayerStar" src={Crown} alt="Crown"></img>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="ResultChartBlock">
          <div className="ResultChartProfileBlock">
            {playerList.map((player, index) => {
              return (
                <img
                  className="ResultChartProfile"
                  src={gamingPlayers[player].playerInfo.profile}
                  alt="playerProfile"
                  key={`playerProfile-${index + 1}`}
                ></img>
              )
            })}
          </div>
          <div className="ResultChartGraphBlock">
            {playerList.map((player, index) => {
              return (
                <EachPlayerBlock
                  key={`player${index + 1}`}
                  scoreSumList={gamingPlayers[player].gameBoardResult}
                  playerNum={player}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOfflineResult
