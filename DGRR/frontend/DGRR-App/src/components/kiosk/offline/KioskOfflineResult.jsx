import React, { useRef } from 'react'
import '../../../scss/KioskOfflineResult.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { sendAllScore } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import KioskNavBlock from '../KioskNavBlock'
import ResultChart from './ResultChart'
import OfflineResultChart from './OfflineResultChart'
import playerScore from '../../../scss/_variables.scss'

const KioskOfflineResult = () => {
  const playerList = useSelector(state => Object.keys(state.OfflineLoginUsers.gamingPlayers))
  console.log(playerList)
  const gamingPlayers = useSelector(state => state.OfflineLoginUsers.gamingPlayers)

  const EachPlayerBlock = props => {
    const { scoreSumList, playerNum } = props
    const lastScore = scoreSumList[scoreSumList.length - 1]
    const widthRatio = (lastScore / 300) * 95
    let playerScore = parseInt(lastScore / 10)
    let ScoreCount = 0
    const scoreRef = useRef()
    const playerScoreCountUp = setInterval(() => {
      ScoreCount++
      scoreRef.current.innerText = Number(scoreRef.current.innerText) + playerScore
      if (ScoreCount >= 10) {
        clearInterval(playerScoreCountUp)
        scoreRef.current.innerText = lastScore
      }
    }, 100)

    return (
      <div className="EachPlayerBlock">
        <div className="ResultChartProfileBlock">
          <div className="ResultChartProfile">{playerNum}</div>
        </div>
        <div className="PlayerScoreChartBlock">
          <div className="PlayerScoreChart" style={{ width: `${widthRatio}%` }}>
            <div className="PlayerScoreChartBar" ref={scoreRef}></div>
          </div>
          {/* <div className="PlayerScoreChart" style={{ transform: `scaleX(${widthRatio})` }}></div> */}
          {/* <div className="PlayerScoreNumber">{lastScore}</div> */}
        </div>
      </div>
    )
  }

  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOfflineGame'} goFrontTo={'/KioskLogin'} />
      <div className="ResultContentBlock">
        <div className="ResultChartBlock">
          {playerList.map(player => {
            return <EachPlayerBlock scoreSumList={gamingPlayers[player].gameBoardResult} playerNum={player} />
          })}
        </div>
      </div>
    </div>
  )

  // const dispatch = useDispatch()

  // const onSendAllScore = () => dispatch(sendAllScore())
  // const ChangeLength = () => {
  //   playerScore = { ...playerScore, playerScoreLength: '20%' }
  // }
  // const resultData = useSelector(state => state.OfflineLoginUsers.gamingPlayers)
  // const playersList = Object.keys(resultData)

  // const EachPlayerBlock = props => {
  //   const { data } = props
  //   return (
  //     <div className="EachPlayerBlock">
  //       <div className="PlayerProfile"></div>
  //       <div className="PlayerScoreChart">
  //         <OfflineResultChart data={data} width="100%" height="100%" />
  //       </div>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="KioskBackground">
  //     <KioskNavBlock goFrontTo="/KioskLogin" />
  //     <div className="ResultContentBlock">
  //       {playersList.map((player, index) => {
  //         console.log(player)
  //         const gameBoardResult = resultData[player].gameBoardResult
  //         console.log(gameBoardResult)
  //         const pv = gameBoardResult[gameBoardResult.length - 1]
  //         console.log(pv)
  //         const data = [{ name: player, pv }]
  //         // return <EachPlayerBlock data={data} width="100%" height="100%" />
  //         return <div style={{ width: `${pv}vw`, background: 'white', height: '5vh' }}></div>
  //       })}
  //       {/* <EachPlayerBlock/>
  //       <div className="EachPlayerBlock">
  //         <div className="PlayerProfile"></div>
  //         <div className="PlayerScoreChart">
  //           <OfflineResultChart data={data} width="100%" height="100%" />
  //         </div>
  //       </div>
  //       <div className="EachPlayerBlock">
  //         <div className="PlayerProfile"></div>
  //         <div className="PlayerScoreChart">
  //           <OfflineResultChart data={data} width="100%" height="100%" />
  //         </div>
  //       </div> */}
  //     </div>
  //   </div>
  // )
}

export default KioskOfflineResult
