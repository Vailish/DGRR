import React from 'react'
import '../../../scss/KioskOnlineProfile.scss'
import Bronze from '../../../img/Bronze.png'
import Silver from '../../../img/Silver.png'
import Gold from '../../../img/Gold.png'
import Platinum from '../../../img/Platinum.png'
import Diamond from '../../../img/Diamond.png'
const src = { 브론즈: Bronze, 실버: Silver, 골드: Gold, 플래티넘: Platinum, 다이아: Diamond }

const KioskOnlineProfile = props => {
  const { player } = props
  const { nickname, record, tier, profile } = player
  // const player = useSelector(state => state.OnlineLoginUser.player)
  return (
    <div className="OnlineProfileContentBlock">
      <div className="OnlineProfileContentInner">
        <img className="OnlineProfile" src={profile}></img>
        <div className="OnlineRecordBlock">
          <div className="OnlinePlayerName">{nickname}</div>
          <div className="OnlineTierAndRecord">
            <img className="OnlineTier" src={src[`${tier}`]} alt={tier}></img>
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
