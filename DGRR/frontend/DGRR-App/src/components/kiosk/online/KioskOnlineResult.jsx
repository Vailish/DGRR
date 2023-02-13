import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import '../../../scss/KioskOnlineResult.scss'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const KioskOnlineResult = () => {
  // const { state } = useLocation()
  // const player = useSelector(state => state.OnlineLoginUser.player)
  const player = { point: 1100, nickname: '김볼링', ranking: '골드' }
  const isWin = false
  return (
    <div className="KioskBackground">
      <KioskNavBlock goFrontTo="/KioskOnlineLogin" />
      <div className="CenterAlignContentBlock">
        <div className="CenterAlignContent">
          <div className="OnlineProfileContentBlock">
            <div className="OnlineProfileContentInner">
              <div className="OnlineProfile"></div>
              <div className="OnlineRecordBlock">
                <div className="OnlinePlayerName">{player.nickname}</div>
                <div className="OnlineTierAndRecord">
                  <div className="OnlineTier">{player.ranking}</div>
                  <div className="OnlineRecord">{player.point}</div>
                </div>
              </div>
              <div className="OnlineGameWinLose">{isWin ? '게임 승리' : '게임 패배'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineResult
