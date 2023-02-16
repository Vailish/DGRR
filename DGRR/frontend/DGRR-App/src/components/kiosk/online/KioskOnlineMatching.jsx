import KioskNavBlock from '../KioskNavBlock'
import React, { useState, useEffect } from 'react'
import '../../../scss/KioskOnlineMatching.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import matching from '../../../sound/matching.mp3'
import useSound from 'use-sound'
import countSound from '../../../sound/countDown.mp3'
import Bronze from '../../../img/Bronze.png'
import Silver from '../../../img/Silver.png'
import Gold from '../../../img/Gold.png'
import Platinum from '../../../img/Platinum.png'
import Diamond from '../../../img/Diamond.png'
const src = { 브론즈: Bronze, 실버: Silver, 골드: Gold, 플래티넘: Platinum, 다이아: Diamond }

const OnlineMatchingPlayer = props => {
  const { player, orderNum } = props
  const { nickname, tier, record, point, profile } = player

  return (
    <div className="OnlineMatchingPlayerBlock" style={orderNum === 1 ? { animationName: 'player_onstage2-2' } : null}>
      <img className="OnlineMatchingProfile" src={profile}></img>
      <div className="OnlineMatchingPlayerInfoBlock">
        <div className="OnlineMatchingTierAndName">
          <div className="OnlinePlayerTier">
            <img className="OnlinePlayerTierImg" src={src[`${tier}`]} alt={tier} />
          </div>
          <div className="OnlinePlayerName">{nickname}</div>
        </div>
        <div className="OnlineMatchingPointAndRecord">
          <div className="OnlinePlayerPoint">
            {tier} {point}
          </div>
          <div className="OnlinePlayerRecord">
            {record[0].totalGame} 전 {record[0].winGame} 승 {record[0].loseGame} 패
          </div>
        </div>
      </div>
    </div>
  )
}

const CountingDown = () => {
  const navigate = useNavigate()
  const [countingNum, setcountingNum] = useState(13)
  const [countPlay] = useSound(countSound)
  useEffect(() => {
    const numberCounting = setInterval(() => {
      if (countingNum === 11) {
        countPlay()
      }
      setcountingNum(countingNum - 1)
      if (countingNum === 0) {
        navigate('/KioskOnlineGame')
        clearInterval(numberCounting)
      }
    }, 1000)
    return () => clearInterval(numberCounting)
  }, [countingNum])

  return (
    <>
      {countingNum < 11 ? (
        <div className="CountingDownNumber" key={countingNum}>
          {countingNum}
        </div>
      ) : null}
    </>
  )
}

const KioskOnlineMatching = () => {
  const myData = useSelector(state => state.OnlineLoginUser.player)
  const yourData = useSelector(state => state.OnlineLoginUser.oppositePlayer.playerInfo)
  console.log(yourData)
  const navigate = useNavigate()

  const [testPlay, { stop }] = useSound(matching)

  useEffect(() => {
    testPlay()
  })

  const onRandomSession = (length = 50) => {
    return Math.random().toString(16).substr(2, length)
  }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo={'/KioskOnlineLogin'} />
      <div className="OnlineMatchingContentBlock">
        <OnlineMatchingPlayer player={myData} orderNum={1} />
        <div className="LetterV">V</div>
        <div className="LetterS">S</div>
        <CountingDown />
        <OnlineMatchingPlayer player={yourData} orderNum={2} />
      </div>
      <div className="GameStartBlock"></div>
    </div>
  )
}

export default KioskOnlineMatching
