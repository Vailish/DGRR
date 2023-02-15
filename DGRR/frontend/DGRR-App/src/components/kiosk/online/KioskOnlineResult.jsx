import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import '../../../scss/KioskOnlineResult.scss'
import { useLocation } from 'react-router-dom'
import { ImArrowUp } from 'react-icons/im'

import Bronze from '../../../img/Bronze.png'
import Silver from '../../../img/Silver.png'
import Gold from '../../../img/Gold.png'
import Platinum from '../../../img/Platinum.png'
import Diamond from '../../../img/Diamond.png'
const src = { 브론즈: Bronze, 실버: Silver, 골드: Gold, 플래티넘: Platinum, 다이아: Diamond }

const ScoreUpDown = props => {
  const { point, isWin } = props
  const [upDownScore, setupDownScore] = useState(0)
  useEffect(() => {
    const changeScoreNumber = setInterval(() => {
      if (isWin) {
        setupDownScore(upDownScore + 1)
      } else {
        setupDownScore(upDownScore - 1)
      }
    }, 30)
    if (isWin && upDownScore >= 40) clearInterval(changeScoreNumber)
    else if (!isWin && upDownScore <= -40) clearInterval(changeScoreNumber)

    return () => {
      clearInterval(changeScoreNumber)
    }
  })

  return <div className="UpDownScoreBlock">{point + upDownScore}</div>
}

const KioskOnlineResult = () => {
  const { state } = useLocation()
  const player = useSelector(state => state.OnlineLoginUser.player)
  // const player = { point: 1100, nickname: '김볼링', ranking: '골드' }
  // const isWin = true
  // const state = { isWin }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goFrontTo="/KioskOnlineLogin" />
      <div className="CenterAlignContentBlock">
        <div className="CenterAlignContent">
          <div className="OnlineProfileContentBlock">
            <div className="OnlineProfileContentInner">
              <img className="OnlineProfile" src={player.profile}></img>
              <div className="OnlineRecordBlock">
                <div className="OnlinePlayerName">{player.nickname}</div>
                <div className="OnlineTierAndRecord">
                  <img className="OnlineTier" src={src[`${player.tier}`]} alt={player.tier}></img>
                  <div className="OnlineRecord">
                    <ScoreUpDown point={player.point} isWin={state.isWin}></ScoreUpDown>
                    <div
                      className="UpDownArrow"
                      style={
                        state.isWin
                          ? { transform: 'rotate(0deg)', color: 'red' }
                          : { transform: 'rotate(180deg)', color: 'blue' }
                      }
                    >
                      <ImArrowUp className="UpDownArrowIn" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="OnlineGameWinLose">{state.isWin ? '게임 승리' : '게임 패배'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineResult
