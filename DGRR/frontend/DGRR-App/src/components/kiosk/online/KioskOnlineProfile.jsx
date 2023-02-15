import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KioskNavBlock from '../KioskNavBlock'
import '../../../scss/KioskOnlineProfile.scss'
import { Link } from 'react-router-dom'

const KioskOnlineProfile = props => {
  const { player } = props
  const { nickname, record, point, profile } = player
  // const player = useSelector(state => state.OnlineLoginUser.player)
  return (
    <div className="OnlineProfileContentBlock">
      <div className="OnlineProfileContentInner">
        <div className="OnlineProfile"> {profile}</div>
        <div className="OnlineRecordBlock">
          <div className="OnlinePlayerName">{nickname}</div>
          <div className="OnlineTierAndRecord">
            <div className="OnlineTier">{point}</div>
            <div className="OnlineRecord">
              {record[0].totalGame} 전 {record[0].winGame} 승 {record[0].loseGame} 패
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineProfile
